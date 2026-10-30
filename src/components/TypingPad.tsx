import React, { useState } from 'react';
import { CornerDownLeft, Delete, PenTool } from 'lucide-react';
import { soundManager } from '../game/audio.ts';

interface TypingPadProps {
  isDarkMode: boolean;
  isOffline?: boolean;
  onAttemptSwitchToHandwriting?: () => void;
  onEnterSingleChar: (char: string) => void;
  onEnterFullWord: (wordStr: string) => void;
  onClearCell: () => void;
}

export const TypingPad: React.FC<TypingPadProps> = ({
  isDarkMode,
  isOffline = false,
  onAttemptSwitchToHandwriting,
  onEnterSingleChar,
  onEnterFullWord,
  onClearCell,
}) => {
  const [typedText, setTypedText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = typedText.trim();
    if (!cleaned) return;
    soundManager.playPaperScratch(1.1);

    const chars = Array.from(cleaned);
    if (chars.length === 1) {
      onEnterSingleChar(chars[0]);
    } else {
      onEnterFullWord(cleaned);
    }
    setTypedText('');
  };

  return (
    <div
      data-testid="typing-pad"
      className={`h-full w-full min-w-0 rounded-2xl border p-2 flex flex-col justify-center gap-1.5 transition-colors overflow-hidden ${
        isDarkMode
          ? 'bg-stone-900 border-stone-700 text-stone-100'
          : 'bg-[#EFE9DA] border-[#D8CEBE] text-[#2C2520]'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full flex flex-col justify-center gap-1.5"
      >
        <label htmlFor="hangul-typing-input" className="sr-only">
          정답 입력
        </label>
        <input
          id="hangul-typing-input"
          name="hangul_crossword_typing_no_autofill"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-autocomplete="none"
          value={typedText}
          onChange={(e) => {
            soundManager.playPaperScratch(0.7);
            setTypedText(e.target.value);
          }}
          placeholder="글자/단어 입력"
          className={`w-full h-10 sm:h-11 px-2.5 py-1.5 rounded-xl border text-center text-sm sm:text-base font-bold focus:outline-none focus:ring-2 ${
            isDarkMode
              ? 'bg-stone-950 border-stone-600 text-stone-100 placeholder:text-stone-500 focus:ring-amber-500'
              : 'bg-[#FDFBF7] border-[#C4B69E] text-[#2C2520] placeholder:text-[#8E8173] focus:ring-[#5C4332]'
          }`}
        />

        <div className="grid grid-cols-2 gap-1.5 shrink-0">
          <button
            type="submit"
            aria-label="타이핑 입력 확인"
            className={`h-8 sm:h-9 rounded-lg font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap shrink-0 transition-transform active:scale-95 ${
              isDarkMode
                ? 'bg-[#CE8E54] text-[#FFFDF9] hover:bg-[#BF8047]'
                : 'bg-[#CC8B52] text-[#FFFDF9] hover:bg-[#BC7C44]'
            }`}
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>입력</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playPaperScratch(0.6);
              setTypedText('');
              onClearCell();
            }}
            aria-label="선택 칸 지우기"
            className={`h-8 sm:h-9 rounded-lg border font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap shrink-0 ${
              isDarkMode
                ? 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700'
                : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#5C4E41] hover:bg-[#F3ECE0]'
            }`}
          >
            <Delete className="w-3.5 h-3.5" />
            <span>지움</span>
          </button>
        </div>

        {onAttemptSwitchToHandwriting && !isOffline && (
          <button
            type="button"
            onClick={onAttemptSwitchToHandwriting}
            aria-label="손글씨 모드로 전환"
            className={`w-full h-8 sm:h-8.5 px-2 rounded-lg border font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-transform active:scale-95 ${
              isDarkMode
                ? 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700'
                : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35] hover:bg-[#F3ECE0]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>손글씨 모드로 전환</span>
          </button>
        )}
      </form>
    </div>
  );
};

