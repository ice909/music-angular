import { afterRender, AfterViewInit, Component, OnInit } from '@angular/core';
import { Player } from '@utils/player';

@Component({
  selector: 'app-player-control-bar',
  standalone: true,
  imports: [],
  templateUrl: './player-control-bar.component.html',
  styleUrl: './player-control-bar.component.scss'
})
export class PlayerControlBarComponent {
  constructor() {
    afterRender(() => {
      Player.getInstance()
    })
  }

  playMusic(trackUrl: string): void {
    Player.getInstance().play(trackUrl);
  }

  pauseMusic(): void {
    Player.getInstance().pause();
  }

  stopMusic(): void {
    Player.getInstance().stop();
  }

  setVolume(volume: number): void {
    Player.getInstance().setVolume(volume);
  }
}
