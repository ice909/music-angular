export class Player {
  private static instance: Player;
  private audio: HTMLAudioElement;
  private currentTrack: string | null = null;

  private constructor() {
    if (typeof Audio !== 'undefined') {
      this.audio = new Audio();
      this.audio.volume = 0.5;

    } else {
      throw new Error('Your browser does not support the Audio API');
    }
  }

  public static getInstance(): Player {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }

  public play(trackUrl: string): void {
    if (this.currentTrack !== trackUrl) {
      this.audio.src = trackUrl;
      this.currentTrack = trackUrl;
    }
    this.audio.play();
  }

  public pause(): void {
    this.audio.pause();
  }

  public stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  public setVolume(volume: number): void {
    this.audio.volume = volume;
  }

  public getCurrentTime(): number {
    return this.audio.currentTime;
  }

  public getDuration(): number {
    return this.audio.duration;
  }
}