import { PersonalizedPlaylistResponse, PlaylistService } from '@services/playlist.service';
import { Component, OnInit } from '@angular/core';
import { PersonalizedPlaylistComponent } from "@components/personalized-playlist/personalized-playlist.component";
import { firstValueFrom } from 'rxjs';
import { PersonalizedNewsongComponent } from "@components/personalized-newsong/personalized-newsong.component";
import { SongService } from "@services/song.service";
import { NewSongResponse } from '@services/song.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PersonalizedPlaylistComponent, PersonalizedNewsongComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  personalizedPlaylist: PersonalizedPlaylistResponse | undefined;
  personalizedNewSong: NewSongResponse | undefined;
  constructor(
    private playlistService: PlaylistService,
    private songSerivce: SongService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.personalizedPlaylist = await firstValueFrom(this.playlistService.getPersonalizedPlaylist(10));
    this.personalizedNewSong = await firstValueFrom(this.songSerivce.getPersionalizedNewSong(8));
  }

}
