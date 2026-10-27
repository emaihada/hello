import React from 'react';
import { Clock, Coins, ArrowRight, RotateCcw, List } from 'lucide-react';
import { formatTimerMMSS } from '../game/rules.ts';

interface StageClearModalProps {
  isOpen: boolean;
  isDarkMode: boolean;
  puzzleTitle: string;
  elapsedSeconds: number;
  wordRewardTotal: number;
  clearBonus: number;
  hasNextStage: boolean;
  onNextStage: () => void;
  onReplay: () => void;
  onGoStageSelect: () => void;
}

export const StageClearModal: React.FC<StageClearModalProps> = ({
  isOpen,
  isDarkMode,
  puzzleTitle,
  elapsedSeconds,
  wordRewardTotal,
  clearBonus,
  hasNextStage,
  onNextStage,
  onReplay,
  onGoStageSelect,
}) => {
  if (!isOpen) return null;

  const totalEarned = wordRewardTotal + clearBonus;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-clear-title"
    >
      <div
        className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl text-center transition-colors ${
          isDarkMode
            ? 'bg-stone-900 border-stone-700 text-stone-100'
            : 'bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]'
        }`}
      >
        {/* 축하 일러스트 및 참잘함 도장 (#11) */}
        <div
          className={`mx-auto mb-3 w-full h-32 rounded-2xl border flex items-center justify-center relative overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-b from-amber-950/60 to-stone-900 border-amber-800/50'
              : 'bg-gradient-to-b from-[#F4E8CE] to-[#FDFBF7] border-[#DECFA8]'
          }`}
        >
          <svg
            viewBox="0 0 320 130"
            className="w-full h-full"
            role="img"
            aria-label="클리어 축하 일러스트"
          >
            <circle cx="160" cy="78" r="46" fill="#E89954" fillOpacity="0.24" />
            <circle cx="160" cy="78" r="32" fill="#D97736" fillOpacity="0.32" />
            <path
              d="M0 130 L55 82 L115 112 L180 74 L255 108 L320 80 L320 130 Z"
              fill={isDarkMode ? '#3B332B' : '#DECBB1'}
            />
            <path
              d="M0 130 L85 96 L155 118 L230 88 L320 115 L320 130 Z"
              fill={isDarkMode ? '#29241F' : '#CDB89B'}
            />
            <path
              d="M15 36 Q65 42 110 28"
              stroke="#5C4028"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="62" cy="42" r="10" fill="#D9532F" />
            <circle cx="95" cy="34" r="9" fill="#E06A3B" />

            <g transform="translate(160, 62) rotate(-8)">
              <rect
                x="-34"
                y="-34"
                width="68"
                height="68"
                rx="12"
                fill="#FDFBF7"
                stroke="#C92A2A"
                strokeWidth="3.5"
              />
              <rect
                x="-28"
                y="-28"
                width="56"
                height="56"
                rx="8"
                fill="rgba(201, 42, 42, 0.1)"
                stroke="#C92A2A"
                strokeWidth="1.5"
                strokeDasharray="6 3"
              />
              <text
                x="0"
                y="-4"
                textAnchor="middle"
                fill="#C92A2A"
                fontSize="15"
                fontWeight="800"
                fontFamily="IBM Plex Sans KR, sans-serif"
              >
                참잘함
              </text>
              <text
                x="0"
                y="16"
                textAnchor="middle"
                fill="#C92A2A"
                fontSize="12"
                fontWeight="700"
                fontFamily="IBM Plex Sans KR, sans-serif"
              >
                완성함
              </text>
            </g>
          </svg>
        </div>

        <h2 id="stage-clear-title" className="text-xl font-bold mb-1">
          참 잘하셨습니다!
        </h2>
        <div className={`text-xs font-semibold mb-4 ${isDarkMode ? 'text-stone-400' : 'text-[#6E6256]'}`}>
          {puzzleTitle}
        </div>

        {/* 푼 시간 & 얻은 재화 (#11) */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div
            className={`rounded-2xl border p-3 flex flex-col items-center ${
              isDarkMode ? 'bg-stone-800/80 border-stone-700' : 'bg-[#F2ECE0] border-[#DCD2C0]'
            }`}
          >
            <div
              className={`text-xs font-semibold flex items-center gap-1 mb-1 ${
                isDarkMode ? 'text-stone-400' : 'text-[#6E6256]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>풀이 시간</span>
            </div>
            <div className="text-xl font-bold font-mono tabular-nums">
              {formatTimerMMSS(elapsedSeconds)}
            </div>
          </div>

          <div
            className={`rounded-2xl border p-3 flex flex-col items-center ${
              isDarkMode
                ? 'bg-amber-950/50 border-amber-800/70 text-amber-200'
                : 'bg-[#F6EBD6] border-[#DFC99F] text-[#7A3E18]'
            }`}
          >
            <div className="text-xs font-semibold flex items-center gap-1 mb-1">
              <Coins className="w-3.5 h-3.5" />
              <span>획득 재화</span>
            </div>
            <div className="text-xl font-bold font-mono tabular-nums">+{totalEarned}</div>
          </div>
        </div>

        <div className="space-y-2">
          {hasNextStage && (
            <button
              type="button"
              data-start="true"
              onClick={onNextStage}
              className={`w-full min-h-[48px] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                  : 'bg-[#B85D3B] text-white hover:bg-[#9E4B2C]'
              }`}
            >
              <span>다음 스테이지</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              data-start={!hasNextStage ? 'true' : undefined}
              onClick={onReplay}
              className={`min-h-[44px] rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                  : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E5DEC9]'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 풀기</span>
            </button>

            <button
              type="button"
              aria-label="스테이지 선택 화면으로 이동"
              onClick={onGoStageSelect}
              className={`min-h-[44px] rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                  : 'bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E5DEC9]'
              }`}
            >
              <List className="w-4 h-4" />
              <span>스테이지 목록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
