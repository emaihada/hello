import React from 'react';
import {
  Settings,
  X,
  PenTool,
  Keyboard,
  Volume2,
  VolumeX,
  Music,
  Moon,
  Sun,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  inputMode: 'handwriting' | 'typing';
  bgmEnabled: boolean;
  sfxEnabled: boolean;
  isDarkMode: boolean;
  onChangeInputMode: (mode: 'handwriting' | 'typing') => void;
  onToggleBgm: () => void;
  onToggleSfx: () => void;
  onToggleDarkMode: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  inputMode,
  bgmEnabled,
  sfxEnabled,
  isDarkMode,
  onChangeInputMode,
  onToggleBgm,
  onToggleSfx,
  onToggleDarkMode,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl transition-colors ${
          isDarkMode
            ? 'bg-stone-900 border-stone-700 text-stone-100'
            : 'bg-[#F8F3E6] border-[#D8CEBE] text-[#2C2520]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#B85D3B] dark:text-amber-400" />
            <h2 id="settings-modal-title" className="text-lg font-bold">
              설정
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="설정 닫기"
            className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-colors ${
              isDarkMode
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-[#EAE2D0] text-[#4A3F35] hover:bg-[#DFD5BF]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* 1. 입력 방식 (손글씨 / 타이핑) */}
          <div
            className={`rounded-2xl border p-3.5 ${
              isDarkMode ? 'bg-stone-800/70 border-stone-700' : 'bg-[#FDFBF7] border-[#DCD2C0]'
            }`}
          >
            <div className="text-xs font-bold mb-2 opacity-80">입력 방식</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChangeInputMode('handwriting')}
                aria-pressed={inputMode === 'handwriting'}
                className={`min-h-[46px] rounded-xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  inputMode === 'handwriting'
                    ? isDarkMode
                      ? 'bg-amber-600 border-amber-500 text-stone-950'
                      : 'bg-[#B85D3B] border-[#9A4829] text-white'
                    : isDarkMode
                    ? 'bg-stone-900 border-stone-700 text-stone-300'
                    : 'bg-[#F3ECE0] border-[#D5CBB8] text-[#4A3F35]'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>손글씨</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeInputMode('typing')}
                aria-pressed={inputMode === 'typing'}
                className={`min-h-[46px] rounded-xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  inputMode === 'typing'
                    ? isDarkMode
                      ? 'bg-amber-600 border-amber-500 text-stone-950'
                      : 'bg-[#B85D3B] border-[#9A4829] text-white'
                    : isDarkMode
                    ? 'bg-stone-900 border-stone-700 text-stone-300'
                    : 'bg-[#F3ECE0] border-[#D5CBB8] text-[#4A3F35]'
                }`}
              >
                <Keyboard className="w-4 h-4" />
                <span>타이핑</span>
              </button>
            </div>
          </div>

          {/* 2. 배경음악 & 효과음 */}
          <div
            className={`rounded-2xl border p-3.5 space-y-2.5 ${
              isDarkMode ? 'bg-stone-800/70 border-stone-700' : 'bg-[#FDFBF7] border-[#DCD2C0]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Music className="w-4 h-4 text-[#B85D3B] dark:text-amber-400" />
                <span>배경음악</span>
              </div>
              <button
                type="button"
                onClick={onToggleBgm}
                aria-pressed={bgmEnabled}
                aria-label="배경음악 전환"
                className={`min-h-[42px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                  bgmEnabled
                    ? isDarkMode
                      ? 'bg-emerald-700 text-emerald-50'
                      : 'bg-[#2E6F5E] text-white'
                    : isDarkMode
                    ? 'bg-stone-700 text-stone-300'
                    : 'bg-[#DFD5BF] text-[#5C4E41]'
                }`}
              >
                {bgmEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{bgmEnabled ? '켜짐' : '꺼짐'}</span>
              </button>
            </div>

            <div
              className={`border-t pt-2.5 flex items-center justify-between ${
                isDarkMode ? 'border-stone-700' : 'border-[#E8DFCE]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <Volume2 className="w-4 h-4 text-[#B85D3B] dark:text-amber-400" />
                <span>효과음</span>
              </div>
              <button
                type="button"
                onClick={onToggleSfx}
                aria-pressed={sfxEnabled}
                aria-label="효과음 전환"
                className={`min-h-[42px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                  sfxEnabled
                    ? isDarkMode
                      ? 'bg-emerald-700 text-emerald-50'
                      : 'bg-[#2E6F5E] text-white'
                    : isDarkMode
                    ? 'bg-stone-700 text-stone-300'
                    : 'bg-[#DFD5BF] text-[#5C4E41]'
                }`}
              >
                {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{sfxEnabled ? '켜짐' : '꺼짐'}</span>
              </button>
            </div>
          </div>

          {/* 3. 다크모드 */}
          <div
            className={`rounded-2xl border p-3.5 flex items-center justify-between ${
              isDarkMode ? 'bg-stone-800/70 border-stone-700' : 'bg-[#FDFBF7] border-[#DCD2C0]'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-amber-400" />
              ) : (
                <Sun className="w-4 h-4 text-[#B85D3B]" />
              )}
              <span>다크모드</span>
            </div>
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-pressed={isDarkMode}
              aria-label="다크모드 전환"
              className={`min-h-[42px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                isDarkMode
                  ? 'bg-amber-600 text-stone-950'
                  : 'bg-[#2C2520] text-[#F8F3E6]'
              }`}
            >
              <span>{isDarkMode ? '켜짐' : '꺼짐'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
