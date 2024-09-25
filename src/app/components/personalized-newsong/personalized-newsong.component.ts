import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { NewSongResponse } from '@services/song.service';
@Component({
  selector: 'app-personalized-newsong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalized-newsong.component.html',
  styleUrl: './personalized-newsong.component.scss'
})
export class PersonalizedNewsongComponent {
  @Input() personalizedNewsong: NewSongResponse | undefined;

  constructor(private playerService: PlayerService) { }

  async play(song: NewSongResponse["result"][0]) {
    this.playerService.addToPlaylist({
      id: song.id,
      name: song.name,
      artists: song.song.artists.map((ar) => ar.name).join('/'),
      album: song.song.album.name,
      duration: song.song.duration,
      picUrl: song.song.album.picUrl
    })
  }
}
