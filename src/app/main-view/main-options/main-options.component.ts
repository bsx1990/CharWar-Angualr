import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameManagerService } from 'src/app/services/game-manager.service';
import { GAME_MODES } from 'src/app/config/game-config';

@Component({
  selector: 'main-options',
  templateUrl: './main-options.component.html',
  styleUrls: ['./main-options.component.scss']
})
export class MainOptionsComponent implements OnInit {
  public getKeys = Object.keys;
  public allModes = GAME_MODES;

  constructor(private router: Router, private gameManagerService: GameManagerService) {}

  ngOnInit() {}

  public play(mode) {
    this.gameManagerService.emitGameModeChanged(mode);
    this.router.navigate(['/game-board'], { skipLocationChange: true });
  }
}
