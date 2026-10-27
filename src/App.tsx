import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Play,
  Settings,
  Coins,
  Clock,
  Lightbulb,
  Sparkles,
  Lock,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  STAGE_PUZZLES,
  type CrosswordPuzzle,
  type Direction,
  type WordClue,
} from './game/puzzles.ts';
import {
  buildCrosswordGrid,
  applyCellInput,
  getWordCells,
  isPuzzleComplete,
  canAffordHint,
  HINT_LETTER_COST,
  HINT_WORD_COST,
  INITIAL_CURRENCY,
  formatTimerMMSS,
  type GridCell,
} from './game/rules.ts';
import { soundManager } from './game/audio.ts';
import { HandwritingPad } from './components/HandwritingPad.tsx';
import { TypingPad } from './components/TypingPad.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { StageClearModal } from './components/StageClearModal.tsx';

type ScreenState = 'title' | 'stage_select' | 'playing' | 'gameover';

const STORAGE_KEY = 'ongeul_crossword_save_v3';

interface ActivePuzzleSave {
  puzzleId: string;
  grid: GridCell[][];
  solvedWordIds: string[];
  selectedCell: { row: number; col: number };
  activeDirection: Direction;
  elapsedSeconds: number;
  runWordRewardEarned: number;
}

interface SavedGameState {
  currency: number;
  highestReachedStage: number;
  clearedStageIds: string[];
  settings?: {
    inputMode?: 'handwriting' | 'typing';
    bgmEnabled?: boolean;
    sfxEnabled?: boolean;
    isDarkMode?: boolean;
  };
  activePuzzle?: ActivePuzzleSave | null;
}

function loadInitialSave(): SavedGameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved state:', e);
    return null;
  }
}

