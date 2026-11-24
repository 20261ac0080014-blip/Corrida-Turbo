let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  startTimeOffset = 0,
  type: OscillatorType = 'sine',
  gainPeak = 0.08
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTimeOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playStartSound(enabled: boolean) {
  if (!enabled) return;
  try {
    playTone(330, 0.1, 0, 'triangle', 0.06);
    playTone(440, 0.1, 0.12, 'triangle', 0.06);
    playTone(660, 0.18, 0.24, 'sawtooth', 0.05);
  } catch {
    // Ignore audio errors
  }
}

export function playCorrectSound(enabled: boolean) {
  if (!enabled) return;
  try {
    playTone(523.25, 0.12, 0, 'triangle', 0.08);
    playTone(659.25, 0.14, 0.08, 'triangle', 0.08);
    playTone(880, 0.2, 0.17, 'triangle', 0.07);
  } catch {
    // Ignore audio errors
  }
}

export function playWrongSound(enabled: boolean) {
  if (!enabled) return;
  try {
    playTone(250, 0.14, 0, 'sawtooth', 0.045);
    playTone(185, 0.22, 0.11, 'sawtooth', 0.045);
  } catch {
    // Ignore audio errors
  }
}

export function playFinishSound(enabled: boolean) {
  if (!enabled) return;
  try {
    playTone(523.25, 0.14, 0, 'triangle', 0.07);
    playTone(659.25, 0.14, 0.1, 'triangle', 0.07);
    playTone(783.99, 0.18, 0.2, 'triangle', 0.07);
    playTone(1046.5, 0.34, 0.32, 'triangle', 0.09);
  } catch {
    // Ignore audio errors
  }
}
