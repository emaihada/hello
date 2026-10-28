import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Play,
  Settings,
  Coins,
  Clock,
  Lightbulb,
  Sparkles,
  Check,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Trash2,
  CircleHelp,
} from 'lucide-react';
import {
  STAGE_PUZZLES,
  type CrosswordPuzzle,
  type Direction,
  type WordClue,
} from './game/puzzles.ts';
import {
  generateCrosswordWordDataList,
  convertWordDataToPuzzle,
  getSharedCrosswordGenerator,
  Resources,
  JsonUtility,
} from './game/wordcrossGenerator.ts';
import type { WordDatabase } from './game/defaultWordcrossJson.ts';
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

const STORAGE_KEY = 'ongeul_crossword_save_v5';
const STAGES_PER_PAGE = 20;

interface ActivePuzzleSave {
  puzzleId: string;
  grid: GridCell[][];
  solvedWordIds: string[];
  selectedCell: { row: number; col: number };
  activeDirection: Direction;
  elapsedSeconds: number;
  runWordRewardEarned: number;
  letterHintCount?: number;
  wordHintCount?: number;
}

interface SavedGameState {
  currency: number;
  highestReachedStage: number;
  clearedStageIds: string[];
  hintClearedStageIds?: string[];
  startedStageIds?: string[];
  unlockedStageIds?: string[];
  customStages?: CrosswordPuzzle[];
  settings?: {
    inputMode?: 'handwriting' | 'typing';
    bgmEnabled?: boolean;
    sfxEnabled?: boolean;
    isDarkMode?: boolean;
    autoCommitDelaySec?: number;
  };
  activePuzzle?: ActivePuzzleSave | null;
}

function loadInitialSave(): SavedGameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const storage = window.localStorage;
    if (!storage) return null;
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (e) {
    console.error('Failed to load saved state:', e);
    return null;
  }
}

