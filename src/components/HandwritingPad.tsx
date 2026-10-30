import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Undo2, Eraser } from 'lucide-react';
import {
  type Stroke,
  type StrokePoint,
  recognizeHandwritingOnline,
} from '../game/rules.ts';
import { soundManager } from '../game/audio.ts';

interface HandwritingPadProps {
  selectedCellKey: string;
  currentCellInput: string;
  expectedChar?: string;
  isDarkMode: boolean;
  autoCommitDelaySec?: number;
  contextSyllables?: string[];
  onOfflineDetected?: () => void;
  onSelectCandidate: (char: string) => void;
  onClearCell: () => void;
}

export const HandwritingPad: React.FC<HandwritingPadProps> = ({
  selectedCellKey,
  currentCellInput,
  expectedChar = '',
  isDarkMode,
  autoCommitDelaySec = 1.5,
  contextSyllables,
  onOfflineDetected,
  onSelectCandidate,
  onClearCell,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRectRef = useRef<DOMRect | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const writingStartTimeRef = useRef<number>(0);
  const recognitionRequestIdRef = useRef<number>(0);
  const currentStrokeRef = useRef<StrokePoint[]>([]);
  const strokesRef = useRef<Stroke[]>([]);
  const recognitionTimerRef = useRef<number | null>(null);
  const autoCommitTimerRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [isAutoCommitting, setIsAutoCommitting] = useState<boolean>(false);
  const [commitKey, setCommitKey] = useState<number>(0);

  const onSelectCandidateRef = useRef(onSelectCandidate);
  useEffect(() => {
    onSelectCandidateRef.current = onSelectCandidate;
  }, [onSelectCandidate]);

  const expectedCharRef = useRef(expectedChar);
  useEffect(() => {
    expectedCharRef.current = expectedChar;
  }, [expectedChar]);

  const contextSyllablesRef = useRef(contextSyllables);
  useEffect(() => {
    contextSyllablesRef.current = contextSyllables;
  }, [contextSyllables]);

  const onOfflineDetectedRef = useRef(onOfflineDetected);
  useEffect(() => {
    onOfflineDetectedRef.current = onOfflineDetected;
  }, [onOfflineDetected]);

  // Clear timers without forcing a synchronous React re-render during pointerdown
  const clearPendingTimersOnly = useCallback(() => {
    if (recognitionTimerRef.current !== null) {
      window.clearTimeout(recognitionTimerRef.current);
      recognitionTimerRef.current = null;
    }
    if (autoCommitTimerRef.current !== null) {
      window.clearTimeout(autoCommitTimerRef.current);
      autoCommitTimerRef.current = null;
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.display = 'none';
    }
  }, []);

  const cancelAutoCommit = useCallback(() => {
    clearPendingTimersOnly();
    setIsAutoCommitting(false);
  }, [clearPendingTimersOnly]);

  const configureInkContext = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.setLineDash([]);
      ctx.strokeStyle = isDarkMode ? '#F5F0E6' : '#231F1C';
      ctx.lineWidth = 5.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },
    [isDarkMode]
  );

  const renderCanvas = useCallback(
    (completedStrokesOverride?: Stroke[], activeStrokeOverride?: StrokePoint[]) => {
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

      const baseStrokes = completedStrokesOverride ?? strokesRef.current;
      const inProgress = activeStrokeOverride ?? currentStrokeRef.current;
      const allStrokes =
        inProgress.length > 0 ? [...baseStrokes, inProgress] : baseStrokes;

      ctx.save();
      configureInkContext(ctx);

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
    },
    [isDarkMode, configureInkContext]
  );

  useEffect(() => {
    cancelAutoCommit();
    recognitionRequestIdRef.current += 1;
    isDrawingRef.current = false;
    writingStartTimeRef.current = 0;
    currentStrokeRef.current = [];
    strokesRef.current = [];
    setStrokes([]);
    setCandidates([]);
    renderCanvas([], []);
  }, [selectedCellKey, cancelAutoCommit, renderCanvas]);

  const topCandidate = candidates[0] || '';
  const topCandidateRef = useRef<string | null>(null);
  useEffect(() => {
    topCandidateRef.current = topCandidate || null;
  }, [topCandidate]);

  // Commits the top candidate into the active cell reliably
  const commitTopCandidate = useCallback(() => {
    if (isDrawingRef.current) return;
    const char = topCandidateRef.current;
    if (!char) return;

    clearPendingTimersOnly();
    recognitionRequestIdRef.current += 1;
    setIsAutoCommitting(false);
    writingStartTimeRef.current = 0;
    currentStrokeRef.current = [];
    strokesRef.current = [];
    setStrokes([]);
    setCandidates([]);
    renderCanvas([], []);
    onSelectCandidateRef.current?.(char);
  }, [clearPendingTimersOnly, renderCanvas]);

  // Auto-commit: after recognition produces candidates, auto-enter top candidate (#1)
  useEffect(() => {
    if (isDrawingRef.current || strokes.length === 0) {
      cancelAutoCommit();
      return;
    }

    if (!topCandidate) {
      cancelAutoCommit();
      return;
    }

    if (autoCommitTimerRef.current !== null) {
      window.clearTimeout(autoCommitTimerRef.current);
    }
    setIsAutoCommitting(true);
    setCommitKey((k) => k + 1);

    const delayMs = Math.max(300, Math.round(autoCommitDelaySec * 1000));
    autoCommitTimerRef.current = window.setTimeout(() => {
      autoCommitTimerRef.current = null;
      commitTopCandidate();
    }, delayMs);

    return () => {
      if (autoCommitTimerRef.current !== null) {
        window.clearTimeout(autoCommitTimerRef.current);
        autoCommitTimerRef.current = null;
      }
    };
  }, [strokes, topCandidate, autoCommitDelaySec, commitTopCandidate, cancelAutoCommit]);

  useEffect(() => {
    renderCanvas(strokesRef.current, currentStrokeRef.current);
  }, [isDarkMode, renderCanvas]);

  const getPointFromCoords = (clientX: number, clientY: number): StrokePoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, t: 0 };
    const rect = canvasRectRef.current ?? canvas.getBoundingClientRect();
    const scaleX = canvas.width / Math.max(1, rect.width);
    const scaleY = canvas.height / Math.max(1, rect.height);
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const relTime =
      writingStartTimeRef.current > 0 ? Math.max(0, Math.round(now - writingStartTimeRef.current)) : 0;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
      t: relTime,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    clearPendingTimersOnly();
    recognitionRequestIdRef.current += 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvasRectRef.current = canvas.getBoundingClientRect();
    e.currentTarget.setPointerCapture?.(e.pointerId);

    if (strokesRef.current.length === 0 && currentStrokeRef.current.length === 0) {
      writingStartTimeRef.current =
        typeof performance !== 'undefined' ? performance.now() : Date.now();
    }

    const pt = getPointFromCoords(e.clientX, e.clientY);
    isDrawingRef.current = true;
    currentStrokeRef.current = [pt];

    const ctx = canvas.getContext('2d');
    if (ctx) {
      configureInkContext(ctx);
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(pt.x + 0.5, pt.y + 0.5);
      ctx.stroke();
    }

    soundManager.playPaperScratch(0.85);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    configureInkContext(ctx);
    const cur = currentStrokeRef.current;
    const nativeEv = e.nativeEvent as PointerEvent;
    const coalesced =
      typeof nativeEv.getCoalescedEvents === 'function'
        ? nativeEv.getCoalescedEvents()
        : null;
    const eventList = coalesced && coalesced.length > 0 ? coalesced : [nativeEv];

    let hasNewPoints = false;
    ctx.beginPath();

    for (let i = 0; i < eventList.length; i++) {
      const ev = eventList[i];
      const pt = getPointFromCoords(ev.clientX, ev.clientY);
      if (cur.length === 0) {
        cur.push(pt);
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + 0.5, pt.y + 0.5);
        hasNewPoints = true;
        continue;
      }

      const last = cur[cur.length - 1];
      const dist = Math.hypot(pt.x - last.x, pt.y - last.y);
      if (dist > 1.2) {
        cur.push(pt);
        hasNewPoints = true;
        const n = cur.length;
        if (n === 2) {
          const midX = (cur[0].x + cur[1].x) * 0.5;
          const midY = (cur[0].y + cur[1].y) * 0.5;
          ctx.moveTo(cur[0].x, cur[0].y);
          ctx.lineTo(midX, midY);
        } else {
          const p0 = cur[n - 3];
          const p1 = cur[n - 2];
          const p2 = cur[n - 1];
          const prevMidX = (p0.x + p1.x) * 0.5;
          const prevMidY = (p0.y + p1.y) * 0.5;
          const newMidX = (p1.x + p2.x) * 0.5;
          const newMidY = (p1.y + p2.y) * 0.5;
          ctx.moveTo(prevMidX, prevMidY);
          ctx.quadraticCurveTo(p1.x, p1.y, newMidX, newMidY);
        }
      }
    }

    if (hasNewPoints) {
      ctx.stroke();
    }
  };

  const executeRecognition = useCallback((targetStrokes: Stroke[]) => {
    const reqId = ++recognitionRequestIdRef.current;
    if (targetStrokes.length === 0) {
      setStrokes([]);
      setCandidates([]);
      return;
    }

    setStrokes(targetStrokes);

    const canvas = canvasRef.current;
    void recognizeHandwritingOnline(targetStrokes, {
      expectedChar: expectedCharRef.current,
      contextSyllables: contextSyllablesRef.current,
      width: canvas?.width || 280,
      height: canvas?.height || 280,
      timeoutMs: 1500,
      onNetworkError: () => {
        onOfflineDetectedRef.current?.();
      },
    }).then((onlineCandidates) => {
      if (
        reqId !== recognitionRequestIdRef.current ||
        isDrawingRef.current ||
        strokesRef.current.length === 0
      ) {
        return;
      }
      if (onlineCandidates && onlineCandidates.length > 0) {
        setCandidates(onlineCandidates);
      }
    });
  }, []);

  const scheduleRecognition = useCallback(() => {
    if (recognitionTimerRef.current !== null) {
      window.clearTimeout(recognitionTimerRef.current);
    }
    // 240ms debounce: allows multi-stroke Korean letters to be written smoothly without thread freezes
    recognitionTimerRef.current = window.setTimeout(() => {
      recognitionTimerRef.current = null;
      if (isDrawingRef.current) return;
      const latestStrokes = [...strokesRef.current];
      executeRecognition(latestStrokes);
    }, 240);
  }, [executeRecognition]);

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const finished = [...currentStrokeRef.current];
    currentStrokeRef.current = [];
    if (finished.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && finished.length >= 2) {
        configureInkContext(ctx);
        const pPrev = finished[finished.length - 2];
        const pLast = finished[finished.length - 1];
        const midX = (pPrev.x + pLast.x) * 0.5;
        const midY = (pPrev.y + pLast.y) * 0.5;
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(pLast.x, pLast.y);
        ctx.stroke();
      }
      strokesRef.current = [...strokesRef.current, finished];
      scheduleRecognition();
    } else {
      renderCanvas(strokesRef.current, []);
    }
  };

  const handleUndoStroke = () => {
    cancelAutoCommit();
    soundManager.playPaperScratch(0.6);
    currentStrokeRef.current = [];
    const next = strokesRef.current.slice(0, -1);
    strokesRef.current = next;
    if (next.length === 0) {
      writingStartTimeRef.current = 0;
    }
    renderCanvas(next, []);
    executeRecognition(next);
  };

  const handleClearAllStrokes = () => {
    cancelAutoCommit();
    recognitionRequestIdRef.current += 1;
    soundManager.playPaperScratch(0.8);
    writingStartTimeRef.current = 0;
    currentStrokeRef.current = [];
    strokesRef.current = [];
    setStrokes([]);
    setCandidates([]);
    renderCanvas([], []);
    if (currentCellInput) {
      onClearCell();
    }
  };

  const handleCandidateClick = (char: string) => {
    cancelAutoCommit();
    recognitionRequestIdRef.current += 1;
    writingStartTimeRef.current = 0;
    currentStrokeRef.current = [];
    strokesRef.current = [];
    setStrokes([]);
    setCandidates([]);
    renderCanvas([], []);
    onSelectCandidate(char);
  };

  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const [squareSize, setSquareSize] = useState<number>(156);

  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;

    const updateSquareSize = () => {
      canvasRectRef.current = null;
      const rect = el.getBoundingClientRect();
      const side = Math.floor(Math.min(rect.width, rect.height) - 2);
      if (side > 40) {
        setSquareSize(side);
      }
    };

    updateSquareSize();
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSquareSize) : null;
    observer?.observe(el);
    window.addEventListener('resize', updateSquareSize);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateSquareSize);
    };
  }, []);

  return (
    <div
      className={`h-full w-full min-w-0 rounded-2xl border p-1.5 md:p-2.5 flex flex-col justify-between gap-1 md:gap-2 transition-colors overflow-hidden ${
        isDarkMode
          ? 'bg-stone-900 border-stone-700 text-stone-100'
          : 'bg-[#EFE9DA] border-[#D8CEBE] text-[#2C2520]'
      }`}
    >
      {/* 상단: 손글씨 인식 추천 글자 5개 (정지 시 1순위 글자 자동 입력) */}
      <div
        className="grid grid-cols-5 gap-1 md:gap-1.5 shrink-0 min-w-0"
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
              className={`relative overflow-hidden h-8 sm:h-9 md:h-11 rounded-lg md:rounded-xl font-bold text-base sm:text-lg md:text-xl flex items-center justify-center border transition-all active:scale-95 whitespace-nowrap shrink-0 ${
                idx === 0
                  ? isDarkMode
                    ? 'bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9] ring-2 ring-[#E2A872]/60'
                    : 'bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9] ring-2 ring-[#CC8B52]/35'
                  : isDarkMode
                  ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700'
                  : 'bg-[#FDFBF7] border-[#D5CBB8] text-[#2C2520] hover:bg-[#F5EFE2]'
              }`}
            >
              <span>{char}</span>
              {/* 자동 입력 진행 상태 바 (설정된 지연 시간) */}
              {idx === 0 && isAutoCommitting && (
                <span
                  ref={progressBarRef}
                  key={commitKey}
                  onAnimationEnd={commitTopCandidate}
                  className="absolute bottom-0 left-0 h-1 bg-white/90 rounded-full"
                  style={{
                    animation: `autoCommitProgress ${Math.max(300, Math.round(autoCommitDelaySec * 1000))}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ) : (
            <div
              key={`empty-${idx}`}
              className={`h-8 sm:h-9 md:h-11 rounded-lg md:rounded-xl border border-dashed flex items-center justify-center text-xs md:text-sm ${
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

      {/* 중앙: 1:1 정사각형 십자 점선 손글씨 패드 */}
      <div
        ref={canvasWrapRef}
        className="relative flex-1 min-h-0 min-w-0 w-full flex items-center justify-center overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          data-testid="handwriting-canvas"
          aria-label="손글씨 입력 패드"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
          }}
          className={`aspect-square max-w-full max-h-full rounded-xl border-2 touch-none cursor-crosshair shadow-inner shrink-0 ${
            isDarkMode ? 'border-stone-600' : 'border-[#C4B69E]'
          }`}
        />
      </div>

      {/* 하단: 뒤로가는 화살표(한 획 지우기) & 지우개(전부 삭제) */}
      <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
        <button
          type="button"
          onClick={handleUndoStroke}
          disabled={strokes.length === 0}
          aria-label="한 획 지우기"
          className={`flex-1 h-8 sm:h-9 md:h-10 rounded-lg md:rounded-xl border font-bold text-xs md:text-sm flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
            strokes.length === 0
              ? isDarkMode
                ? 'bg-stone-800/40 border-stone-800 text-stone-600 cursor-not-allowed'
                : 'bg-[#E5DEC9]/60 border-[#D8CEBE] text-[#9E9284] cursor-not-allowed'
              : isDarkMode
              ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95'
              : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#2C2520] hover:bg-[#F3ECE0] active:scale-95'
          }`}
        >
          <Undo2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>한 획</span>
        </button>

        <button
          type="button"
          onClick={handleClearAllStrokes}
          aria-label="전부 지우기"
          className={`flex-1 h-8 sm:h-9 md:h-10 rounded-lg md:rounded-xl border font-bold text-xs md:text-sm flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
            isDarkMode
              ? 'bg-rose-950/60 border-rose-800/80 text-rose-200 hover:bg-rose-900/70 active:scale-95'
              : 'bg-[#FDF2F0] border-[#E2B4AD] text-[#9E2A2B] hover:bg-[#F9E3DF] active:scale-95'
          }`}
        >
          <Eraser className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>지우개</span>
        </button>
      </div>
    </div>
  );
};
