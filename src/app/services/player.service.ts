import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { SongService } from './song.service';
import { firstValueFrom } from 'rxjs';
import { Howler, Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends EventEmitter {
  private audio: Howl | undefined;
  private playlist: Array<PlaylistModel> = [];
  private currentIndex: number = -1;
  private playlistId: number | "single" = "single";
  private currentTimeTimer: NodeJS.Timeout | undefined;
  private isPaused: boolean = true;
  private isSeeking: boolean = false;


  constructor(private songService: SongService) {
    super();
  }

  async play() {
    // 销毁之前的audio
    Howler.unload();
    clearInterval(this.currentTimeTimer);
    const song = await firstValueFrom(this.songService.getSongUrl(this.playlist[this.currentIndex].id))
    this.audio = new Howl({
      src: [song.data[0].url],
      format: ["mp3", "flac"],
      html5: true,
      preload: "metadata",
      volume: parseFloat(localStorage.getItem('volume') || '0.5'),
      onplay: () => {
        this.isPaused = false;
        this.emit('playStateChange');
        this.currentTimeTimer = setInterval(() => {
          this.emit('timeUpdate');
        }, 100)
        this.emit('durationChange');

      },
      onpause: () => {
        this.isPaused = true;
        this.emit('playStateChange');
        clearInterval(this.currentTimeTimer);
      },
      onstop: () => {
        this.isPaused = true;
        this.emit('playStateChange');
        clearInterval(this.currentTimeTimer);
      },
      onend: () => {
        this.next();
      },
    });
    this.audio.play();
  }

  addToPlaylist(track: PlaylistModel): void {
    this.playlist.push(track);
    // 播放新添加的音乐
    this.playByIndex(this.playlist.length - 1);
  }

  // 添加歌单歌曲到播放列表
  async addSongsToPlaylist(id: number, songs: PlaylistModel[], index: number = -1): Promise<void> {
    if (this.playlistId === id) {
      if (index === -1) {
        this.playByIndex(0)
      } else {
        this.playByIndex(index)
      }
    }
    // 执行到这里说明是新的歌单
    this.playlistId = id;
    this.playlist = songs;
    if (index === -1) {
      this.playByIndex(0)
    } else {
      this.playByIndex(index)
    }
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
    if (this.isPaused) {
      this.audio?.play();
    } else {
      this.pause();
    }
  }

  pause(): void {
    this.audio?.pause();
  }

  getIsPaused(): boolean {
    if (this.audio) {
      return this.isPaused;
    }
    return true;
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
      this.audio.volume(volume);
      localStorage.setItem('volume', volume.toString());
    }
  }

  // 获取当前播放进度,格式化为00:00
  getCurrentTimeStr(): string {
    if (this.audio) {
      return this.formatTime(this.audio.seek());
    }
    return '00:00';
  }

  // 获取当前播放进度
  getCurrentTime(): number {
    if (this.audio) {
      return this.audio.seek();
    }
    return 0;
  }

  // 获取音乐总时长,格式化为00:00
  getDurationStr(): string {
    if (this.audio) {
      return this.formatTime(this.audio.duration());
    }
    return '00:00';
  }

  // 获取音乐总时长
  getDuration(): number {
    if (this.audio) {
      return this.audio.duration();
    }
    return 0;
  }

  formatTime(time: number): string {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }

  // 快进
  seek(time: number): void {
    this.isSeeking = true;
    if (this.audio) {
      this.audio.seek(time);
      console.log('seek', time);
    }
    this.isSeeking = false;
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
