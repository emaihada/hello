import React, { useState } from 'react';
import { CornerDownLeft, Delete } from 'lucide-react';
import { soundManager } from '../game/audio.ts';

interface TypingPadProps {
  isDarkMode: boolean;
  onEnterSingleChar: (char: string) => void;
  onEnterFullWord: (wordStr: string) => void;
  onClearCell: () => void;
}

export const TypingPad: React.FC<TypingPadProps> = ({
  isDarkMode,
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
      className={`h-full rounded-2xl border p-2.5 flex flex-col justify-between gap-2 transition-colors overflow-hidden ${
        isDarkMode
          ? 'bg-stone-900 border-stone-700 text-stone-100'
          : 'bg-[#EFE9DA] border-[#D8CEBE] text-[#2C2520]'
      }`}
    >
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-2">
        <label htmlFor="hangul-typing-input" className="sr-only">
          정답 입력
        </label>
        <input
          id="hangul-typing-input"
          type="text"
          value={typedText}
          onChange={(e) => {
            soundManager.playPaperScratch(0.7);
            setTypedText(e.target.value);
          }}
          placeholder="글자/단어 입력"
          className={`w-full flex-1 min-h-[44px] px-3 py-2 rounded-xl border text-center text-base sm:text-lg font-bold focus:outline-none focus:ring-2 ${
            isDarkMode
              ? 'bg-stone-950 border-stone-600 text-stone-100 placeholder:text-stone-500 focus:ring-amber-500'
              : 'bg-[#FDFBF7] border-[#C4B69E] text-[#2C2520] placeholder:text-[#8E8173] focus:ring-[#B85D3B]'
          }`}
        />

        <div className="grid grid-cols-2 gap-1.5 shrink-0">
          <button
            type="submit"
            aria-label="타이핑 입력 확인"
            className={`h-10 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1 whitespace-nowrap shrink-0 transition-transform active:scale-95 ${
              isDarkMode
                ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C]'
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
            className={`h-10 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1 whitespace-nowrap shrink-0 ${
              isDarkMode
                ? 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700'
                : 'bg-[#FDFBF7] border-[#C9BCA6] text-[#5C4E41] hover:bg-[#F3ECE0]'
            }`}
          >
            <Delete className="w-3.5 h-3.5" />
            <span>지움</span>
          </button>
        </div>
      </form>
    </div>
  );
};
