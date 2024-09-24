import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PersonalizedPlaylistResponse } from '@services/playlist.service';

@Component({
  selector: 'app-personalized-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalized-playlist.component.html',
  styleUrl: './personalized-playlist.component.scss'
})
export class PersonalizedPlaylistComponent {
  @Input() personalizedPlaylist!: PersonalizedPlaylistResponse | undefined;
}
