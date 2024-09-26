import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { SongService } from './song.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends EventEmitter {
  private audio: HTMLAudioElement | undefined;
  private playlist: Array<PlaylistModel> = [];
  private currentIndex: number = -1;

  constructor(private songService: SongService) {
    super();
  }

  async play() {
    // 销毁之前的audio
    this.audio?.pause();
    this.audio = undefined;
    const song = await firstValueFrom(this.songService.getSongUrl(this.playlist[this.currentIndex].id))
    this.audio = new Audio();
    this.audio.volume = parseFloat(localStorage.getItem('volume') || '0.5');
    this.audio.addEventListener('play', () => { this.emit('playStateChange'); });
    this.audio.addEventListener('pause', () => { this.emit('playStateChange'); });
    this.audio.addEventListener('ended', () => { this.emit('playStateChange'); });
    this.audio.addEventListener('timeupdate', () => { this.emit('timeUpdate'); })
    this.audio.addEventListener('durationchange', () => { this.emit('durationChange'); })
    this.audio.src = song.data[0].url;
    this.audio.play();
  }

  addToPlaylist(track: PlaylistModel): void {
    this.playlist.push(track);
    // 播放新添加的音乐
    this.playByIndex(this.playlist.length - 1);
  }

  // 播放指定下标的音乐
  playByIndex(index: number): void {
    if (index >= 0 && index < this.playlist.length) {
      this.currentIndex = index;
      // 发出歌曲改变事件
      this.emit('songChange', this.playlist[this.currentIndex]);
      this.play();
    }
  }

  playPause() {
    if (this.audio?.paused) {
      this.audio.play();
    } else {
      this.pause();
    }
  }

  pause(): void {
    this.audio?.pause();
  }

  isPaused(): boolean {
    return this.audio ? this.audio.paused : true;
  }

  // 上一首
  prev(): void {
    if (this.playlist.length <= 0)
      return
    if (this.currentIndex === 0) {
      this.currentIndex = this.playlist.length - 1;
    } else {
      this.currentIndex--;
    }
    this.emit('songChange', this.playlist[this.currentIndex]);
    this.play();
  }
  // 下一首
  next(): void {
    if (this.playlist.length <= 0)
      return
    if (this.currentIndex === this.playlist.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.emit('songChange', this.playlist[this.currentIndex]);
    this.play();
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = volume;
      localStorage.setItem('volume', volume.toString());
    }
  }

  // 获取当前播放进度,格式化为00:00
  getCurrentTime(): string {
    if (this.audio) {
      return this.formatTime(this.audio.currentTime);
    }
    return '00:00';
  }

  // 获取音乐总时长,格式化为00:00
  getDuration(): string {
    if (this.audio) {
      return this.formatTime(this.audio.duration);
    }
    return '00:00';
  }

  formatTime(time: number): string {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }

  // 快进
  seek(time: number): void {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }


}

export interface PlaylistModel {
  id: number;
  name: string;
  picUrl: string;
  album: string;
  artists: string;
  duration: number;
}
