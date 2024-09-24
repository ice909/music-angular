import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewSongResponse } from '@services/song.service';
import { Player } from '@utils/player';
import { SongService } from '@services/song.service';

@Component({
  selector: 'app-personalized-newsong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalized-newsong.component.html',
  styleUrl: './personalized-newsong.component.scss'
})
export class PersonalizedNewsongComponent {
  @Input() personalizedNewsong: NewSongResponse | undefined;

  constructor(private songService: SongService) { }

  async play(id: number) {
    // 获取音乐url
    const res = await firstValueFrom(this.songService.getSongUrl(id))
    console.log(res.data)
    // 播放音乐
    Player.getInstance().play(res.data[0].url)
  }
}
