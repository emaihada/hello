/**
 * Procedural Web Audio synthesizer for On-Geul Korean Crossword:
 * - Warm, bright, unobtrusive pentatonic BGM (#4)
 * - Paper pencil/fountain-pen scratching SFX on stroke/write (#13)
 * - Snappy wooden tile "탁!" fit SFX for correct character/word (#15)
 * - Harmonic chime SFX on full word completion (#14)
 * - Soft low buzz/thud SFX on wrong character/word (#15)
 * - Stage clear fanfare & red seal stamp thud (#11, #18)
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmEnabled: boolean = true;
  private sfxEnabled: boolean = true;
  private bgmTimer: number | null = null;
  private isPlayingBgm: boolean = false;
  private isBackgrounded: boolean = false;
  private lifecycleBound: boolean = false;
  private noteIndex: number = 0;
  private lastPaperSoundAt: number = 0;
  private cachedNoiseBuffer: AudioBuffer | null = null;

  public constructor() {
    this.bindLifecycleListeners();
  }

  private bindLifecycleListeners() {
    if (this.lifecycleBound || typeof window === 'undefined') return;
    this.lifecycleBound = true;

    const handleBackground = () => {
      this.pauseForBackground();
    };

    const handleForeground = () => {
      if (typeof document !== 'undefined' && (document.hidden || document.visibilityState === 'hidden')) {
        return;
      }
      this.resumeFromBackground();
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden || document.visibilityState === 'hidden') {
          handleBackground();
        } else {
          handleForeground();
        }
      });
      // Capacitor / Cordova Android native lifecycle events
      document.addEventListener('pause', handleBackground, false);
      document.addEventListener('resume', handleForeground, false);
    }

    window.addEventListener('blur', handleBackground);
    window.addEventListener('focus', handleForeground);
    window.addEventListener('pagehide', handleBackground);
    window.addEventListener('beforeunload', handleBackground);
  }

  public pauseForBackground() {
    this.isBackgrounded = true;
    if (this.bgmTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  public resumeFromBackground() {
    this.isBackgrounded = false;
    if (this.isPlayingBgm && this.bgmEnabled) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      this.startBgm();
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (
      this.isBackgrounded ||
      (typeof document !== 'undefined' &&
        (document.hidden || document.visibilityState === 'hidden'))
    ) {
      return null;
    }
    this.bindLifecycleListeners();
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && !this.cachedNoiseBuffer) {
        const duration = 0.1;
        const bufferSize = Math.floor(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const env = Math.sin((i / bufferSize) * Math.PI);
          data[i] = (Math.random() * 2 - 1) * env * 0.45;
        }
        this.cachedNoiseBuffer = buffer;
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public setConfig(bgm: boolean, sfx: boolean) {
    this.bgmEnabled = bgm;
    this.sfxEnabled = sfx;
    if (!this.bgmEnabled) {
      if (this.bgmTimer !== null && typeof window !== 'undefined') {
        window.clearInterval(this.bgmTimer);
        this.bgmTimer = null;
      }
    } else if (this.isPlayingBgm && !this.bgmTimer && !this.isBackgrounded) {
      this.startBgm();
    }
  }

  /**
   * #4: 밝고 잔잔하며 집중에 방해되지 않는 어쿠스틱 마림바/칼림바 느낌의 오음계 배경음악
   */
  public startBgm() {
    this.isPlayingBgm = true;
    if (!this.bgmEnabled || this.isBackgrounded) return;
    if (
      typeof document !== 'undefined' &&
      (document.hidden || document.visibilityState === 'hidden')
    ) {
      return;
    }
    if (this.bgmTimer !== null) return;

    // Warm C-major / F-major pentatonic melody notes (Hz)
    const melody = [
      523.25, // C5
      659.25, // E5
      587.33, // D5
      783.99, // G5
      659.25, // E5
      880.0,  // A5
      783.99, // G5
      523.25, // C5
      587.33, // D5
      659.25, // E5
      523.25, // C5
      440.0,  // A4
      392.0,  // G4
      523.25, // C5
      587.33, // D5
      659.25, // E5
    ];

    const playNextBgmNote = () => {
      if (
        !this.bgmEnabled ||
        !this.isPlayingBgm ||
        this.isBackgrounded ||
        (typeof document !== 'undefined' &&
          (document.hidden || document.visibilityState === 'hidden'))
      ) {
        this.pauseForBackground();
        return;
      }
      const ctx = this.ensureContext();
      if (ctx && ctx.state === 'running') {
        const now = ctx.currentTime;
        const freq = melody[this.noteIndex % melody.length];
        this.noteIndex++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Very gentle envelope so it never distracts gameplay
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.032, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.68);
      }
    };

    this.bgmTimer = window.setInterval(playNextBgmNote, 720);
  }

  public stopBgm() {
    this.isPlayingBgm = false;
    if (this.bgmTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  /**
   * #13: 글자를 쓸 때마다 종이에 글씨를 쓰는 듯한 사각사각 연필/만년필 효과음
   */
  public playPaperScratch(intensity: number = 1) {
    if (!this.sfxEnabled) return;
    const nowMs = performance.now();
    if (nowMs - this.lastPaperSoundAt < 75) return;
    this.lastPaperSoundAt = nowMs;

    const ctx = this.ensureContext();
    if (!ctx || !this.cachedNoiseBuffer) return;

    const duration = 0.065;
    const noise = ctx.createBufferSource();
    noise.buffer = this.cachedNoiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1900 + Math.random() * 500;
    bandpass.Q.value = 2.4;

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const vol = Math.min(0.18, 0.09 * intensity);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + duration);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  /**
   * #15: 맞는 글자/단어는 '탁!' 하며 맞아떨어지는 듯한 가벼운 나무 블록 결합 효과음
   */
  public playSnapFit() {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Crisp wooden block snap ("탁!")
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(145, now + 0.045);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);

    // Subtle high click overtone
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1120, now);
    clickOsc.frequency.exponentialRampToValueAtTime(520, now + 0.025);
    clickGain.gain.setValueAtTime(0.12, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.035);
  }

  /**
   * #14: 한 단어가 완성되면 경쾌한 화음 효과음
   */
  public playWordComplete() {
    if (!this.sfxEnabled) return;
    this.playSnapFit();
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 - E5 - G5 - C6
    notes.forEach((freq, idx) => {
      const start = ctx.currentTime + 0.05 + idx * 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.14, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.3);
    });
  }

  /**
   * #15: 틀린 단어/글자는 빨간색으로 표시되며 틀림 효과음
   */
  public playWrongBuzzer() {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.22);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.002, now + 0.24);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playWrongAlert() {
    this.playWrongBuzzer();
  }

  /**
   * #11 & #18: 스테이지/오늘의 문제 클리어 축하 팡파르 및 도장 효과음
   */
  public playStageClear() {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
    chord.forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.16, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.58);
    });
  }
}

export const soundManager = new SoundManager();
