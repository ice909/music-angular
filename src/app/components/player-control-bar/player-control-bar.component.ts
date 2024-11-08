import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '@services/player.service';
import { PlaylistModel } from '@services/player.service';
import { SliderChangeEvent, SliderModule } from "primeng/slider"

@Component({
  selector: 'app-player-control-bar',
  standalone: true,
  imports: [CommonModule, SliderModule, FormsModule],
  templateUrl: './player-control-bar.component.html',
  styleUrl: './player-control-bar.component.scss'
})
export class PlayerControlBarComponent implements OnDestroy {
  isPaused: boolean = true;
  currentSong?: PlaylistModel = {
    id: 0,
    name: '未知歌曲',
    picUrl: '/assets/default.svg',
    album: '未知专辑',
    artists: '未知歌手',
    duration: 0
  };
  currentTime: number = 0;
  currentTimeStr: string = '00:00';
  duration: number = 0;
  durationStr: string = '00:00';
  constructor(private player: PlayerService) {
    this.player.on('playStateChange', () => {
      this.isPaused = this.player.getIsPaused();
      console.log('isPaused', this.isPaused);
    })

    this.player.on('songChange', (song: PlaylistModel) => {
      this.currentSong = song;
    })

    this.player.on('timeUpdate', () => {
      this.currentTime = this.player.getCurrentTime();
      this.currentTimeStr = this.player.getCurrentTimeStr();
    })
    this.player.on('durationChange', () => {
      this.duration = this.player.getDuration();
      console.log(this.duration)
      this.durationStr = this.player.getDurationStr();
    })
  }

  ngOnDestroy(): void {
    this.player.off('playStateChange', () => { });
    this.player.off('songChange', () => { });
    this.player.off('timeUpdate', () => { });
    this.player.off('durationChange', () => { });
  }

  playPause(): void {
    this.player.playPause();
  }

  // 上一首
  prev(): void {
    this.player.prev();
  }

  // 下一首
  next(): void {
    this.player.next();
  }

  seek(event: SliderChangeEvent): void {
    console.log(event.value);
    if (event.value)
      this.player.seek(event.value);
  }

  setVolume(volume: number): void {
    this.player.setVolume(volume);
  }

  formatter(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
