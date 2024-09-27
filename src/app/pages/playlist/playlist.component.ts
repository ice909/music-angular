import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService, Playlist } from '@services/playlist.service';
import { firstValueFrom } from 'rxjs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SongService, Song } from '@services/song.service';
import { FormatTimePipe } from 'src/app/pipes/format-time.pipe';
import { PlayerService, PlaylistModel } from '@services/player.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, NzPaginationModule, NzTableModule, FormatTimePipe],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit {
  private id: number = 0;
  playlistInfo: Playlist | undefined = undefined;
  count: number = 0;
  page: number = 1;
  limit: number = 30;
  songs: Song[] = [];
  constructor(
    private player: PlayerService,
    public route: ActivatedRoute,
    private playlistService: PlaylistService,
    private songService: SongService
  ) {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    })
  }

  async ngOnInit() {
    console.log(this.id);
    const { playlist } = await firstValueFrom(this.playlistService.getPlaylistDetail(this.id))
    this.playlistInfo = playlist;
    this.count = playlist.trackCount;
    this.loadSongs();
  }

  async loadSongs() {
    const ids: number[] = []
    this.playlistInfo?.trackIds.forEach(item => {
      ids.push(item.id)
    })
    const res = await firstValueFrom(this.songService.getSongDetail(ids.join(',')))
    this.songs = res.songs;
  }

  async playSong(index: number) {
    this.player.addSongsToPlaylist(this.id, this.getSongs(), (this.page - 1) * this.limit + index);
  }

  getSongs() {
    let songs: PlaylistModel[] = [];
    this.songs.forEach((item) => {
      songs.push({
        id: item.id,
        name: item.name,
        picUrl: item.al.picUrl,
        album: item.al.name,
        artists: item.ar.map((artist) => artist.name).join('/'),
        duration: item.dt,
      });
    });
    return songs;
  }
}
