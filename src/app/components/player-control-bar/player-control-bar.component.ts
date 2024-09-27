import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '@services/player.service';
import { PlaylistModel } from '@services/player.service';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-player-control-bar',
  standalone: true,
  imports: [CommonModule, NzSliderModule, FormsModule],
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
      console.log('playStateChange', this.player.isPaused());
      this.isPaused = this.player.isPaused();
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

  seek(time: number[] | number): void {
    if (Array.isArray(time)) {
      this.player.seek(time[1] * 10);
    } else {
      this.player.seek(time * 10);
    }
  }

  setVolume(volume: number): void {
    this.player.setVolume(volume);
  }
}