function saveStateToStorage(updater: (prev: SavedGameState) => SavedGameState) {
  if (typeof window === 'undefined') return;
  try {
    const storage = window.localStorage;
    if (!storage) return;
    const prev = loadInitialSave() || {
      currency: INITIAL_CURRENCY,
      highestReachedStage: 0,
      clearedStageIds: [],
      hintClearedStageIds: [],
      startedStageIds: [],
      settings: {
        inputMode: 'handwriting',
        bgmEnabled: true,
        sfxEnabled: true,
        isDarkMode: false,
        autoCommitDelaySec: 1.5,
      },
      activePuzzle: null,
    };
    const next = updater(prev);
    storage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

function isSavedGridCompatibleWithPuzzle(
  grid: unknown,
  puzzle: CrosswordPuzzle,
  selectedCell?: { row: number; col: number } | null
): grid is GridCell[][] {
  if (!Array.isArray(grid) || grid.length !== puzzle.size) return false;
  for (let r = 0; r < puzzle.size; r++) {
    const rowArr = grid[r];
    if (!Array.isArray(rowArr) || rowArr.length !== puzzle.size) return false;
  }
  if (
    !selectedCell ||
    typeof selectedCell.row !== 'number' ||
    typeof selectedCell.col !== 'number' ||
    selectedCell.row < 0 ||
    selectedCell.row >= puzzle.size ||
    selectedCell.col < 0 ||
    selectedCell.col >= puzzle.size
  ) {
    return false;
  }
  // Ensure every word in the current puzzle matches the saved grid's playable cells & solutions
  for (const w of puzzle.words) {
    const chars = Array.from(w.answer);
    for (let i = 0; i < chars.length; i++) {
      const r = w.direction === 'across' ? w.row : w.row + i;
      const c = w.direction === 'across' ? w.col + i : w.col;
      const cell = (grid as GridCell[][])[r]?.[c];
      if (!cell || !cell.isPlayable || cell.solution !== chars[i]) {
        return false;
      }
    }
  }
  return true;
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

  // Settings & How-to-Play Modal
  const [inputMode, setInputMode] = useState<'handwriting' | 'typing'>(
    initialSave?.settings?.inputMode ?? 'handwriting'
  );
  const [autoCommitDelaySec, setAutoCommitDelaySec] = useState<number>(
    initialSave?.settings?.autoCommitDelaySec ?? 1.5
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
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);

  // Small Square Hint Button Description Modal ('letter' | 'word' | null)
  const [activeHintModal, setActiveHintModal] = useState<'letter' | 'word' | null>(null);

  // Stage Select Pagination & Select-to-Delete Mode State
  const [stagePage, setStagePage] = useState<number>(0);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedDeleteIds, setSelectedDeleteIds] = useState<string[]>([]);
  const [isConfirmBulkDeleteOpen, setIsConfirmBulkDeleteOpen] = useState<boolean>(false);

  // Progression, Currency & Official Stages (Default + User-Generated Stages)
  const [currency, setCurrency] = useState<number>(
    initialSave?.currency ?? INITIAL_CURRENCY
  );
  const [highestReachedStage, setHighestReachedStage] = useState<number>(
    initialSave?.highestReachedStage ?? 0
  );
  const [clearedStageIds, setClearedStageIds] = useState<string[]>(
    initialSave?.clearedStageIds ?? []
  );
  const [hintClearedStageIds, setHintClearedStageIds] = useState<string[]>(
    initialSave?.hintClearedStageIds ?? []
  );
  const [startedStageIds, setStartedStageIds] = useState<string[]>(
    initialSave?.startedStageIds ?? []
  );
  const [unlockedStageIds, setUnlockedStageIds] = useState<string[]>(
    initialSave?.unlockedStageIds ?? [STAGE_PUZZLES[0].id]
  );
  const [customStages, setCustomStages] = useState<CrosswordPuzzle[]>(
    initialSave?.customStages ?? []
  );

  // Combined Official Stage List (Base stages + User-generated official stages)
  const allStages = useMemo(() => {
    const map = new Map<string, CrosswordPuzzle>();
    for (const s of STAGE_PUZZLES) {
      map.set(s.id, { ...s, wordReward: 5 });
    }
    for (const cs of customStages) {
      map.set(cs.id, { ...cs, wordReward: 5 });
    }
    return Array.from(map.values()).sort(
      (a, b) => (a.stageNumber ?? 0) - (b.stageNumber ?? 0)
    );
  }, [customStages]);

  // Next automatic stage number for user creation (auto-assigned, no manual input needed)
  const nextAutoStageNumber = useMemo(() => {
    return allStages.reduce((max, s) => Math.max(max, s.stageNumber ?? 0), 0) + 1;
  }, [allStages]);

  // Stage Creation Modal State (on Stage Select Screen)
  const [isCreateStageOpen, setIsCreateStageOpen] = useState<boolean>(false);
  const [createGridSize, setCreateGridSize] = useState<number>(15);
  const [createTargetWords, setCreateTargetWords] = useState<number>(20);
  const [dictionaryWordCount, setDictionaryWordCount] = useState<number>(() =>
    getSharedCrosswordGenerator().getTotalWordCount()
  );

  // Active Puzzle State - Restore from saved if available
  const initialPuzzleInfo = useMemo(() => {
    const ap = initialSave?.activePuzzle;
    const initialAllStages = [
      ...STAGE_PUZZLES,
      ...(Array.isArray(initialSave?.customStages) ? initialSave.customStages : []),
    ];
    if (ap) {
      const found = initialAllStages.find((p) => p.id === ap.puzzleId);
      if (found && isSavedGridCompatibleWithPuzzle(ap.grid, found, ap.selectedCell)) {
        return {
          puzzle: { ...found, wordReward: 5 },
          grid: ap.grid,
          solvedWordIds: new Set(Array.isArray(ap.solvedWordIds) ? ap.solvedWordIds : []),
          selectedCell: ap.selectedCell,
          activeDirection: ap.activeDirection === 'down' ? ('down' as Direction) : ('across' as Direction),
          elapsedSeconds: Number(ap.elapsedSeconds) || 0,
          runWordRewardEarned: Number(ap.runWordRewardEarned) || 0,
          letterHintCount: ap.letterHintCount ?? 0,
          wordHintCount: ap.wordHintCount ?? 0,
          hasSavedProgress: true,
        };
      }
    }
    const defaultPuzzle = { ...STAGE_PUZZLES[0], wordReward: 5 };
    const firstWord = defaultPuzzle.words[0] ?? {
      row: 0,
      col: 0,
      direction: 'across' as Direction,
    };
    return {
      puzzle: defaultPuzzle,
      grid: buildCrosswordGrid(defaultPuzzle),
      solvedWordIds: new Set<string>(),
      selectedCell: { row: firstWord.row, col: firstWord.col },
      activeDirection: firstWord.direction,
      elapsedSeconds: 0,
      runWordRewardEarned: 0,
      letterHintCount: 0,
      wordHintCount: 0,
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

  // Board Container Measurement & Free Drag + Two-Finger Pinch Zoom State
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const [boardBoxSize, setBoardBoxSize] = useState<number>(300);
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef<boolean>(false);
  const pinchStateRef = useRef<{
    initialDistance: number | null;
    initialScale: number;
    lastPanPoint: { x: number; y: number } | null;
    isMouseDown: boolean;
    dragDistance: number;
  }>({
    initialDistance: null,
    initialScale: 1.0,
    lastPanPoint: null,
    isMouseDown: false,
    dragDistance: 0,
  });

  useEffect(() => {
    if (screen !== 'playing' && screen !== 'gameover') return;
    const el = boardContainerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const minDim = Math.min(rect.width, rect.height);
      if (minDim > 0) {
        setBoardBoxSize(Math.max(180, Math.floor(minDim - 14)));
      }
    };

    updateSize();
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSize) : null;
    observer?.observe(el);
    window.addEventListener('resize', updateSize);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [screen, currentPuzzle.size]);

  // Timer, Rewards & Hint Usage Counts for Current Run
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(
    initialPuzzleInfo.elapsedSeconds
  );
  const [runWordRewardEarned, setRunWordRewardEarned] = useState<number>(
    initialPuzzleInfo.runWordRewardEarned
  );
  const [runLetterHintCount, setRunLetterHintCount] = useState<number>(
    initialPuzzleInfo.letterHintCount
  );
  const [runWordHintCount, setRunWordHintCount] = useState<number>(
    initialPuzzleInfo.wordHintCount
  );
  const runHintCountsRef = useRef<{ letter: number; word: number }>({
    letter: initialPuzzleInfo.letterHintCount,
    word: initialPuzzleInfo.wordHintCount,
  });

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

  // Persist Profile, Official Custom Stages, and Settings
  useEffect(() => {
    saveStateToStorage((prev) => ({
      ...prev,
      currency,
      highestReachedStage,
      clearedStageIds,
      hintClearedStageIds,
      unlockedStageIds,
      customStages,
      settings: {
        ...prev.settings,
        inputMode,
        bgmEnabled,
        sfxEnabled,
        isDarkMode,
        autoCommitDelaySec,
      },
    }));
  }, [
    currency,
    highestReachedStage,
    clearedStageIds,
    hintClearedStageIds,
    unlockedStageIds,
    customStages,
    inputMode,
    bgmEnabled,
    sfxEnabled,
    isDarkMode,
    autoCommitDelaySec,
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
          letterHintCount: runLetterHintCount,
          wordHintCount: runWordHintCount,
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
    runLetterHintCount,
    runWordHintCount,
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
            letterHintCount: runHintCountsRef.current.letter,
            wordHintCount: runHintCountsRef.current.word,
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
    const canResume =
      !forceFresh &&
      ap &&
      ap.puzzleId === puzzle.id &&
      isSavedGridCompatibleWithPuzzle(ap.grid, puzzle, ap.selectedCell);

    if (canResume && ap) {
      setCurrentPuzzle(puzzle);
      setGrid(ap.grid);
      setSolvedWordIds(new Set(Array.isArray(ap.solvedWordIds) ? ap.solvedWordIds : []));
      setSelectedCell(ap.selectedCell);
      setActiveDirection(ap.activeDirection === 'down' ? 'down' : 'across');
      const restoredSec = Number(ap.elapsedSeconds) || 0;
      baseElapsedSecondsRef.current = restoredSec;
      timerStartTimestampRef.current = Date.now();
      setElapsedSeconds(restoredSec);
      setRunWordRewardEarned(Number(ap.runWordRewardEarned) || 0);
      const restoredLetterHints = ap.letterHintCount ?? 0;
      const restoredWordHints = ap.wordHintCount ?? 0;
      runHintCountsRef.current = {
        letter: restoredLetterHints,
        word: restoredWordHints,
      };
      setRunLetterHintCount(restoredLetterHints);
      setRunWordHintCount(restoredWordHints);
    } else {
      const freshGrid = buildCrosswordGrid(puzzle);
      const firstWord = puzzle.words[0] ?? {
        row: 0,
        col: 0,
        direction: 'across' as Direction,
      };
      setCurrentPuzzle(puzzle);
      setGrid(freshGrid);
      setSolvedWordIds(new Set());
      setSelectedCell({ row: firstWord.row, col: firstWord.col });
      setActiveDirection(firstWord.direction);
      baseElapsedSecondsRef.current = 0;
      timerStartTimestampRef.current = Date.now();
      setElapsedSeconds(0);
      setRunWordRewardEarned(0);
      runHintCountsRef.current = { letter: 0, word: 0 };
      setRunLetterHintCount(0);
      setRunWordHintCount(0);
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
      const found = allStages.find((p) => p.id === ap.puzzleId);
      if (found) {
        startPuzzle(found, false);
        return;
      }
    }
    setScreen('stage_select');
  }, [allStages, startPuzzle]);

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

  const currentPuzzleSyllables = useMemo(() => {
    const set = new Set<string>();
    for (const w of currentPuzzle.words) {
      for (const ch of Array.from(w.answer)) {
        set.add(ch);
      }
    }
    return Array.from(set);
  }, [currentPuzzle]);

  const markCurrentStageStarted = useCallback(() => {
    setStartedStageIds((prev) => {
      if (prev.includes(currentPuzzle.id)) return prev;
      const updated = [...prev, currentPuzzle.id];
      saveStateToStorage((s) => ({ ...s, startedStageIds: updated }));
      return updated;
    });
  }, [currentPuzzle.id]);

  const advanceSelectionAfterInput = useCallback(
    (nextGrid: GridCell[][], currentRow: number, currentCol: number) => {
      if (activeWord) {
        const coords = getWordCells(activeWord);
        const currentIndex = coords.findIndex(
          (pos) => pos.row === currentRow && pos.col === currentCol
        );
        // 1. Check remaining cells after currentIndex in the current word
        for (let i = currentIndex + 1; i < coords.length; i++) {
          const c = nextGrid[coords[i].row][coords[i].col];
          if (!c.isSolvedLocked && c.userInput !== c.solution) {
            setSelectedCell({ row: coords[i].row, col: coords[i].col });
            return;
          }
        }
        // 2. Check preceding cells in the current word if not yet completed
        for (let i = 0; i < currentIndex; i++) {
          const c = nextGrid[coords[i].row][coords[i].col];
          if (!c.isSolvedLocked && c.userInput !== c.solution) {
            setSelectedCell({ row: coords[i].row, col: coords[i].col });
            return;
          }
        }
      }

      // 3. Move to the next numbered word sequentially (e.g., 18 -> 19), wrapping around only if needed
      const sortedWords = [...currentPuzzle.words].sort(
        (a, b) => (a.number ?? 0) - (b.number ?? 0)
      );
      const currentWordIdx = activeWord
        ? sortedWords.findIndex((w) => w.id === activeWord.id)
        : -1;

      for (let offset = 1; offset <= sortedWords.length; offset++) {
        const nextIdx = (currentWordIdx + offset + sortedWords.length) % sortedWords.length;
        const word = sortedWords[nextIdx];
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

        const usedHintsInThisRun =
          runHintCountsRef.current.letter > 0 || runHintCountsRef.current.word > 0;

        if (currentPuzzle.stageNumber !== undefined) {
          const idx = allStages.findIndex((s) => s.id === currentPuzzle.id);
          setClearedStageIds((prev) =>
            prev.includes(currentPuzzle.id) ? prev : [...prev, currentPuzzle.id]
          );
          setHintClearedStageIds((prev) => {
            if (usedHintsInThisRun) {
              return prev.includes(currentPuzzle.id) ? prev : [...prev, currentPuzzle.id];
            }
            return prev.filter((id) => id !== currentPuzzle.id);
          });
          if (idx >= 0) {
            setHighestReachedStage((prev) =>
              Math.min(allStages.length - 1, Math.max(prev, idx + 1))
            );
            const nextStage = allStages[idx + 1];
            if (nextStage) {
              setUnlockedStageIds((prev) =>
                prev.includes(nextStage.id) ? prev : [...prev, nextStage.id]
              );
            }
          }
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
    [currentPuzzle, allStages]
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

      markCurrentStageStarted();

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
      markCurrentStageStarted,
      handleCheckPuzzleVictory,
      advanceSelectionAfterInput,
    ]
  );

  const handleEnterFullWord = useCallback(
    (wordStr: string) => {
      if (screen !== 'playing' || !activeWord) return;
      const chars = Array.from(wordStr.trim());
      if (chars.length === 0) return;

      markCurrentStageStarted();

      const coords = getWordCells(activeWord);
      const selectedIdx = coords.findIndex(
        (pos) => pos.row === selectedCell.row && pos.col === selectedCell.col
      );

      // If user typed full word length, fill from 0.
      // If user selected an intermediate cell (e.g. 2nd cell of '원두막') and typed '두막',
      // start filling from selectedIdx so it seamlessly completes '원두막'.
      let startIdx = 0;
      if (chars.length === coords.length) {
        startIdx = 0;
      } else if (selectedIdx >= 0 && selectedIdx + chars.length <= coords.length) {
        startIdx = selectedIdx;
      } else if (selectedIdx >= 0) {
        startIdx = Math.max(0, coords.length - chars.length);
      }

      let workingGrid = grid;
      const workingSolved = new Set(solvedWordIds);
      let totalReward = 0;
      let anyWrong = false;
      const newlySolvedList: WordClue[] = [];

      chars.forEach((ch, offset) => {
        const targetIdx = startIdx + offset;
        if (targetIdx >= coords.length) return;
        const pos = coords[targetIdx];
        const cell = workingGrid[pos.row][pos.col];
        if (cell.isSolvedLocked) return;

        const res = applyCellInput(
          workingGrid,
          currentPuzzle,
          workingSolved,
          pos.row,
          pos.col,
          ch
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

      const lastFilledIdx = Math.min(coords.length - 1, startIdx + chars.length - 1);
      const lastFilledPos = coords[lastFilledIdx] || coords[coords.length - 1];

      if (newlySolvedList.length > 0) {
        soundManager.playWordComplete();
        const didWin = handleCheckPuzzleVictory(workingGrid, totalReward);
        if (!didWin) {
          setCurrency((prev) => prev + totalReward);
          setRunWordRewardEarned((prev) => prev + totalReward);
          advanceSelectionAfterInput(
            workingGrid,
            lastFilledPos.row,
            lastFilledPos.col
          );
        }
      } else if (anyWrong) {
        soundManager.playWrongBuzzer();
      } else {
        soundManager.playSnapFit();
        advanceSelectionAfterInput(
          workingGrid,
          lastFilledPos.row,
          lastFilledPos.col
        );
      }
    },
    [
      screen,
      activeWord,
      selectedCell,
      grid,
      solvedWordIds,
      currentPuzzle,
      markCurrentStageStarted,
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
    const nextLetterCount = runHintCountsRef.current.letter + 1;
    runHintCountsRef.current.letter = nextLetterCount;
    setRunLetterHintCount(nextLetterCount);
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

    const nextWordCount = runHintCountsRef.current.word + 1;
    runHintCountsRef.current.word = nextWordCount;
    setRunWordHintCount(nextWordCount);
    setCurrency((prev) => prev - HINT_WORD_COST);
    setActiveHintModal(null);
    handleEnterFullWord(activeWord.answer);
  };

  const handleCellClick = (row: number, col: number) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
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

  const handleSelectWord = (word: WordClue) => {
    const cells = getWordCells(word);
    const firstUnsolved = cells.find((pos) => {
      const c = grid[pos.row]?.[pos.col];
      return c && !c.isSolvedLocked && c.userInput !== c.solution;
    });
    const target = firstUnsolved ?? { row: word.row, col: word.col };
    setSelectedCell({ row: target.row, col: target.col });
    setActiveDirection(word.direction);
    soundManager.playSnapFit();
  };

  const clampPan = (val: number) => Math.min(280, Math.max(-280, val));

  // Two-finger Pinch-to-Zoom & 1-Finger / Mouse Free Pan handlers (allows dragging beyond puzzle bounds)
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
      hasDraggedRef.current = true;
    } else if (e.touches.length === 1) {
      pinchStateRef.current.lastPanPoint = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      pinchStateRef.current.dragDistance = 0;
      hasDraggedRef.current = false;
    }
  };

  const handleBoardTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStateRef.current.initialDistance !== null) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / Math.max(10, pinchStateRef.current.initialDistance);
      const nextScale = Math.min(2.5, Math.max(0.85, pinchStateRef.current.initialScale * ratio));
      setZoomScale(nextScale);

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if (pinchStateRef.current.lastPanPoint) {
        const deltaX = midX - pinchStateRef.current.lastPanPoint.x;
        const deltaY = midY - pinchStateRef.current.lastPanPoint.y;
        setPanOffset((prev) => ({
          x: clampPan(prev.x + deltaX),
          y: clampPan(prev.y + deltaY),
        }));
      }
      pinchStateRef.current.lastPanPoint = { x: midX, y: midY };
    } else if (e.touches.length === 1 && pinchStateRef.current.lastPanPoint) {
      const deltaX = e.touches[0].clientX - pinchStateRef.current.lastPanPoint.x;
      const deltaY = e.touches[0].clientY - pinchStateRef.current.lastPanPoint.y;
      const stepDist = Math.hypot(deltaX, deltaY);
      pinchStateRef.current.dragDistance += stepDist;

      if (pinchStateRef.current.dragDistance > 6) {
        hasDraggedRef.current = true;
        setPanOffset((prev) => ({
          x: clampPan(prev.x + deltaX),
          y: clampPan(prev.y + deltaY),
        }));
      }
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

  const handleBoardMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pinchStateRef.current.isMouseDown = true;
    pinchStateRef.current.lastPanPoint = { x: e.clientX, y: e.clientY };
    pinchStateRef.current.dragDistance = 0;
    hasDraggedRef.current = false;
  };

  const handleBoardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pinchStateRef.current.isMouseDown || !pinchStateRef.current.lastPanPoint) return;
    const deltaX = e.clientX - pinchStateRef.current.lastPanPoint.x;
    const deltaY = e.clientY - pinchStateRef.current.lastPanPoint.y;
    const stepDist = Math.hypot(deltaX, deltaY);
    pinchStateRef.current.dragDistance += stepDist;

    if (pinchStateRef.current.dragDistance > 6) {
      hasDraggedRef.current = true;
      setPanOffset((prev) => ({
        x: clampPan(prev.x + deltaX),
        y: clampPan(prev.y + deltaY),
      }));
    }
    pinchStateRef.current.lastPanPoint = { x: e.clientX, y: e.clientY };
  };

  const handleBoardMouseUp = () => {
    pinchStateRef.current.isMouseDown = false;
    pinchStateRef.current.lastPanPoint = null;
  };

  const handleBoardWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoomScale((prev) => Math.min(2.5, Math.max(0.85, prev - e.deltaY * 0.005)));
    } else {
      setPanOffset((prev) => ({
        x: clampPan(prev.x - e.deltaX * 0.6),
        y: clampPan(prev.y - e.deltaY * 0.6),
      }));
    }
  };

  const currentStageIndex = useMemo(
    () => allStages.findIndex((s) => s.id === currentPuzzle.id),
    [allStages, currentPuzzle.id]
  );
  const hasNextStage =
    currentStageIndex >= 0 && currentStageIndex + 1 < allStages.length;

  // Collect all words used across existing stages so newly generated stages deprioritize them
  const previouslyUsedWords = useMemo(() => {
    const used = new Set<string>();
    for (const stage of allStages) {
      for (const word of stage.words) {
        if (word.answer) {
          used.add(word.answer.trim());
        }
      }
    }
    return used;
  }, [allStages]);

  // Live preview of List<CrosswordWordData> for the auto-assigned stageNumber with user-chosen grid size and word count
  const previewWordDataList = useMemo(() => {
    if (!isCreateStageOpen) return [];
    return generateCrosswordWordDataList(
      nextAutoStageNumber,
      createGridSize,
      createTargetWords,
      previouslyUsedWords
    );
  }, [
    isCreateStageOpen,
    nextAutoStageNumber,
    createGridSize,
    createTargetWords,
    previouslyUsedWords,
    dictionaryWordCount,
  ]);

  const totalStagePages = useMemo(
    () => Math.max(1, Math.ceil((allStages.length + 1) / STAGES_PER_PAGE)),
    [allStages.length]
  );

  useEffect(() => {
    if (stagePage >= totalStagePages) {
      setStagePage(Math.max(0, totalStagePages - 1));
    }
  }, [stagePage, totalStagePages]);

  const currentPageStages = useMemo(() => {
    const start = stagePage * STAGES_PER_PAGE;
    return allStages.slice(start, start + STAGES_PER_PAGE);
  }, [allStages, stagePage]);

  const handleOpenCreateStageModal = () => {
    setCreateGridSize(15);
    setCreateTargetWords(20);
    setIsCreateStageOpen(true);
    soundManager.playSnapFit();
  };

  const handleCreateAndRegisterStage = (playImmediately: boolean) => {
    const wordDataList = generateCrosswordWordDataList(
      nextAutoStageNumber,
      createGridSize,
      createTargetWords,
      previouslyUsedWords
    );
    const generatedPuzzle = convertWordDataToPuzzle(
      nextAutoStageNumber,
      wordDataList,
      createGridSize
    );

    const newStageIndex = allStages.length;

    setCustomStages((prev) => {
      const filtered = prev.filter((p) => p.id !== generatedPuzzle.id);
      const updated = [...filtered, generatedPuzzle];
      saveStateToStorage((s) => ({ ...s, customStages: updated }));
      return updated;
    });
    setUnlockedStageIds((prev) =>
      prev.includes(generatedPuzzle.id) ? prev : [...prev, generatedPuzzle.id]
    );

    soundManager.playWordComplete();
    setIsCreateStageOpen(false);
    setStagePage(Math.floor(newStageIndex / STAGES_PER_PAGE));

    if (playImmediately) {
      startPuzzle(generatedPuzzle, true);
    }
  };

  const handleToggleSelectDeleteStage = (stageId: string) => {
    soundManager.playSnapFit();
    setSelectedDeleteIds((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
    );
  };

  const handleConfirmBulkDeleteStages = () => {
    if (selectedDeleteIds.length === 0) return;
    const toDeleteSet = new Set(selectedDeleteIds);

    setCustomStages((prev) => {
      const updated = prev.filter((s) => !toDeleteSet.has(s.id));
      saveStateToStorage((s) => ({
        ...s,
        customStages: updated,
        clearedStageIds: s.clearedStageIds.filter((id) => !toDeleteSet.has(id)),
        hintClearedStageIds: (s.hintClearedStageIds || []).filter(
          (id) => !toDeleteSet.has(id)
        ),
        startedStageIds: (s.startedStageIds || []).filter((id) => !toDeleteSet.has(id)),
        unlockedStageIds: (s.unlockedStageIds || []).filter((id) => !toDeleteSet.has(id)),
        activePuzzle:
          s.activePuzzle && toDeleteSet.has(s.activePuzzle.puzzleId)
            ? null
            : s.activePuzzle,
      }));
      return updated;
    });
    setClearedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
    setHintClearedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
    setStartedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
    setUnlockedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));

    if (toDeleteSet.has(currentPuzzle.id)) {
      const fallback = { ...STAGE_PUZZLES[0], wordReward: 5 };
      setCurrentPuzzle(fallback);
      setGrid(buildCrosswordGrid(fallback));
      setSolvedWordIds(new Set());
      setHasSavedActiveGame(false);
    }

    soundManager.playSnapFit();
    setSelectedDeleteIds([]);
    setIsConfirmBulkDeleteOpen(false);
    setIsDeleteMode(false);
  };

  return (
    <div
      className={`app-viewport h-[100dvh] w-full overflow-hidden flex flex-col transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#1C1917] text-[#F5F2EB]'
          : 'bg-[#F7F3E9] text-[#2C2520]'
      }`}
    >
      {/* =====================================================================
          1. 메인 화면 (오른쪽 위 설정 버튼, 중앙 로고/제목, 시작하기 + 게임방법 버튼)
      ===================================================================== */}
      {screen === 'title' && (
        <main className="relative h-full w-full flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* 오른쪽 위 설정 버튼 */}
          <div className="absolute top-4 right-4 z-10">
            <button
              type="button"
              onClick={() => {
                soundManager.playSnapFit();
                setIsSettingsOpen(true);
              }}
              aria-label="설정 열기"
              className={`min-h-[44px] min-w-[44px] px-3.5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-sm ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700'
                  : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-10 w-full max-w-xs text-center">
            <div className="flex flex-col items-center gap-4">
              <svg
                viewBox="0 0 64 64"
                className="w-20 h-20 shadow-md rounded-2xl"
                role="img"
                aria-label="손글씨 십자말풀이 로고"
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
                  손
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
                손글씨 십자말풀이
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
                  setIsDeleteMode(false);
                  setSelectedDeleteIds([]);
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

              {/* 시작하기 아래 게임방법 버튼 */}
              <button
                type="button"
                data-testid="how-to-play-btn"
                onClick={() => {
                  soundManager.playSnapFit();
                  setIsHowToPlayOpen(true);
                }}
                className={`w-full min-h-[48px] rounded-2xl border font-bold text-base flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap ${
                  isDarkMode
                    ? 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700'
                    : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E4DCC8]'
                }`}
              >
                <CircleHelp className="w-5 h-5" />
                <span>게임방법</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          2. 스테이지 선택 화면
          - 상단: 메인화면 / 스테이지 삭제(선택삭제) / 재화 / 설정
          - 중앙: 20개 단위 페이지네이션 + 수직 중앙 정렬된 스테이지 그리드
          - 하단: 페이지 이동 컨트롤
      ===================================================================== */}
      {screen === 'stage_select' && (
        <main className="h-full w-full max-w-md md:max-w-2xl mx-auto px-4 py-3 flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playSnapFit();
                  setIsDeleteMode(false);
                  setSelectedDeleteIds([]);
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

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* 내가 만든 스테이지 선택 삭제 모드 토글 버튼 */}
                <button
                  type="button"
                  data-testid="stage-delete-mode-btn"
                  onClick={() => {
                    soundManager.playSnapFit();
                    setIsDeleteMode((prev) => !prev);
                    setSelectedDeleteIds([]);
                  }}
                  aria-label="스테이지 삭제 모드 전환"
                  className={`min-h-[44px] px-3 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    isDeleteMode
                      ? 'bg-rose-600 border-rose-500 text-white hover:bg-rose-500'
                      : isDarkMode
                      ? 'bg-stone-800 border-stone-700 text-rose-300 hover:bg-stone-700'
                      : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#9E3B26] hover:bg-[#E4DCC8]'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>스테이지 삭제</span>
                </button>

                <div
                  aria-label={`보유 재화 ${currency} 엽전`}
                  className={`min-h-[44px] px-3 sm:px-3.5 rounded-2xl border flex items-center gap-1.5 font-mono font-bold text-sm tabular-nums whitespace-nowrap ${
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
                  <span className="hidden sm:inline">설정</span>
                </button>
              </div>
            </div>

            {/* 선택 삭제 모드일 때 상단에 나타나는 선택 삭제 액션 바 */}
            {isDeleteMode && (
              <div
                data-testid="delete-mode-bar"
                className={`rounded-2xl border px-3.5 py-2.5 flex items-center justify-between gap-2 transition-colors ${
                  isDarkMode
                    ? 'bg-rose-950/40 border-rose-800/70 text-rose-100'
                    : 'bg-[#FDF2F0] border-[#E6B8B0] text-[#5C241D]'
                }`}
              >
                <span className="text-xs sm:text-sm font-bold truncate">
                  {customStages.length === 0
                    ? '삭제할 수 있는 내가 만든 스테이지가 없습니다.'
                    : `삭제할 스테이지 선택 (${selectedDeleteIds.length}개 선택됨)`}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {customStages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playSnapFit();
                        if (selectedDeleteIds.length === customStages.length) {
                          setSelectedDeleteIds([]);
                        } else {
                          setSelectedDeleteIds(customStages.map((cs) => cs.id));
                        }
                      }}
                      className={`min-h-[34px] px-2.5 rounded-xl border text-xs font-bold whitespace-nowrap ${
                        isDarkMode
                          ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                          : 'bg-white border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]'
                      }`}
                    >
                      {selectedDeleteIds.length === customStages.length
                        ? '전체 해제'
                        : '전체 선택'}
                    </button>
                  )}

                  <button
                    type="button"
                    data-testid="confirm-selected-delete-btn"
                    disabled={selectedDeleteIds.length === 0}
                    onClick={() => {
                      soundManager.playSnapFit();
                      setIsConfirmBulkDeleteOpen(true);
                    }}
                    className="min-h-[34px] px-3 rounded-xl font-bold text-xs bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-xs"
                  >
                    선택 삭제 ({selectedDeleteIds.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playSnapFit();
                      setIsDeleteMode(false);
                      setSelectedDeleteIds([]);
                    }}
                    className={`min-h-[34px] px-2.5 rounded-xl border text-xs font-bold whitespace-nowrap ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                        : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E4DCC8]'
                    }`}
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 중앙 정렬된 스테이지 그리드 영역 (페이지당 최대 20개) */}
          <div
            className="flex-1 min-h-0 flex flex-col justify-center overflow-y-auto py-2 pr-1"
            role="list"
            aria-label="스테이지 목록"
          >
            <div className="w-full my-auto">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 p-1">
                {currentPageStages.map((stage, pageIdx) => {
                  const globalIdx = stagePage * STAGES_PER_PAGE + pageIdx;
                  const isCleared = clearedStageIds.includes(stage.id);
                  const isHintCleared =
                    isCleared && hintClearedStageIds.includes(stage.id);
                  const hasActiveInput =
                    hasSavedActiveGame &&
                    currentPuzzle.id === stage.id &&
                    grid.some((row) =>
                      row.some((c) => c.isPlayable && c.userInput.length > 0)
                    );
                  const isStarted =
                    startedStageIds.includes(stage.id) || hasActiveInput;
                  const isCustom = customStages.some((cs) => cs.id === stage.id);
                  const isCurrentActive = hasActiveInput && !isCleared;
                  const isSelectedForDelete = selectedDeleteIds.includes(stage.id);

                  return (
                    <div key={stage.id} className="relative aspect-square">
                      <button
                        type="button"
                        disabled={isDeleteMode && !isCustom}
                        onClick={() => {
                          if (isDeleteMode) {
                            if (isCustom) {
                              handleToggleSelectDeleteStage(stage.id);
                            }
                            return;
                          }
                          startPuzzle(stage);
                        }}
                        aria-label={`${stage.stageNumber ?? globalIdx + 1}단계 ${
                          isCleared
                            ? isHintCleared
                              ? '힌트 사용 완료'
                              : '힌트 없이 완료'
                            : isStarted
                            ? '진행 중'
                            : '미진행'
                        }`}
                        className={`w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center relative font-bold transition-all shadow-sm active:scale-95 ${
                          isDeleteMode
                            ? !isCustom
                              ? isDarkMode
                                ? 'opacity-25 cursor-not-allowed bg-stone-900 border-stone-800 text-stone-500'
                                : 'opacity-25 cursor-not-allowed bg-[#EFE9DA] border-[#D5CBB8] text-[#8C7A6B]'
                              : isSelectedForDelete
                              ? isDarkMode
                                ? 'bg-rose-950/75 border-rose-500 text-rose-100 ring-2 ring-rose-500'
                                : 'bg-[#FDE8E8] border-rose-600 text-[#991B1B] ring-2 ring-rose-500'
                              : isDarkMode
                              ? 'bg-stone-800 border-stone-600 text-stone-100 hover:border-rose-400'
                              : 'bg-[#FDFBF7] border-[#B8A990] text-[#2C2520] hover:border-rose-500'
                            : isCleared
                            ? isDarkMode
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 hover:bg-emerald-900/60'
                              : 'bg-[#EBF5EF] border-[#2E6F5E] text-[#1E4E42] hover:bg-[#DFEFE6]'
                            : isStarted
                            ? isDarkMode
                              ? 'bg-amber-950/45 border-amber-600/70 text-amber-200 hover:bg-amber-900/50'
                              : 'bg-[#F4E9D8] border-[#C69C6D] text-[#5C3D24] hover:bg-[#EBDDCA]'
                            : isDarkMode
                            ? 'opacity-40 hover:opacity-90 transition-opacity bg-stone-900/60 border-stone-800 text-stone-400 hover:bg-stone-800'
                            : 'opacity-40 hover:opacity-90 transition-opacity bg-[#EFE9DA]/60 border-[#D5CBB8] text-[#7A6E60] hover:bg-[#EFE9DA]'
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                          {stage.stageNumber ?? globalIdx + 1}
                        </span>

                        {/* 클리어 표시:
                            - 힌트를 쓰지 않고 풀면: 안쪽이 칠해진 동그라미에 체크 표시 (지금처럼 표시)
                            - 힌트를 사용해서 풀면: 안쪽이 칠해지지 않은 동그라미에 체크된 표시 */}
                        {isCleared && !isHintCleared && (
                          <div
                            data-testid={`stage-clear-badge-${stage.stageNumber ?? globalIdx + 1}`}
                            data-clear-type="no-hint"
                            title="힌트 없이 클리어"
                            className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-[#2E6F5E] dark:bg-emerald-600 text-white flex items-center justify-center"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}

                        {isCleared && isHintCleared && (
                          <div
                            data-testid={`stage-clear-badge-${stage.stageNumber ?? globalIdx + 1}`}
                            data-clear-type="hint-used"
                            title="힌트 사용하여 클리어"
                            className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full border-[1.75px] border-[#2E6F5E] dark:border-emerald-400 bg-transparent text-[#2E6F5E] dark:text-emerald-400 flex items-center justify-center"
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}

                        {/* 선택 삭제 모드일 때 내가 만든 스테이지 우측 상단 선택 체크박스 */}
                        {isDeleteMode && isCustom && (
                          <div
                            className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelectedForDelete
                                ? 'bg-rose-600 border-rose-600 text-white'
                                : isDarkMode
                                ? 'bg-stone-900/80 border-stone-400 text-transparent'
                                : 'bg-white/90 border-[#8C7A6B] text-transparent'
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* 풀던 중 표시 점 (은은한 황토/호박색 풀던 문제) */}
                        {isCurrentActive && !isDeleteMode && (
                          <div className="absolute bottom-1.5 w-2 h-2 rounded-full bg-[#B87D4B] dark:bg-amber-400 animate-pulse" />
                        )}
                      </button>
                    </div>
                  );
                })}

                {/* 현재 페이지의 스테이지가 20개 미만일 때(마지막 페이지) 새 스테이지 생성(+) 타일 표시 */}
                {currentPageStages.length < STAGES_PER_PAGE && !isDeleteMode && (
                  <button
                    type="button"
                    onClick={handleOpenCreateStageModal}
                    aria-label="새 스테이지 생성"
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-0.5 font-bold transition-all active:scale-95 ${
                      isDarkMode
                        ? 'bg-stone-900/70 border-amber-500/70 text-amber-300 hover:bg-stone-800'
                        : 'bg-[#EFE9DA]/80 border-[#B85D3B] text-[#9E4726] hover:bg-[#E5DEC9]'
                    }`}
                  >
                    <Plus className="w-7 h-7 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 하단 페이지네이션 컨트롤 (20개 단위 페이지 이동) */}
          <div className="flex items-center justify-center gap-3 pt-2 shrink-0">
            <button
              type="button"
              disabled={stagePage === 0}
              onClick={() => {
                soundManager.playSnapFit();
                setStagePage((p) => Math.max(0, p - 1));
              }}
              aria-label="이전 페이지"
              className={`min-h-[38px] px-3 rounded-xl border font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                  : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전</span>
            </button>

            <span
              data-testid="stage-page-indicator"
              className="font-mono font-bold text-xs sm:text-sm tabular-nums px-2"
            >
              {stagePage + 1} / {totalStagePages} 페이지
            </span>

            <button
              type="button"
              disabled={stagePage >= totalStagePages - 1}
              onClick={() => {
                soundManager.playSnapFit();
                setStagePage((p) => Math.min(totalStagePages - 1, p + 1));
              }}
              aria-label="다음 페이지"
              className={`min-h-[38px] px-3 rounded-xl border font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                  : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
              }`}
            >
              <span>다음</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      )}

      {/* =====================================================================
          3. 문제 플레이 화면
          - 모바일(< md): 상단 십자말풀이 보드 + 하단 반반(50:50) 분할(좌: 힌트, 우: 필기)
          - 태블릿 전용 화면(>= md): 3단 가로 분할 (왼쪽: 힌트 화면 / 가운데: 문제 화면 / 오른쪽: 필기 영역)
      ===================================================================== */}
      {(screen === 'playing' || screen === 'gameover') && (
        <div className="h-full w-full max-w-xl md:max-w-7xl mx-auto px-2.5 md:px-4 py-2 md:py-3 flex flex-col justify-between gap-2 md:gap-3 overflow-hidden">
          {/* 상단 바: 목록 / 타이머 / 재화 + 설정 */}
          <div
            className={`rounded-2xl border px-2.5 md:px-3.5 py-1.5 md:py-2 flex items-center justify-between gap-2 shrink-0 ${
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

          {/* 반응형 메인 작업 영역:
              - 모바일(< md): 2열 2행 (1행 전체: 문제 화면, 2행 좌: 힌트 화면, 2행 우: 필기 영역)
              - 태블릿(>= md): 3열 1행 (좌: 힌트 화면, 중앙: 문제 화면, 우: 필기 영역) */}
          <div
            data-testid="play-workspace"
            className="flex-1 min-h-0 grid grid-cols-2 grid-rows-[minmax(0,1fr)_200px] sm:grid-rows-[minmax(0,1fr)_235px] md:grid-cols-[250px_minmax(0,1fr)_270px] lg:grid-cols-[290px_minmax(0,1fr)_310px] md:grid-rows-1 gap-2 md:gap-3 overflow-hidden"
          >
            {/* [왼쪽 / 모바일 하단 좌측] 힌트 화면 */}
            <div
              data-testid="hint-panel"
              className={`col-span-1 col-start-1 row-start-2 md:col-start-1 md:row-start-1 h-full min-h-0 rounded-2xl border p-2.5 md:p-3.5 flex flex-col justify-between gap-2 overflow-hidden ${
                isDarkMode
                  ? 'bg-stone-900 border-stone-700'
                  : 'bg-[#EFE9DA] border-[#D8CEBE]'
              }`}
            >
              {/* 상단: 번호/방향 & 이전/다음 화살표 */}
              <div className="flex items-center justify-between gap-1 shrink-0">
                <span
                  className={`text-xs md:text-sm font-bold truncate ${
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
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-lg border flex items-center justify-center ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700'
                        : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCycleWord(1)}
                    aria-label="다음 문제"
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-lg border flex items-center justify-center ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700'
                        : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>

              {/* 현재 선택된 문제 설명 문장 */}
              <div
                className={`flex-1 md:flex-none flex items-center py-1 md:p-3 md:rounded-xl md:border overflow-hidden ${
                  isDarkMode
                    ? 'md:bg-stone-950/70 md:border-stone-800'
                    : 'md:bg-[#FDFBF7] md:border-[#DFD5C3]'
                }`}
              >
                <p className="text-sm sm:text-base font-bold leading-snug break-keep">
                  {activeWord?.clue}
                </p>
              </div>

              {/* 태블릿 전용: 전체 가로/세로 힌트 목록 (클릭 시 해당 문제로 바로 이동) */}
              <div
                aria-label="전체 힌트 목록"
                className="hidden md:flex md:flex-col flex-1 min-h-0 overflow-y-auto gap-1.5 pr-1"
              >
                {[...currentPuzzle.words]
                  .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
                  .map((w) => {
                    const isCurrent = activeWord?.id === w.id;
                    const isSolved = solvedWordIds.has(w.id);
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => handleSelectWord(w)}
                        className={`w-full text-left rounded-xl border px-2.5 py-2 transition-colors flex flex-col gap-0.5 shrink-0 ${
                          isCurrent
                            ? isDarkMode
                              ? 'bg-amber-950/70 border-amber-500 text-amber-100'
                              : 'bg-[#FFF5D6] border-[#B85D3B] text-[#2C2520]'
                            : isSolved
                            ? isDarkMode
                              ? 'bg-emerald-950/35 border-emerald-800/60 text-emerald-300/80'
                              : 'bg-[#EBF5EF]/80 border-[#B7D7C8] text-[#2E6F5E]'
                            : isDarkMode
                            ? 'bg-stone-950/40 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                            : 'bg-[#FAF6EC] border-[#E2D9C8] text-[#4A3F35] hover:bg-[#F3ECE0]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-[11px] font-extrabold ${
                              isCurrent
                                ? isDarkMode
                                  ? 'text-amber-300'
                                  : 'text-[#9E4726]'
                                : isSolved
                                ? isDarkMode
                                  ? 'text-emerald-400'
                                  : 'text-[#2E6F5E]'
                                : isDarkMode
                                ? 'text-stone-400'
                                : 'text-[#8C7A6B]'
                            }`}
                          >
                            {w.number}번 {w.direction === 'across' ? '가로' : '세로'} (
                            {w.answer.length}글자)
                          </span>
                          {isSolved && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F5E] dark:text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs font-semibold leading-snug line-clamp-2 break-keep">
                          {w.clue}
                        </p>
                      </button>
                    );
                  })}
              </div>

              {/* 하단: 힌트 아이콘 버튼 2개 (누르면 무슨 힌트인지 설명 모달 표시) */}
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSnapFit();
                    setActiveHintModal('letter');
                  }}
                  aria-label="한 글자 힌트 설명 보기"
                  className={`w-9 h-9 md:flex-1 md:h-10 md:px-2.5 rounded-lg md:rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-transform active:scale-95 shrink-0 ${
                    isDarkMode
                      ? 'bg-stone-800 border-amber-700/70 text-amber-300 hover:bg-stone-700'
                      : 'bg-[#FDFBF7] border-[#D4B88C] text-[#8C4A27] hover:bg-[#F7EFE0]'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span className="hidden md:inline whitespace-nowrap">글자 힌트</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSnapFit();
                    setActiveHintModal('word');
                  }}
                  aria-label="한 단어 힌트 설명 보기"
                  className={`w-9 h-9 md:flex-1 md:h-10 md:px-2.5 rounded-lg md:rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-transform active:scale-95 shrink-0 ${
                    isDarkMode
                      ? 'bg-amber-900/50 border-amber-500/80 text-amber-200 hover:bg-amber-900/70'
                      : 'bg-[#F5E6C8] border-[#C99E5A] text-[#7A3E18] hover:bg-[#EDD9B2]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="hidden md:inline whitespace-nowrap">단어 힌트</span>
                </button>
              </div>
            </div>

            {/* [가운데 / 모바일 상단] 십자말풀이 문제 화면 (드래그 이동 및 두 손가락 핀치 줌 지원) */}
            <div
              ref={boardContainerRef}
              data-testid="board-panel"
              onTouchStart={handleBoardTouchStart}
              onTouchMove={handleBoardTouchMove}
              onTouchEnd={handleBoardTouchEnd}
              onTouchCancel={handleBoardTouchEnd}
              onMouseDown={handleBoardMouseDown}
              onMouseMove={handleBoardMouseMove}
              onMouseUp={handleBoardMouseUp}
              onMouseLeave={handleBoardMouseUp}
              onWheel={handleBoardWheel}
              className={`col-span-2 col-start-1 row-start-1 md:col-span-1 md:col-start-2 md:row-start-1 h-full min-h-0 rounded-2xl border flex items-center justify-center overflow-hidden touch-none select-none p-1.5 md:p-3 cursor-grab active:cursor-grabbing ${
                isDarkMode
                  ? 'bg-[#151311] border-stone-800'
                  : 'bg-[#EAE3D2] border-[#D5CBB8]'
              }`}
            >
              {(() => {
                const gapPx = 2;
                const cellPx = Math.max(
                  42,
                  Math.floor(
                    (boardBoxSize - gapPx * (currentPuzzle.size - 1)) /
                      currentPuzzle.size
                  )
                );

                return (
                  <div
                    data-testid="crossword-grid"
                    style={{
                      transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                      transformOrigin: 'center center',
                    }}
                    className="transition-transform duration-75"
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${currentPuzzle.size}, ${cellPx}px)`,
                        gridTemplateRows: `repeat(${currentPuzzle.size}, ${cellPx}px)`,
                        gap: `${gapPx}px`,
                      }}
                    >
                      {grid.map((rowArr, r) =>
                        rowArr.map((cell, c) => {
                          const isSelected =
                            selectedCell.row === r && selectedCell.col === c;
                          const isInActiveWord = activeWordCoords.some(
                            (pos) => pos.row === r && pos.col === c
                          );

                          if (!cell.isPlayable) {
                            return (
                              <div
                                key={`${r}-${c}`}
                                aria-hidden="true"
                                className={`w-full h-full rounded-[6px] ${
                                  isDarkMode
                                    ? 'bg-stone-900/25'
                                    : 'bg-[#DFD7C5]/35'
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
                              className={`relative w-full h-full rounded-[7px] border-2 flex items-center justify-center font-bold leading-none transition-colors shadow-2xs ${
                                isDarkMode ? 'hanji-crosshair-dark' : 'hanji-crosshair-light'
                              } ${
                                cell.isWrongAlert
                                  ? isDarkMode
                                    ? 'bg-rose-950/95 border-rose-500 text-rose-200 ring-1 ring-rose-500/70'
                                    : 'bg-[#FDE8E8] border-[#DC2626] text-[#B91C1C] ring-1 ring-[#DC2626]/50'
                                  : cell.isSolvedLocked
                                  ? isDarkMode
                                    ? 'bg-emerald-950/85 border-emerald-500 text-emerald-100'
                                    : 'bg-[#E6F4EE] border-[#2E6F5E] text-[#17493B]'
                                  : isSelected
                                  ? isDarkMode
                                    ? 'bg-amber-900/80 border-amber-400 text-amber-50 ring-2 ring-amber-400 z-10'
                                    : 'bg-[#FFF5D6] border-[#B85D3B] text-[#2C2520] ring-2 ring-[#B85D3B] z-10'
                                  : isInActiveWord
                                  ? isDarkMode
                                    ? 'bg-stone-800 border-amber-500/80 text-stone-100'
                                    : 'bg-[#FBF1D8] border-[#C99B68] text-[#2C2520]'
                                  : isDarkMode
                                  ? 'bg-[#282421] border-stone-600 text-stone-100'
                                  : 'bg-[#FDFBF7] border-[#B8A990] text-[#2C2520]'
                              }`}
                            >
                              {cell.clueNumber !== undefined && (
                                <span
                                  className={`absolute top-0.5 left-1 text-[8.5px] sm:text-[9px] font-mono font-bold leading-none pointer-events-none select-none z-10 ${
                                    cell.isSolvedLocked
                                      ? isDarkMode
                                        ? 'text-emerald-400'
                                        : 'text-[#2E6F5E]'
                                      : isDarkMode
                                      ? 'text-amber-400'
                                      : 'text-[#8C4A27]'
                                  }`}
                                >
                                  {cell.clueNumber}
                                </span>
                              )}
                              <span className="text-base sm:text-lg font-black leading-none select-none z-10 pointer-events-none">
                                {cell.userInput}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* [오른쪽 / 모바일 하단 우측] 필기 영역 (손글씨 또는 타이핑) */}
            <div
              data-testid="writing-panel"
              className="col-span-1 col-start-2 row-start-2 md:col-start-3 md:row-start-1 h-full min-h-0 min-w-0 overflow-hidden"
            >
              {inputMode === 'handwriting' ? (
                <HandwritingPad
                  selectedCellKey={`${currentPuzzle.id}-${selectedCell.row}-${selectedCell.col}`}
                  currentCellInput={
                    grid[selectedCell.row]?.[selectedCell.col]?.userInput || ''
                  }
                  isDarkMode={isDarkMode}
                  autoCommitDelaySec={autoCommitDelaySec}
                  contextSyllables={currentPuzzleSyllables}
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

      {/* 스테이지 직접 생성 모달 (100% 오프라인 wordcross_words-v2.json 기반 15x15 생성기) */}
      {isCreateStageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-stage-modal-title"
        >
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl transition-colors ${
              isDarkMode
                ? 'bg-stone-900 border-stone-700 text-stone-100'
                : 'bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-base">
                <Plus className="w-5 h-5 text-[#B85D3B] dark:text-amber-400" />
                <h2 id="create-stage-modal-title">새 스테이지 생성</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateStageOpen(false)}
                aria-label="스테이지 생성 모달 닫기"
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-stone-800 text-stone-300'
                    : 'bg-[#EAE2D0] text-[#4A3F35]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {/* 자동 지정되는 스테이지 번호 */}
              <div
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-stone-950/80 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#D5CBB8]'
                }`}
              >
                <span className="text-xs font-bold opacity-80">스테이지 번호</span>
                <span className="font-mono text-base font-extrabold text-[#B85D3B] dark:text-amber-400">
                  {nextAutoStageNumber}단계
                </span>
              </div>

              {/* 격자 크기 조절 (10~15) */}
              <div
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-stone-950/80 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#D5CBB8]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold opacity-80">격자 크기</div>
                  <div className="text-[11px] opacity-60">가로 × 세로 칸 수</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateGridSize((s) => Math.max(10, s - 1))}
                    disabled={createGridSize <= 10}
                    aria-label="격자 크기 1 감소"
                    className={`w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95'
                        : 'bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95'
                    }`}
                  >
                    -
                  </button>
                  <span className="w-14 text-center font-bold text-sm font-mono tabular-nums">
                    {createGridSize} × {createGridSize}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCreateGridSize((s) => Math.min(15, s + 1))}
                    disabled={createGridSize >= 15}
                    aria-label="격자 크기 1 증가"
                    className={`w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95'
                        : 'bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 단어 수 조절 (10~25) */}
              <div
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-stone-950/80 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#D5CBB8]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold opacity-80">단어 수</div>
                  <div className="text-[11px] opacity-60">스테이지 당 목표 단어</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateTargetWords((w) => Math.max(10, w - 1))}
                    disabled={createTargetWords <= 10}
                    aria-label="단어 수 1 감소"
                    className={`w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95'
                        : 'bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95'
                    }`}
                  >
                    -
                  </button>
                  <span className="w-14 text-center font-bold text-sm font-mono tabular-nums">
                    {createTargetWords}개
                  </span>
                  <button
                    type="button"
                    onClick={() => setCreateTargetWords((w) => Math.min(25, w + 1))}
                    disabled={createTargetWords >= 25}
                    aria-label="단어 수 1 증가"
                    className={`w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95'
                        : 'bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 생성될 격자 데이터 요약 */}
              <div
                className={`rounded-2xl border p-3 text-xs space-y-1.5 ${
                  isDarkMode
                    ? 'bg-stone-950/80 border-stone-800 text-stone-300'
                    : 'bg-[#EFE9DA] border-[#D8CEBE] text-[#4A3F35]'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>격자 크기</span>
                  <span className="font-mono">{createGridSize} × {createGridSize}</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span>배치된 교차 단어 수</span>
                  <span className="font-mono text-[#B85D3B] dark:text-amber-400">
                    총 {previewWordDataList.length}개 (가로{' '}
                    {previewWordDataList.filter((w) => w.direction === 'Horizontal').length}{' '}
                    / 세로{' '}
                    {previewWordDataList.filter((w) => w.direction === 'Vertical').length})
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleCreateAndRegisterStage(false)}
                className={`min-h-[44px] rounded-xl border font-bold text-sm ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700'
                    : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
                }`}
              >
                목록에 추가
              </button>

              <button
                type="button"
                onClick={() => handleCreateAndRegisterStage(true)}
                className={`min-h-[44px] rounded-xl font-bold text-sm flex items-center justify-center gap-1 ${
                  isDarkMode
                    ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                    : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C]'
                }`}
              >
                <span>추가 후 시작</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 선택한 스테이지 일괄 삭제 확인 모달 */}
      {isConfirmBulkDeleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-stage-modal-title"
        >
          <div
            className={`w-full max-w-xs rounded-3xl border p-5 shadow-2xl text-center transition-colors ${
              isDarkMode
                ? 'bg-stone-900 border-stone-700 text-stone-100'
                : 'bg-[#F8F3E6] border-[#D8CEBE] text-[#2C2520]'
            }`}
          >
            <h3 id="delete-stage-modal-title" className="text-base font-bold mb-2">
              선택한 스테이지 삭제
            </h3>
            <p className="text-sm opacity-80 mb-5 break-keep">
              선택한{' '}
              <strong className="text-rose-600 dark:text-rose-400">
                {selectedDeleteIds.length}개
              </strong>
              의 내가 만든 스테이지를 정말 삭제하시겠습니까? 삭제된 스테이지는 복구할 수 없습니다.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmBulkDeleteOpen(false)}
                className={`min-h-[44px] rounded-xl border font-bold text-sm ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                    : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]'
                }`}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmBulkDeleteStages}
                className="min-h-[44px] rounded-xl font-bold text-sm bg-rose-600 text-white hover:bg-rose-700 active:scale-95 shadow-md"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 게임방법 모달 (메인 화면 '게임방법' 버튼 클릭 시 표시) */}
      {isHowToPlayOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="how-to-play-modal-title"
        >
          <div
            className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl transition-colors flex flex-col max-h-[85dvh] ${
              isDarkMode
                ? 'bg-stone-900 border-stone-700 text-stone-100'
                : 'bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]'
            }`}
          >
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-2 font-bold text-lg">
                <CircleHelp className="w-5 h-5 text-[#B85D3B] dark:text-amber-400" />
                <h2 id="how-to-play-modal-title">게임방법</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsHowToPlayOpen(false)}
                aria-label="게임방법 닫기"
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-stone-800 text-stone-300'
                    : 'bg-[#EAE2D0] text-[#4A3F35]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1 text-left text-xs sm:text-sm leading-relaxed">
              <div
                className={`rounded-2xl border p-3.5 ${
                  isDarkMode
                    ? 'bg-stone-950/70 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#E2D9C8]'
                }`}
              >
                <div className="font-bold text-sm mb-1 text-[#B85D3B] dark:text-amber-400">
                  1. 십자말풀이 규칙
                </div>
                <p className="opacity-90 break-keep">
                  칸을 눌러 가로·세로 문제 설명을 확인하고 정답 단어를 채워 넣으세요. 한 단어를 완성할 때마다 <strong>5코인</strong>을 획득하고 다음 번호의 단어로 자동 이동합니다.
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3.5 ${
                  isDarkMode
                    ? 'bg-stone-950/70 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#E2D9C8]'
                }`}
              >
                <div className="font-bold text-sm mb-1 text-[#B85D3B] dark:text-amber-400">
                  2. 손글씨 & 키보드 입력
                </div>
                <p className="opacity-90 break-keep">
                  필기 영역에 한글 한 글자를 직접 쓰면 자동으로 인식되어 칸에 입력됩니다. <strong>설정</strong>에서 손글씨 자동 입력 대기 시간(기본 1.5초)을 조절하거나 <strong>키보드 타이핑 모드</strong>로 전환할 수 있습니다.
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3.5 ${
                  isDarkMode
                    ? 'bg-stone-950/70 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#E2D9C8]'
                }`}
              >
                <div className="font-bold text-sm mb-1 text-[#B85D3B] dark:text-amber-400">
                  3. 힌트와 클리어 표시
                </div>
                <p className="opacity-90 break-keep">
                  어려운 문제는 코인을 사용해 <strong>한 글자 힌트({HINT_LETTER_COST}코인)</strong> 또는 <strong>한 단어 힌트({HINT_WORD_COST}코인)</strong>를 쓸 수 있습니다. 힌트를 쓰지 않고 풀면 스테이지에 <strong>색이 채워진 체크 원</strong>이, 힌트를 사용해서 풀면 <strong>안쪽이 빈 동그라미 체크</strong>가 표시됩니다.
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3.5 ${
                  isDarkMode
                    ? 'bg-stone-950/70 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#E2D9C8]'
                }`}
              >
                <div className="font-bold text-sm mb-1 text-[#B85D3B] dark:text-amber-400">
                  4. 나만의 스테이지 생성 & 선택 삭제
                </div>
                <p className="opacity-90 break-keep">
                  스테이지 목록의 <strong>+</strong> 버튼으로 격자 크기와 단어 수를 정해 새 스테이지를 만들 수 있으며, <strong>격자 크기가 클수록 긴 단어가 나올 확률이 높아집니다.</strong> 상단의 <strong>스테이지 삭제</strong> 버튼으로 직접 만든 스테이지를 선택하여 삭제할 수 있습니다.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsHowToPlayOpen(false)}
              className={`mt-4 w-full min-h-[46px] rounded-2xl font-bold text-sm shrink-0 ${
                isDarkMode
                  ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                  : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C]'
              }`}
            >
              확인
            </button>
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
        letterHintCount={runLetterHintCount}
        wordHintCount={runWordHintCount}
        hasNextStage={hasNextStage}
        onNextStage={() => {
          if (hasNextStage) {
            startPuzzle(allStages[currentStageIndex + 1], true);
          }
        }}
        onReplay={() => startPuzzle(currentPuzzle, true)}
        onGoStageSelect={() => setScreen('stage_select')}
      />

      {/* 설정 모달 */}
      <SettingsModal
        isOpen={isSettingsOpen}
        inputMode={inputMode}
        autoCommitDelaySec={autoCommitDelaySec}
        bgmEnabled={bgmEnabled}
        sfxEnabled={sfxEnabled}
        isDarkMode={isDarkMode}
        onChangeInputMode={(mode) => setInputMode(mode)}
        onChangeAutoCommitDelay={(sec) => {
          setAutoCommitDelaySec(sec);
          saveStateToStorage((prev) => ({
            ...prev,
            settings: {
              ...prev.settings,
              autoCommitDelaySec: sec,
            },
          }));
        }}
        onToggleBgm={() => setBgmEnabled((b) => !b)}
        onToggleSfx={() => setSfxEnabled((s) => !s)}
        onToggleDarkMode={() => setIsDarkMode((d) => !d)}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
