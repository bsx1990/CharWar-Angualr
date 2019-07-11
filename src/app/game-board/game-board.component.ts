import { GameManagerService } from './../services/game-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  constructor(private gameManagerService: GameManagerService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.gameManagerService.getData();
  }
}
