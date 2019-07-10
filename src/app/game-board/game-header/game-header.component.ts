import { Component, OnInit } from '@angular/core';
import { EmitService } from 'src/app/services/emit.service';
import { RESPONSE_TYPE } from 'src/app/config/game-config';
import { GameManagerService } from './../../services/game-manager.service';

@Component({
  selector: 'game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {
  public score;
  public bestScore;

  constructor(public emitService: EmitService, public gameManagerService: GameManagerService) {}

  ngOnInit() {
    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === RESPONSE_TYPE.scoreChanged) {
        this.score = this.gameManagerService.score;
      }
    });

    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === RESPONSE_TYPE.bestScoreChanged) {
        this.bestScore = this.gameManagerService.bestScore;
      }
    });
  }
}
