import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Undo2, Eraser } from 'lucide-react';
import {
  type Stroke,
  type StrokePoint,
  recognizeHandwritingCandidates,
} from '../game/rules.ts';
import { soundManager } from '../game/audio.ts';

interface HandwritingPadProps {
  selectedCellKey: string;
  currentCellInput: string;
  isDarkMode: boolean;
  onSelectCandidate: (char: string) => void;
  onClearCell: () => void;
}

export const HandwritingPad: React.FC<HandwritingPadProps> = ({
  selectedCellKey,
  currentCellInput,
  isDarkMode,
  onSelectCandidate,
  onClearCell,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<StrokePoint[]>([]);
  const autoCommitTimerRef = useRef<number | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<StrokePoint[]>([]);
  const [isAutoCommitting, setIsAutoCommitting] = useState<boolean>(false);

  const onSelectCandidateRef = useRef(onSelectCandidate);
  useEffect(() => {
    onSelectCandidateRef.current = onSelectCandidate;
  }, [onSelectCandidate]);

  // Clear auto-commit timer helper
  const cancelAutoCommit = useCallback(() => {
    if (autoCommitTimerRef.current !== null) {
      window.clearTimeout(autoCommitTimerRef.current);
      autoCommitTimerRef.current = null;
    }
    setIsAutoCommitting(false);
  }, []);

  const [commitKey, setCommitKey] = useState<number>(0);

  useEffect(() => {
    cancelAutoCommit();
    isDrawingRef.current = false;
    currentStrokeRef.current = [];
    setStrokes([]);
    setCurrentStroke([]);
  }, [selectedCellKey, cancelAutoCommit]);

  const activeStrokes =
    currentStroke.length > 0 ? [...strokes, currentStroke] : strokes;

  // Memoize stroke signature to avoid unnecessary new array instances of candidates
  const strokesKey = useMemo(() => {
    return `${strokes.length}-${strokes.reduce((acc, s) => acc + s.length, 0)}-${currentStroke.length}`;
  }, [strokes, currentStroke]);

  const candidates = useMemo(() => {
    return recognizeHandwritingCandidates(activeStrokes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokesKey]);

  const topCandidateRef = useRef<string | null>(null);
  useEffect(() => {
    topCandidateRef.current = candidates[0] || null;
  }, [candidates]);

  // Commits the top candidate into the active cell reliably
  const commitTopCandidate = useCallback(() => {
    if (isDrawingRef.current) return;
    const char = topCandidateRef.current;
    if (!char) return;

    if (autoCommitTimerRef.current !== null) {
      window.clearTimeout(autoCommitTimerRef.current);
      autoCommitTimerRef.current = null;
    }
    setIsAutoCommitting(false);
    setStrokes([]);
    currentStrokeRef.current = [];
    setCurrentStroke([]);
    onSelectCandidateRef.current?.(char);
  }, []);

  // Auto-commit: 1 second after user finishes drawing a stroke, auto-enter top candidate (#1)
  useEffect(() => {
    if (isDrawingRef.current || strokes.length === 0) {
      cancelAutoCommit();
      return;
    }

    const topCandidate = candidates[0];
    if (!topCandidate) {
      cancelAutoCommit();
      return;
    }

    // Start 1-second auto-commit countdown
    if (autoCommitTimerRef.current !== null) {
      window.clearTimeout(autoCommitTimerRef.current);
    }
    setIsAutoCommitting(true);
    setCommitKey((k) => k + 1);

    autoCommitTimerRef.current = window.setTimeout(() => {
      autoCommitTimerRef.current = null;
      commitTopCandidate();
    }, 1000);

    return () => {
      if (autoCommitTimerRef.current !== null) {
        window.clearTimeout(autoCommitTimerRef.current);
        autoCommitTimerRef.current = null;
      }
    };
  }, [strokes, candidates, commitTopCandidate, cancelAutoCommit]);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = isDarkMode ? '#262220' : '#FCF9F2';
    ctx.fillRect(0, 0, width, height);

    // 십자(+) 점선 가이드 (#12)
    ctx.save();
    ctx.strokeStyle = isDarkMode ? 'rgba(214, 199, 178, 0.3)' : 'rgba(168, 144, 116, 0.48)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.restore();

    const allStrokes =
      currentStroke.length > 0 ? [...strokes, currentStroke] : strokes;
    ctx.save();
    ctx.strokeStyle = isDarkMode ? '#F5F0E6' : '#231F1C';
    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const stroke of allStrokes) {
      if (stroke.length === 0) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        const midX = (stroke[i - 1].x + stroke[i].x) / 2;
        const midY = (stroke[i - 1].y + stroke[i].y) / 2;
        ctx.quadraticCurveTo(stroke[i - 1].x, stroke[i - 1].y, midX, midY);
      }
      if (stroke.length === 1) {
        ctx.lineTo(stroke[0].x + 0.5, stroke[0].y + 0.5);
      } else {
        const last = stroke[stroke.length - 1];
        ctx.lineTo(last.x, last.y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }, [strokes, currentStroke, isDarkMode]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / Math.max(1, rect.width);
    const scaleY = canvas.height / Math.max(1, rect.height);
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    cancelAutoCommit();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const pt = getCanvasPoint(e);
    isDrawingRef.current = true;
    currentStrokeRef.current = [pt];
    setCurrentStroke([pt]);
    soundManager.playPaperScratch(1.1);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const pt = getCanvasPoint(e);
    const cur = currentStrokeRef.current;
    if (cur.length > 0) {
      const last = cur[cur.length - 1];
      const dist = Math.hypot(pt.x - last.x, pt.y - last.y);
      if (dist > 2.5) {
        soundManager.playPaperScratch(Math.min(1.4, dist / 14));
        const next = [...cur, pt];
        currentStrokeRef.current = next;
        setCurrentStroke(next);
      }
    } else {
      currentStrokeRef.current = [pt];
      setCurrentStroke([pt]);
    }
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const finished = currentStrokeRef.current;
    if (finished.length > 0) {
      setStrokes((prev) => [...prev, finished]);
      currentStrokeRef.current = [];
      setCurrentStroke([]);
    }
  };

  const handleUndoStroke = () => {
    cancelAutoCommit();
    soundManager.playPaperScratch(0.6);
    setStrokes((prev) => prev.slice(0, -1));
    currentStrokeRef.current = [];
    setCurrentStroke([]);
  };

  const handleClearAllStrokes = () => {
    cancelAutoCommit();
    soundManager.playPaperScratch(0.8);
    setStrokes([]);
    currentStrokeRef.current = [];
    setCurrentStroke([]);
    if (currentCellInput) {
      onClearCell();
    }
  };

  const handleCandidateClick = (char: string) => {
    cancelAutoCommit();
    onSelectCandidate(char);
    setStrokes([]);
    currentStrokeRef.current = [];
    setCurrentStroke([]);
  };

  return (
    <div
      className={`h-full rounded-2xl border p-2 flex flex-col justify-between gap-1.5 transition-colors overflow-hidden ${
        isDarkMode
          ? 'bg-stone-900 border-stone-700 text-stone-100'
          : 'bg-[#EFE9DA] border-[#D8CEBE] text-[#2C2520]'
      }`}
    >
      {/* 상단: 손글씨 인식 추천 글자 5개 (1초 정지 시 1순위 글자 자동 입력) */}
      <div
        className="grid grid-cols-5 gap-1 shrink-0"
        role="group"
        aria-label="손글씨 인식 추천 글자 5개"
      >
        {[0, 1, 2, 3, 4].map((idx) => {
          const char = candidates[idx];
          return char ? (
            <button
              key={`${char}-${idx}`}
              type="button"
              onClick={() => handleCandidateClick(char)}
              aria-label={`추천 글자 ${char} 선택`}
              className={`relative overflow-hidden h-9 sm:h-10 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center border transition-all active:scale-95 whitespace-nowrap shrink-0 ${
                idx === 0
                  ? isDarkMode
                    ? 'bg-amber-700 border-amber-500 text-amber-50 ring-2 ring-amber-400/60'
                    : 'bg-[#B85D3B] border-[#9A4829] text-white ring-2 ring-[#B85D3B]/40'
                  : isDarkMode
                  ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700'
                  : 'bg-[#FDFBF7] border-[#D5CBB8] text-[#2C2520] hover:bg-[#F5EFE2]'
              }`}
            >
              <span>{char}</span>
              {/* 1초 자동 입력 진행 상태 바 */}
              {idx === 0 && isAutoCommitting && (
                <span
                  key={commitKey}
                  onAnimationEnd={commitTopCandidate}
                  className="absolute bottom-0 left-0 h-1 bg-white/90 rounded-full"
                  style={{
                    animation: 'autoCommitProgress 1000ms linear forwards',
                  }}
                />
              )}
            </button>
          ) : (
            <div
              key={`empty-${idx}`}
              className={`h-9 sm:h-10 rounded-lg border border-dashed flex items-center justify-center text-xs ${
                isDarkMode
                  ? 'border-stone-700 bg-stone-950/40 text-stone-600'
                  : 'border-[#CBBFA8] bg-[#F8F4EA] text-[#B0A392]'
              }`}
            >
              ·
            </div>
          );
        })}
      </div>

      {/* 중앙: 십자 점선 손글씨 패드 */}
      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={180}
          height={130}
          data-testid="handwriting-canvas"
          aria-label="손글씨 입력 패드"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-full h-full rounded-xl border-2 touch-none cursor-crosshair shadow-inner ${
            isDarkMode ? 'border-stone-600' : 'border-[#C4B69E]'
          }`}
        />
      </div>

      {/* 하단: 뒤로가는 화살표(한 획 지우기) & 지우개(전부 삭제) */}
      <div className="grid grid-cols-2 gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleUndoStroke}
          disabled={strokes.length === 0}
          aria-label="한 획 지우기"
          className={`h-9 rounded-lg border font-bold text-xs flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
            strokes.length === 0
              ? isDarkMode
                ? 'bg-stone-800/40 border-stone-800 text-stone-600 cursor-not-allowed'
                : 'bg-[#E5DEC9]/60 border-[#D8CEBE] text-[#9E9284] cursor-not-allowed'
              : isDarkMode
              ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95'
              : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#2C2520] hover:bg-[#F3ECE0] active:scale-95'
          }`}
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>한 획</span>
        </button>

        <button
          type="button"
          onClick={handleClearAllStrokes}
          aria-label="전부 지우기"
          className={`h-9 rounded-lg border font-bold text-xs flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
            isDarkMode
              ? 'bg-rose-950/60 border-rose-800/80 text-rose-200 hover:bg-rose-900/70 active:scale-95'
              : 'bg-[#FDF2F0] border-[#E2B4AD] text-[#9E2A2B] hover:bg-[#F9E3DF] active:scale-95'
          }`}
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>지우개</span>
        </button>
      </div>
    </div>
  );
};
