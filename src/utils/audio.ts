/**
 * Web Audio API Synthesizer for Authentic Ceramic & Craft Sound Effects
 * Synthesizes pure physical acoustics without external audio asset downloads.
 */

class CeramicSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Authentic physical ceramic pot acoustic sound.
   * Accurately reproduces a potter's knuckle strike on vitrified earthenware:
   * an organic tactile impact transient followed by a warm, resonant harmonic ring decay.
   */
  public playPotSound(frequency = 820): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Tactile knuckle impact attack (short woody/earthy thud transient)
      const impactOsc = ctx.createOscillator();
      const impactGain = ctx.createGain();
      impactOsc.type = 'triangle';
      impactOsc.frequency.setValueAtTime(240, now);
      impactOsc.frequency.exponentialRampToValueAtTime(70, now + 0.035);
      impactGain.gain.setValueAtTime(0.24, now);
      impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      impactOsc.connect(impactGain);
      impactGain.connect(ctx.destination);
      impactOsc.start(now);
      impactOsc.stop(now + 0.045);

      // 2. Fundamental ceramic acoustic ring (pure vitrified earthenware resonance)
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = 'sine';
      bodyOsc.frequency.setValueAtTime(frequency, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(frequency * 0.995, now + 0.85);

      bodyGain.gain.setValueAtTime(0.32, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.0004, now + 0.9);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.92);

      // 3. Ceramic vitrification overtone (~2.7x fundamental, crisp metallic-clay harmonic)
      const overtoneOsc = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(frequency * 2.71, now);
      overtoneGain.gain.setValueAtTime(0.08, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.3);

      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);
      overtoneOsc.start(now);
      overtoneOsc.stop(now + 0.32);

      // 4. Subtle hollow air cavity resonance inside the pot
      const cavityOsc = ctx.createOscillator();
      const cavityGain = ctx.createGain();
      cavityOsc.type = 'sine';
      cavityOsc.frequency.setValueAtTime(frequency * 0.52, now);
      cavityGain.gain.setValueAtTime(0.06, now);
      cavityGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      cavityOsc.connect(cavityGain);
      cavityGain.connect(ctx.destination);
      cavityOsc.start(now);
      cavityOsc.stop(now + 0.46);
    } catch {
      // Graceful silence if browser audio is suspended
    }
  }

  /**
   * Play crystal-clear resonant chime of tapping a fired ceramic pot
   */
  public playPotTap(frequency = 820): void {
    this.playPotSound(frequency);
  }

  /**
   * Subtle whirring whoosh sound when the potter's wheel spins
   */
  public playWheelSpin(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {}
  }

  /**
   * Water droplet evaporation chime for matka simulator
   */
  public playWaterDrop(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  /**
   * Gentle clay squish / shaping sound when user morphs the clay
   */
  public playClaySquish(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }

  /**
   * Kiln firing crackle & flame heat surge
   */
  public playKilnFire(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Low rumble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.6);
      osc.frequency.exponentialRampToValueAtTime(40, now + 1.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  }

  /**
   * Celebratory ceramic chime chords upon firing completion
   */
  public playSuccessChime(): void {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playPotTap(freq);
      }, i * 110);
    });
  }
}

export const ceramicAudio = new CeramicSoundEngine();