function saveStateToStorage(updater: (prev: SavedGameState) => SavedGameState) {
  if (typeof window === 'undefined') return;
  try {
    const prev = loadInitialSave() || {
      currency: INITIAL_CURRENCY,
      highestReachedStage: 0,
      clearedStageIds: [],
      settings: {
        inputMode: 'handwriting',
        bgmEnabled: true,
        sfxEnabled: true,
        isDarkMode: false,
      },
      activePuzzle: null,
    };
    const next = updater(prev);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export default function App() {
  const initialAutoStart = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('autostart') === '1';
  }, []);

  const initialSave = useMemo(() => loadInitialSave(), []);

  const [screen, setScreen] = useState<ScreenState>(
    initialAutoStart ? 'playing' : 'title'
  );

  // Settings
  const [inputMode, setInputMode] = useState<'handwriting' | 'typing'>(
    initialSave?.settings?.inputMode ?? 'handwriting'
  );
  const [bgmEnabled, setBgmEnabled] = useState<boolean>(
    initialSave?.settings?.bgmEnabled ?? true
  );
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(
    initialSave?.settings?.sfxEnabled ?? true
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    initialSave?.settings?.isDarkMode ?? false
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Small Square Hint Button Description Modal ('letter' | 'word' | null)
  const [activeHintModal, setActiveHintModal] = useState<'letter' | 'word' | null>(null);

  // Progression & Currency
  const [currency, setCurrency] = useState<number>(
    initialSave?.currency ?? INITIAL_CURRENCY
  );
  const [highestReachedStage, setHighestReachedStage] = useState<number>(
    initialSave?.highestReachedStage ?? 0
  );
  const [clearedStageIds, setClearedStageIds] = useState<string[]>(
    initialSave?.clearedStageIds ?? []
  );

  // Active Puzzle State - Restore from saved if available
  const initialPuzzleInfo = useMemo(() => {
    const ap = initialSave?.activePuzzle;
    if (ap) {
      const found = STAGE_PUZZLES.find((p) => p.id === ap.puzzleId);
      if (found) {
        return {
          puzzle: found,
          grid: ap.grid,
          solvedWordIds: new Set(ap.solvedWordIds),
          selectedCell: ap.selectedCell,
          activeDirection: ap.activeDirection,
          elapsedSeconds: ap.elapsedSeconds,
          runWordRewardEarned: ap.runWordRewardEarned,
          hasSavedProgress: true,
        };
      }
    }
    const defaultPuzzle = STAGE_PUZZLES[0];
    return {
      puzzle: defaultPuzzle,
      grid: buildCrosswordGrid(defaultPuzzle),
      solvedWordIds: new Set<string>(),
      selectedCell: { row: defaultPuzzle.words[0].row, col: defaultPuzzle.words[0].col },
      activeDirection: defaultPuzzle.words[0].direction,
      elapsedSeconds: 0,
      runWordRewardEarned: 0,
      hasSavedProgress: false,
    };
  }, [initialSave]);

  const [currentPuzzle, setCurrentPuzzle] = useState<CrosswordPuzzle>(initialPuzzleInfo.puzzle);
  const [grid, setGrid] = useState<GridCell[][]>(initialPuzzleInfo.grid);
  const [solvedWordIds, setSolvedWordIds] = useState<Set<string>>(initialPuzzleInfo.solvedWordIds);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>(
    initialPuzzleInfo.selectedCell
  );
  const [activeDirection, setActiveDirection] = useState<Direction>(
    initialPuzzleInfo.activeDirection
  );
  const [hasSavedActiveGame, setHasSavedActiveGame] = useState<boolean>(
    Boolean(initialSave?.activePuzzle)
  );

  // Two-Finger Pinch Zoom & Pan State
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStateRef = useRef<{
    initialDistance: number | null;
    initialScale: number;
    lastPanPoint: { x: number; y: number } | null;
  }>({
    initialDistance: null,
    initialScale: 1.0,
    lastPanPoint: null,
  });

  // Timer & Rewards
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(
    initialPuzzleInfo.elapsedSeconds
  );
  const [runWordRewardEarned, setRunWordRewardEarned] = useState<number>(
    initialPuzzleInfo.runWordRewardEarned
  );

  // Robust Wall-clock Reference Timer
  const timerStartTimestampRef = useRef<number | null>(null);
  const baseElapsedSecondsRef = useRef<number>(initialPuzzleInfo.elapsedSeconds);
  const elapsedSecondsRef = useRef<number>(initialPuzzleInfo.elapsedSeconds);

  // Sync ref with current elapsedSeconds state
  useEffect(() => {
    elapsedSecondsRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  // Active Timer Tick using wall-clock time
  useEffect(() => {
    const isPlayingActive =
      screen === 'playing' && !isSettingsOpen && activeHintModal === null;

    if (!isPlayingActive) {
      if (timerStartTimestampRef.current !== null) {
        // Paused: compute elapsed delta and commit into base
        const delta = Math.floor((Date.now() - timerStartTimestampRef.current) / 1000);
        baseElapsedSecondsRef.current = Math.max(
          0,
          baseElapsedSecondsRef.current + Math.max(0, delta)
        );
        timerStartTimestampRef.current = null;
      }
      return;
    }

    // Active: initialize start timestamp if not set
    if (timerStartTimestampRef.current === null) {
      timerStartTimestampRef.current = Date.now();
    }

    const intervalId = window.setInterval(() => {
      if (timerStartTimestampRef.current !== null) {
        const delta = Math.floor((Date.now() - timerStartTimestampRef.current) / 1000);
        const nextTotal = baseElapsedSecondsRef.current + Math.max(0, delta);
        setElapsedSeconds(nextTotal);
      }
    }, 500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [screen, isSettingsOpen, activeHintModal]);

  useEffect(() => {
    document.body.dataset.state =
      screen === 'stage_select' ? 'playing' : screen;
  }, [screen]);

  useEffect(() => {
    soundManager.setConfig(bgmEnabled, sfxEnabled);
  }, [bgmEnabled, sfxEnabled]);

  // Persist Profile and Settings
  useEffect(() => {
    saveStateToStorage((prev) => ({
      ...prev,
      currency,
      highestReachedStage,
      clearedStageIds,
      settings: {
        inputMode,
        bgmEnabled,
        sfxEnabled,
        isDarkMode,
      },
    }));
  }, [
    currency,
    highestReachedStage,
    clearedStageIds,
    inputMode,
    bgmEnabled,
    sfxEnabled,
    isDarkMode,
  ]);

  // Persist Active In-Progress Puzzle whenever board state changes
  useEffect(() => {
    if (screen === 'playing') {
      setHasSavedActiveGame(true);
      saveStateToStorage((prev) => ({
        ...prev,
        activePuzzle: {
          puzzleId: currentPuzzle.id,
          grid,
          solvedWordIds: Array.from(solvedWordIds),
          selectedCell,
          activeDirection,
          elapsedSeconds: elapsedSecondsRef.current,
          runWordRewardEarned,
        },
      }));
    } else if (screen === 'gameover') {
      setHasSavedActiveGame(false);
      saveStateToStorage((prev) => ({
        ...prev,
        activePuzzle: null,
      }));
    }
  }, [
    screen,
    currentPuzzle,
    grid,
    solvedWordIds,
    selectedCell,
    activeDirection,
    runWordRewardEarned,
  ]);

  // Periodically flush elapsed time to storage every 5s while playing
  useEffect(() => {
    if (screen !== 'playing') return;
    const interval = window.setInterval(() => {
      saveStateToStorage((prev) => {
        if (!prev.activePuzzle) return prev;
        return {
          ...prev,
          activePuzzle: {
            ...prev.activePuzzle,
            elapsedSeconds: elapsedSecondsRef.current,
          },
        };
      });
    }, 5000);
    return () => window.clearInterval(interval);
  }, [screen]);

  // Flush on page unload or visibility hidden
  useEffect(() => {
    const handleUnloadOrHide = () => {
      if (screen === 'playing') {
        saveStateToStorage((prev) => ({
          ...prev,
          activePuzzle: {
            puzzleId: currentPuzzle.id,
            grid,
            solvedWordIds: Array.from(solvedWordIds),
            selectedCell,
            activeDirection,
            elapsedSeconds: elapsedSecondsRef.current,
            runWordRewardEarned,
          },
        }));
      }
    };
    window.addEventListener('beforeunload', handleUnloadOrHide);
    document.addEventListener('visibilitychange', handleUnloadOrHide);
    return () => {
      window.removeEventListener('beforeunload', handleUnloadOrHide);
      document.removeEventListener('visibilitychange', handleUnloadOrHide);
    };
  }, [
    screen,
    currentPuzzle,
    grid,
    solvedWordIds,
    selectedCell,
    activeDirection,
    runWordRewardEarned,
  ]);

  const startPuzzle = useCallback((puzzle: CrosswordPuzzle, forceFresh = false) => {
    const saved = loadInitialSave();
    const ap = saved?.activePuzzle;
    const canResume = !forceFresh && ap && ap.puzzleId === puzzle.id;

    if (canResume && ap) {
      setCurrentPuzzle(puzzle);
      setGrid(ap.grid);
      setSolvedWordIds(new Set(ap.solvedWordIds));
      setSelectedCell(ap.selectedCell);
      setActiveDirection(ap.activeDirection);
      const restoredSec = Number(ap.elapsedSeconds) || 0;
      baseElapsedSecondsRef.current = restoredSec;
      timerStartTimestampRef.current = Date.now();
      setElapsedSeconds(restoredSec);
      setRunWordRewardEarned(ap.runWordRewardEarned);
    } else {
      const freshGrid = buildCrosswordGrid(puzzle);
      const firstWord = puzzle.words[0];
      setCurrentPuzzle(puzzle);
      setGrid(freshGrid);
      setSolvedWordIds(new Set());
      setSelectedCell({ row: firstWord.row, col: firstWord.col });
      setActiveDirection(firstWord.direction);
      baseElapsedSecondsRef.current = 0;
      timerStartTimestampRef.current = Date.now();
      setElapsedSeconds(0);
      setRunWordRewardEarned(0);
    }

    setZoomScale(1.0);
    setPanOffset({ x: 0, y: 0 });
    setIsSettingsOpen(false);
    setActiveHintModal(null);
    setScreen('playing');
    soundManager.startBgm();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const resumeActivePuzzle = useCallback(() => {
    const saved = loadInitialSave();
    const ap = saved?.activePuzzle;
    if (ap) {
      const found = STAGE_PUZZLES.find((p) => p.id === ap.puzzleId);
      if (found) {
        startPuzzle(found, false);
        return;
      }
    }
    setScreen('stage_select');
  }, [startPuzzle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (screen === 'title' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        soundManager.playSnapFit();
        setScreen('stage_select');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen]);

  const activeWord = useMemo((): WordClue | null => {
    const cell = grid[selectedCell.row]?.[selectedCell.col];
    if (!cell || !cell.isPlayable) return currentPuzzle.words[0] || null;

    const preferredId =
      activeDirection === 'across'
        ? cell.acrossWordId || cell.downWordId
        : cell.downWordId || cell.acrossWordId;

    return (
      currentPuzzle.words.find((w) => w.id === preferredId) || currentPuzzle.words[0] || null
    );
  }, [grid, selectedCell, activeDirection, currentPuzzle]);

  const activeWordCoords = useMemo(() => {
    if (!activeWord) return [];
    return getWordCells(activeWord);
  }, [activeWord]);

  const advanceSelectionAfterInput = useCallback(
    (nextGrid: GridCell[][], currentRow: number, currentCol: number) => {
      if (activeWord) {
        const coords = getWordCells(activeWord);
        const currentIndex = coords.findIndex(
          (pos) => pos.row === currentRow && pos.col === currentCol
        );
        for (let i = currentIndex + 1; i < coords.length; i++) {
          const c = nextGrid[coords[i].row][coords[i].col];
          if (!c.isSolvedLocked && c.userInput !== c.solution) {
            setSelectedCell({ row: coords[i].row, col: coords[i].col });
            return;
          }
        }
      }

      for (const word of currentPuzzle.words) {
        for (const pos of getWordCells(word)) {
          const c = nextGrid[pos.row][pos.col];
          if (!c.isSolvedLocked && c.userInput !== c.solution) {
            setSelectedCell({ row: pos.row, col: pos.col });
            setActiveDirection(word.direction);
            return;
          }
        }
      }
    },
    [activeWord, currentPuzzle]
  );

  const handleCheckPuzzleVictory = useCallback(
    (nextGrid: GridCell[][], newlyEarnedWordCoins: number) => {
      if (isPuzzleComplete(nextGrid, currentPuzzle)) {
        soundManager.playStageClear();
        const clearBonus = currentPuzzle.clearReward;
        setCurrency((prev) => prev + newlyEarnedWordCoins + clearBonus);
        setRunWordRewardEarned((prev) => prev + newlyEarnedWordCoins);

        if (currentPuzzle.stageNumber !== undefined) {
          const idx = currentPuzzle.stageNumber - 1;
          setClearedStageIds((prev) =>
            prev.includes(currentPuzzle.id) ? prev : [...prev, currentPuzzle.id]
          );
          setHighestReachedStage((prev) =>
            Math.min(STAGE_PUZZLES.length - 1, Math.max(prev, idx + 1))
          );
        }

        if (timerStartTimestampRef.current !== null) {
          const delta = Math.floor((Date.now() - timerStartTimestampRef.current) / 1000);
          baseElapsedSecondsRef.current += Math.max(0, delta);
          timerStartTimestampRef.current = null;
        }
        setElapsedSeconds(baseElapsedSecondsRef.current);
        setScreen('gameover');
        return true;
      }
      return false;
    },
    [currentPuzzle]
  );

  const handleEnterCharacter = useCallback(
    (char: string) => {
      if (screen !== 'playing') return;
      const cell = grid[selectedCell.row]?.[selectedCell.col];
      if (!cell || !cell.isPlayable) return;

      let targetRow = selectedCell.row;
      let targetCol = selectedCell.col;
      if (cell.isSolvedLocked && activeWord) {
        const unlocked = getWordCells(activeWord).find(
          (pos) => !grid[pos.row][pos.col].isSolvedLocked
        );
        if (unlocked) {
          targetRow = unlocked.row;
          targetCol = unlocked.col;
        } else {
          return;
        }
      }

      const result = applyCellInput(
        grid,
        currentPuzzle,
        solvedWordIds,
        targetRow,
        targetCol,
        char
      );

      setGrid(result.nextGrid);

      if (result.newlySolvedWords.length > 0) {
        soundManager.playWordComplete();
        const nextSolved = new Set(solvedWordIds);
        result.newlySolvedWords.forEach((w) => nextSolved.add(w.id));
        setSolvedWordIds(nextSolved);

        const didWin = handleCheckPuzzleVictory(
          result.nextGrid,
          result.rewardEarned
        );
        if (!didWin) {
          setCurrency((prev) => prev + result.rewardEarned);
          setRunWordRewardEarned((prev) => prev + result.rewardEarned);
          advanceSelectionAfterInput(result.nextGrid, targetRow, targetCol);
        }
      } else if (result.wrongWordsTriggered.length > 0 || !result.isCharCorrect) {
        soundManager.playWrongBuzzer();
      } else {
        soundManager.playSnapFit();
        advanceSelectionAfterInput(result.nextGrid, targetRow, targetCol);
      }
    },
    [
      screen,
      grid,
      selectedCell,
      activeWord,
      currentPuzzle,
      solvedWordIds,
      handleCheckPuzzleVictory,
      advanceSelectionAfterInput,
    ]
  );

  const handleEnterFullWord = useCallback(
    (wordStr: string) => {
      if (screen !== 'playing' || !activeWord) return;
      const chars = Array.from(wordStr.trim());
      const coords = getWordCells(activeWord);

      let workingGrid = grid;
      const workingSolved = new Set(solvedWordIds);
      let totalReward = 0;
      let anyWrong = false;
      const newlySolvedList: WordClue[] = [];

      coords.forEach((pos, idx) => {
        if (idx >= chars.length) return;
        const cell = workingGrid[pos.row][pos.col];
        if (cell.isSolvedLocked) return;

        const res = applyCellInput(
          workingGrid,
          currentPuzzle,
          workingSolved,
          pos.row,
          pos.col,
          chars[idx]
        );
        workingGrid = res.nextGrid;
        if (!res.isCharCorrect) {
          anyWrong = true;
        }
        if (res.newlySolvedWords.length > 0) {
          res.newlySolvedWords.forEach((w) => {
            if (!workingSolved.has(w.id)) {
              workingSolved.add(w.id);
              newlySolvedList.push(w);
              totalReward += currentPuzzle.wordReward;
            }
          });
        }
      });

      setGrid(workingGrid);
      setSolvedWordIds(workingSolved);

      if (newlySolvedList.length > 0) {
        soundManager.playWordComplete();
        const didWin = handleCheckPuzzleVictory(workingGrid, totalReward);
        if (!didWin) {
          setCurrency((prev) => prev + totalReward);
          setRunWordRewardEarned((prev) => prev + totalReward);
          advanceSelectionAfterInput(
            workingGrid,
            coords[coords.length - 1].row,
            coords[coords.length - 1].col
          );
        }
      } else if (anyWrong) {
        soundManager.playWrongBuzzer();
      } else {
        soundManager.playSnapFit();
      }
    },
    [
      screen,
      activeWord,
      grid,
      solvedWordIds,
      currentPuzzle,
      handleCheckPuzzleVictory,
      advanceSelectionAfterInput,
    ]
  );

  const handleClearCurrentCell = useCallback(() => {
    const cell = grid[selectedCell.row]?.[selectedCell.col];
    if (!cell || !cell.isPlayable || cell.isSolvedLocked) return;
    setGrid((prev) =>
      prev.map((rowArr, r) =>
        rowArr.map((c, colIdx) =>
          r === selectedCell.row && colIdx === selectedCell.col
            ? { ...c, userInput: '', isWrongAlert: false }
            : c
        )
      )
    );
  }, [grid, selectedCell]);

  const handleConfirmLetterHint = () => {
    if (!canAffordHint(currency, 'letter')) {
      soundManager.playWrongBuzzer();
      return;
    }

    let targetPos = selectedCell;
    const curCell = grid[targetPos.row]?.[targetPos.col];
    if (!curCell || !curCell.isPlayable || curCell.isSolvedLocked) {
      const fallback = activeWordCoords.find(
        (pos) => !grid[pos.row][pos.col].isSolvedLocked
      );
      if (!fallback) {
        setActiveHintModal(null);
        return;
      }
      targetPos = fallback;
    }

    const answerChar = grid[targetPos.row][targetPos.col].solution;
    setCurrency((prev) => prev - HINT_LETTER_COST);
    setActiveHintModal(null);
    handleEnterCharacter(answerChar);
  };

  const handleConfirmWordHint = () => {
    if (!activeWord) return;
    if (!canAffordHint(currency, 'word')) {
      soundManager.playWrongBuzzer();
      return;
    }

    const coords = getWordCells(activeWord);
    const hasUnlocked = coords.some((pos) => !grid[pos.row][pos.col].isSolvedLocked);
    if (!hasUnlocked) {
      setActiveHintModal(null);
      return;
    }

    setCurrency((prev) => prev - HINT_WORD_COST);
    setActiveHintModal(null);
    handleEnterFullWord(activeWord.answer);
  };

  const handleCellClick = (row: number, col: number) => {
    const cell = grid[row]?.[col];
    if (!cell || !cell.isPlayable) return;

    soundManager.playSnapFit();
    if (selectedCell.row === row && selectedCell.col === col) {
      if (cell.acrossWordId && cell.downWordId) {
        setActiveDirection((prev) => (prev === 'across' ? 'down' : 'across'));
      }
    } else {
      setSelectedCell({ row, col });
      if (activeDirection === 'across' && !cell.acrossWordId && cell.downWordId) {
        setActiveDirection('down');
      } else if (activeDirection === 'down' && !cell.downWordId && cell.acrossWordId) {
        setActiveDirection('across');
      }
    }
  };

  const handleCycleWord = (delta: number) => {
    const words = currentPuzzle.words;
    if (words.length === 0) return;
    const curIdx = activeWord ? words.findIndex((w) => w.id === activeWord.id) : 0;
    const nextIdx = (curIdx + delta + words.length) % words.length;
    const nextWord = words[nextIdx];
    setSelectedCell({ row: nextWord.row, col: nextWord.col });
    setActiveDirection(nextWord.direction);
    soundManager.playSnapFit();
  };

  // Two-finger Pinch-to-Zoom & Pan handlers on the Crossword Board
  const handleBoardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStateRef.current.initialDistance = Math.hypot(dx, dy);
      pinchStateRef.current.initialScale = zoomScale;
      pinchStateRef.current.lastPanPoint = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    } else if (e.touches.length === 1 && zoomScale > 1.02) {
      pinchStateRef.current.lastPanPoint = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleBoardTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStateRef.current.initialDistance !== null) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / Math.max(10, pinchStateRef.current.initialDistance);
      const nextScale = Math.min(2.4, Math.max(1.0, pinchStateRef.current.initialScale * ratio));
      setZoomScale(nextScale);

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if (pinchStateRef.current.lastPanPoint) {
        const deltaX = midX - pinchStateRef.current.lastPanPoint.x;
        const deltaY = midY - pinchStateRef.current.lastPanPoint.y;
        setPanOffset((prev) => ({
          x: Math.min(120, Math.max(-120, prev.x + deltaX)),
          y: Math.min(120, Math.max(-120, prev.y + deltaY)),
        }));
      }
      pinchStateRef.current.lastPanPoint = { x: midX, y: midY };
      if (nextScale <= 1.02) {
        setPanOffset({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && zoomScale > 1.02 && pinchStateRef.current.lastPanPoint) {
      const deltaX = e.touches[0].clientX - pinchStateRef.current.lastPanPoint.x;
      const deltaY = e.touches[0].clientY - pinchStateRef.current.lastPanPoint.y;
      setPanOffset((prev) => ({
        x: Math.min(120, Math.max(-120, prev.x + deltaX)),
        y: Math.min(120, Math.max(-120, prev.y + deltaY)),
      }));
      pinchStateRef.current.lastPanPoint = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleBoardTouchEnd = () => {
    pinchStateRef.current.initialDistance = null;
    pinchStateRef.current.lastPanPoint = null;
  };

  const handleBoardWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoomScale((prev) => {
        const next = Math.min(2.4, Math.max(1.0, prev - e.deltaY * 0.005));
        if (next <= 1.02) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const currentStageIndex = currentPuzzle.stageNumber
    ? currentPuzzle.stageNumber - 1
    : -1;
  const hasNextStage =
    currentStageIndex >= 0 &&
    currentStageIndex + 1 < STAGE_PUZZLES.length;

  return (
    <div
      className={`h-[100dvh] w-full overflow-hidden flex flex-col transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#1C1917] text-[#F5F2EB]'
          : 'bg-[#F7F3E9] text-[#2C2520]'
      }`}
    >
      {/* =====================================================================
          1. 메인 화면 (제목과 시작 버튼으로만 구성)
      ===================================================================== */}
      {screen === 'title' && (
        <main className="h-full w-full flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="flex flex-col items-center gap-10 w-full max-w-xs text-center">
            <div className="flex flex-col items-center gap-4">
              <svg
                viewBox="0 0 64 64"
                className="w-20 h-20 shadow-md rounded-2xl"
                role="img"
                aria-label="온글 십자말풀이 로고"
              >
                <rect
                  x="0"
                  y="0"
                  width="64"
                  height="64"
                  rx="16"
                  fill={isDarkMode ? '#B45309' : '#B85D3B'}
                />
                <line
                  x1="32"
                  y1="8"
                  x2="32"
                  y2="56"
                  stroke="#FDFBF7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                <line
                  x1="8"
                  y1="32"
                  x2="56"
                  y2="32"
                  stroke="#FDFBF7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                <text
                  x="20"
                  y="25"
                  textAnchor="middle"
                  fill="#FDFBF7"
                  fontSize="16"
                  fontWeight="800"
                  fontFamily="IBM Plex Sans KR, sans-serif"
                >
                  온
                </text>
                <text
                  x="44"
                  y="48"
                  textAnchor="middle"
                  fill="#FDFBF7"
                  fontSize="16"
                  fontWeight="800"
                  fontFamily="IBM Plex Sans KR, sans-serif"
                >
                  글
                </text>
              </svg>

              <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">
                온글 십자말풀이
              </h1>
            </div>

            <div className="w-full flex flex-col gap-2.5">
              {hasSavedActiveGame && (
                <button
                  type="button"
                  data-resume="true"
                  onClick={() => {
                    soundManager.playSnapFit();
                    resumeActivePuzzle();
                  }}
                  className={`w-full min-h-[58px] rounded-2xl font-bold text-xl flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95 whitespace-nowrap ${
                    isDarkMode
                      ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                      : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C]'
                  }`}
                >
                  <Play className="w-6 h-6 fill-current" />
                  <span>이어서 풀기</span>
                </button>
              )}

              <button
                type="button"
                data-start="true"
                onClick={() => {
                  soundManager.playSnapFit();
                  setScreen('stage_select');
                }}
                className={`w-full min-h-[52px] rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap ${
                  hasSavedActiveGame
                    ? isDarkMode
                      ? 'bg-stone-800 border border-stone-700 text-stone-200 hover:bg-stone-700'
                      : 'bg-[#EFE9DA] border border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
                    : isDarkMode
                    ? 'bg-amber-600 text-stone-950 hover:bg-amber-500 shadow-lg'
                    : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C] shadow-lg'
                }`}
              >
                <span>{hasSavedActiveGame ? '스테이지 목록' : '시작하기'}</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          2. 스테이지 선택 화면 (왼쪽 위 메인화면, 오른쪽 위 재화 수 + 설정)
      ===================================================================== */}
      {screen === 'stage_select' && (
        <main className="h-full w-full max-w-md mx-auto px-4 py-3 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playSnapFit();
                setScreen('title');
              }}
              aria-label="메인화면으로 이동"
              className={`min-h-[44px] px-3.5 rounded-2xl border font-bold text-sm flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700'
                  : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>메인화면</span>
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <div
                aria-label={`보유 재화 ${currency} 엽전`}
                className={`min-h-[44px] px-3.5 rounded-2xl border flex items-center gap-1.5 font-mono font-bold text-sm tabular-nums whitespace-nowrap ${
                  isDarkMode
                    ? 'bg-stone-900 border-stone-700 text-amber-300'
                    : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#7A3E18]'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{currency}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                aria-label="설정 열기"
                className={`min-h-[44px] min-w-[44px] px-3 rounded-2xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700'
                    : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>설정</span>
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto pr-1"
            role="list"
            aria-label="스테이지 목록"
          >
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 p-1">
              {STAGE_PUZZLES.map((stage, idx) => {
                const isUnlocked = idx <= highestReachedStage;
                const isCleared = clearedStageIds.includes(stage.id);
                const isCurrentActive =
                  hasSavedActiveGame && currentPuzzle.id === stage.id && !isCleared;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => startPuzzle(stage)}
                    aria-label={`${stage.stageNumber ?? idx + 1}단계 ${
                      isCleared ? '완료' : isUnlocked ? '시작' : '잠김'
                    }`}
                    className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center relative font-bold transition-all shadow-sm ${
                      !isUnlocked
                        ? isDarkMode
                          ? 'bg-stone-900/40 border-stone-800 text-stone-600 cursor-not-allowed'
                          : 'bg-[#E5DEC9]/50 border-[#D8CEBE] text-[#A69B8D] cursor-not-allowed'
                        : isCleared
                        ? isDarkMode
                          ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200 hover:bg-emerald-900/50 active:scale-95'
                          : 'bg-[#EBF5EF] border-[#2E6F5E] text-[#1E4E42] hover:bg-[#DFEFE6] active:scale-95'
                        : isDarkMode
                        ? 'bg-amber-600 border-amber-400 text-stone-950 hover:bg-amber-500 shadow-md active:scale-95'
                        : 'bg-[#B85D3B] border-[#964728] text-white hover:bg-[#A34E2E] shadow-md active:scale-95'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {stage.stageNumber ?? idx + 1}
                    </span>

                    {/* 상태 표시 아이콘 (완료: 체크, 잠김: 자물쇠, 풀던 중: 점) */}
                    {isCleared ? (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#2E6F5E] dark:bg-emerald-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : !isUnlocked ? (
                      <div className="absolute top-1.5 right-1.5 opacity-40">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    ) : isCurrentActive ? (
                      <div className="absolute bottom-1.5 w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          3. 문제 플레이 화면
          - 단계 이름 및 확대 버튼 제거
          - 두 손가락 핀치 줌 조작 지원
          - 하단 문장 칸(좌 50%)과 글씨 적는 칸(우 50%)을 반반(50:50) 분할하여 작은 폰에서도 찌부러지지 않음
          - 힌트 버튼은 작고 네모난 아이콘 버튼으로 배치 후 클릭 시 설명 모달 표시
      ===================================================================== */}
      {(screen === 'playing' || screen === 'gameover') && (
        <div className="h-full w-full max-w-xl mx-auto px-2.5 py-2 flex flex-col justify-between gap-2 overflow-hidden">
          {/* 상단 바: 목록 / 타이머 / 재화 + 설정 */}
          <div
            className={`rounded-2xl border px-2.5 py-1.5 flex items-center justify-between gap-2 shrink-0 ${
              isDarkMode
                ? 'bg-stone-900 border-stone-700'
                : 'bg-[#EFE9DA] border-[#D8CEBE]'
            }`}
          >
            <button
              type="button"
              onClick={() => setScreen('stage_select')}
              aria-label="스테이지 선택 화면으로 이동"
              className={`min-h-[38px] px-2.5 rounded-xl border flex items-center justify-center gap-1 text-xs font-bold whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                  : 'bg-[#FDFBF7] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>목록</span>
            </button>

            <div
              aria-label={`경과 시간 ${formatTimerMMSS(elapsedSeconds)}`}
              className={`min-h-[38px] px-3 rounded-xl border flex items-center gap-1.5 font-mono font-bold text-sm tabular-nums ${
                isDarkMode
                  ? 'bg-stone-950 border-stone-700 text-stone-100'
                  : 'bg-[#FDFBF7] border-[#D5CBB8] text-[#2C2520]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#B85D3B] dark:text-amber-400" />
              <span data-testid="hud-timer">{formatTimerMMSS(elapsedSeconds)}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <div
                aria-label={`보유 재화 ${currency} 엽전`}
                className={`min-h-[38px] px-2.5 rounded-xl border flex items-center gap-1 font-mono font-bold text-sm tabular-nums ${
                  isDarkMode
                    ? 'bg-amber-950/60 border-amber-700/80 text-amber-300'
                    : 'bg-[#F8EED8] border-[#DFC99F] text-[#7A3E18]'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span data-testid="hud-currency">{currency}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                aria-label="설정 열기"
                className={`min-h-[38px] min-w-[38px] rounded-xl border flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                    : 'bg-[#FDFBF7] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 상단 중앙: 십자말풀이 보드 (단계 이름 및 확대 버튼 없음 · 두 손가락 핀치 줌 지원) */}
          <div
            onTouchStart={handleBoardTouchStart}
            onTouchMove={handleBoardTouchMove}
            onTouchEnd={handleBoardTouchEnd}
            onTouchCancel={handleBoardTouchEnd}
            onWheel={handleBoardWheel}
            className={`flex-1 min-h-0 rounded-2xl border flex items-center justify-center overflow-hidden touch-none p-2 ${
              isDarkMode
                ? 'bg-[#171412] border-stone-800'
                : 'bg-[#E5DEC9] border-[#CFC3AE]'
            }`}
          >
            <div
              data-testid="crossword-grid"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                transformOrigin: 'center center',
              }}
              className="transition-transform duration-75"
            >
              <div
                className="grid gap-0.5 sm:gap-1"
                style={{
                  gridTemplateColumns: `repeat(${currentPuzzle.size}, minmax(0, 1fr))`,
                }}
              >
                {grid.map((rowArr, r) =>
                  rowArr.map((cell, c) => {
                    const isSelected =
                      selectedCell.row === r && selectedCell.col === c;
                    const isInActiveWord = activeWordCoords.some(
                      (pos) => pos.row === r && pos.col === c
                    );

                    const cellSizeClass =
                      currentPuzzle.size >= 12
                        ? 'w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm'
                        : currentPuzzle.size >= 7
                        ? 'w-9 h-9 sm:w-11 sm:h-11 text-base sm:text-lg'
                        : 'w-11 h-11 sm:w-13 sm:h-13 text-lg sm:text-2xl';

                    if (!cell.isPlayable) {
                      return (
                        <div
                          key={`${r}-${c}`}
                          aria-hidden="true"
                          className={`${cellSizeClass} rounded-lg border ${
                            isDarkMode
                              ? 'bg-stone-900/70 border-stone-800/80'
                              : 'bg-[#D6CCB8]/75 border-[#C8BCA4]'
                          }`}
                        />
                      );
                    }

                    return (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        onClick={() => handleCellClick(r, c)}
                        aria-label={`${r + 1}행 ${c + 1}열 칸 ${
                          cell.userInput ? cell.userInput : '빈칸'
                        }`}
                        className={`relative ${cellSizeClass} rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                          isDarkMode ? 'hanji-crosshair-dark' : 'hanji-crosshair-light'
                        } ${
                          cell.isWrongAlert
                            ? isDarkMode
                              ? 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/60'
                              : 'bg-[#FDE8E8] border-[#DC2626] text-[#B91C1C] ring-2 ring-[#DC2626]/40'
                            : cell.isSolvedLocked
                            ? isDarkMode
                              ? 'bg-emerald-950/75 border-emerald-500 text-emerald-100'
                              : 'bg-[#E6F4EE] border-[#2E6F5E] text-[#17493B]'
                            : isSelected
                            ? isDarkMode
                              ? 'bg-amber-900/70 border-amber-400 text-amber-50 ring-2 ring-amber-400'
                              : 'bg-[#FFF7E2] border-[#B85D3B] text-[#2C2520] ring-2 ring-[#B85D3B]'
                            : isInActiveWord
                            ? isDarkMode
                              ? 'bg-stone-800 border-amber-600/70 text-stone-100'
                              : 'bg-[#FBF3DF] border-[#CFA97E] text-[#2C2520]'
                            : isDarkMode
                            ? 'bg-[#262220] border-stone-600 text-stone-100'
                            : 'bg-[#FDFBF7] border-[#B8AA93] text-[#2C2520]'
                        }`}
                      >
                        {cell.clueNumber !== undefined && (
                          <span
                            className={`absolute top-0.5 left-0.5 text-[7px] sm:text-[8px] font-mono font-bold leading-none ${
                              isDarkMode ? 'text-amber-300' : 'text-[#8C4A27]'
                            }`}
                          >
                            {cell.clueNumber}
                          </span>
                        )}
                        <span className="z-10">{cell.userInput}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* 하단 반반(50:50) 분할: 왼쪽 = 문장 칸 + 작고 네모난 힌트 버튼 / 오른쪽 = 글씨 적는 칸 */}
          <div className="h-[225px] sm:h-[245px] grid grid-cols-2 gap-2 shrink-0">
            {/* 왼쪽 50%: 문장 칸 */}
            <div
              className={`h-full rounded-2xl border p-2.5 flex flex-col justify-between overflow-hidden ${
                isDarkMode
                  ? 'bg-stone-900 border-stone-700'
                  : 'bg-[#EFE9DA] border-[#D8CEBE]'
              }`}
            >
              {/* 상단: 번호/방향 & 이전/다음 화살표 */}
              <div className="flex items-center justify-between gap-1 shrink-0">
                <span
                  className={`text-xs font-bold truncate ${
                    isDarkMode ? 'text-amber-400' : 'text-[#9E4726]'
                  }`}
                >
                  {activeWord
                    ? `${activeWord.number}번 ${
                        activeWord.direction === 'across' ? '가로' : '세로'
                      }`
                    : ''}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCycleWord(-1)}
                    aria-label="이전 문제"
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-200'
                        : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35]'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCycleWord(1)}
                    aria-label="다음 문제"
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-200'
                        : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35]'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 중앙: 문제 설명 문장 */}
              <div className="flex-1 flex items-center py-1 overflow-hidden">
                <p className="text-sm sm:text-base font-bold leading-snug break-keep">
                  {activeWord?.clue}
                </p>
              </div>

              {/* 하단: 작고 네모난 힌트 아이콘 버튼 2개 (누르면 무슨 힌트인지 설명 모달 표시) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSnapFit();
                    setActiveHintModal('letter');
                  }}
                  aria-label="한 글자 힌트 설명 보기"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-transform active:scale-95 shrink-0 ${
                    isDarkMode
                      ? 'bg-stone-800 border-amber-700/70 text-amber-300 hover:bg-stone-700'
                      : 'bg-[#FDFBF7] border-[#D4B88C] text-[#8C4A27] hover:bg-[#F7EFE0]'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSnapFit();
                    setActiveHintModal('word');
                  }}
                  aria-label="한 단어 힌트 설명 보기"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-transform active:scale-95 shrink-0 ${
                    isDarkMode
                      ? 'bg-amber-900/50 border-amber-500/80 text-amber-200 hover:bg-amber-900/70'
                      : 'bg-[#F5E6C8] border-[#C99E5A] text-[#7A3E18] hover:bg-[#EDD9B2]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 오른쪽 50%: 글씨 적는 칸 (손글씨 또는 타이핑) */}
            <div className="h-full min-w-0 overflow-hidden">
              {inputMode === 'handwriting' ? (
                <HandwritingPad
                  selectedCellKey={`${currentPuzzle.id}-${selectedCell.row}-${selectedCell.col}`}
                  currentCellInput={
                    grid[selectedCell.row]?.[selectedCell.col]?.userInput || ''
                  }
                  isDarkMode={isDarkMode}
                  onSelectCandidate={handleEnterCharacter}
                  onClearCell={handleClearCurrentCell}
                />
              ) : (
                <TypingPad
                  isDarkMode={isDarkMode}
                  onEnterSingleChar={handleEnterCharacter}
                  onEnterFullWord={handleEnterFullWord}
                  onClearCell={handleClearCurrentCell}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          작고 네모난 힌트 버튼 클릭 시 나타나는 힌트 설명 및 사용 모달
      ===================================================================== */}
      {activeHintModal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hint-modal-title"
        >
          <div
            className={`w-full max-w-xs rounded-3xl border p-5 shadow-2xl text-center transition-colors ${
              isDarkMode
                ? 'bg-stone-900 border-stone-700 text-stone-100'
                : 'bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-base">
                {activeHintModal === 'letter' ? (
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                ) : (
                  <Sparkles className="w-5 h-5 text-[#B85D3B] dark:text-amber-400" />
                )}
                <h2 id="hint-modal-title">
                  {activeHintModal === 'letter' ? '한 글자 힌트' : '한 단어 힌트'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveHintModal(null)}
                aria-label="힌트 설명 닫기"
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-stone-800 text-stone-300'
                    : 'bg-[#EAE2D0] text-[#4A3F35]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p
              className={`text-sm leading-relaxed mb-4 ${
                isDarkMode ? 'text-stone-300' : 'text-[#4A3F35]'
              }`}
            >
              {activeHintModal === 'letter'
                ? '현재 선택된 칸의 정답 글자 1개를 바로 공개합니다.'
                : '현재 선택된 가로 또는 세로 한 줄(한 단어) 전체를 바로 공개합니다.'}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveHintModal(null)}
                className={`min-h-[44px] rounded-xl border font-bold text-sm ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-700 text-stone-300'
                    : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35]'
                }`}
              >
                취소
              </button>

              <button
                type="button"
                onClick={
                  activeHintModal === 'letter'
                    ? handleConfirmLetterHint
                    : handleConfirmWordHint
                }
                className={`min-h-[44px] rounded-xl font-bold text-sm flex items-center justify-center gap-1 ${
                  isDarkMode
                    ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                    : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C]'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>
                  {activeHintModal === 'letter' ? HINT_LETTER_COST : HINT_WORD_COST} 사용
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 클리어 모달 */}
      <StageClearModal
        isOpen={screen === 'gameover'}
        isDarkMode={isDarkMode}
        puzzleTitle={currentPuzzle.title}
        elapsedSeconds={elapsedSeconds}
        wordRewardTotal={runWordRewardEarned}
        clearBonus={currentPuzzle.clearReward}
        hasNextStage={hasNextStage}
        onNextStage={() => {
          if (hasNextStage) {
            startPuzzle(STAGE_PUZZLES[currentStageIndex + 1], true);
          }
        }}
        onReplay={() => startPuzzle(currentPuzzle, true)}
        onGoStageSelect={() => setScreen('stage_select')}
      />

      {/* 설정 모달 */}
      <SettingsModal
        isOpen={isSettingsOpen}
        inputMode={inputMode}
        bgmEnabled={bgmEnabled}
        sfxEnabled={sfxEnabled}
        isDarkMode={isDarkMode}
        onChangeInputMode={(mode) => setInputMode(mode)}
        onToggleBgm={() => setBgmEnabled((b) => !b)}
        onToggleSfx={() => setSfxEnabled((s) => !s)}
        onToggleDarkMode={() => setIsDarkMode((d) => !d)}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
