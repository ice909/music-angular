import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonalizedPlaylistResponse } from '@services/playlist.service';

@Component({
  selector: 'app-personalized-playlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './personalized-playlist.component.html',
  styleUrl: './personalized-playlist.component.scss'
})
export class PersonalizedPlaylistComponent {
  @Input() personalizedPlaylist!: PersonalizedPlaylistResponse | undefined;
}
