import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { PlaylistModel } from '@services/player.service';

@Component({
  selector: 'app-player-control-bar',
  standalone: true,
  imports: [CommonModule],
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
  constructor(private playerService: PlayerService) {
    this.playerService.on('playStateChange', () => {
      console.log('playStateChange', this.playerService.isPaused());
      this.isPaused = this.playerService.isPaused();
      console.log('isPaused', this.isPaused);
    })

    this.playerService.on('songChange', (song: PlaylistModel) => {
      this.currentSong = song;
    })
  }

  ngOnDestroy(): void {
    this.playerService.off('playStateChange', () => { });
  }

  playPause(): void {
    this.playerService.playPause();
  }

  // 上一首
  prev(): void {
    this.playerService.prev();
  }

  // 下一首
  next(): void {
    this.playerService.next();
  }

  setVolume(volume: number): void {
    this.playerService.setVolume(volume);
  }
}
