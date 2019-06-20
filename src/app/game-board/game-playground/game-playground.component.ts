import { PLAYGROUND_SIZE } from "./../../config/game-config";
import { GameManagerService } from "./../../services/game-manager.service";
import { Component, OnInit } from "@angular/core";
import { EmitService } from "src/app/services/emit.service";
import { EVENT_TYPE } from "src/app/config/game-config";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "game-playground",
  templateUrl: "./game-playground.component.html",
  styleUrls: ["./game-playground.component.scss"],
  animations: [
    trigger("CardUpAndDown", [
      state(
        "not-empty",
        style({
          backgroundColor: "#86b5bd"
        })
      ),
      state(
        "empty",
        style({
          backgroundColor: "transparent"
        })
      ),
      transition("empty <=> not-empty", [animate("0.5s")])
    ])
  ]
})
export class GamePlaygroundComponent implements OnInit {
  public playgroundCards;
  public candidateCards = this.gameManagerService.candidateCards;

  constructor(
    public emitService: EmitService,
    public gameManagerService: GameManagerService
  ) {
    this.initPlaygroundCards();
  }

  private initPlaygroundCards() {
    this.playgroundCards = [];
    for (let rowIndex = 0; rowIndex < PLAYGROUND_SIZE; rowIndex++) {
      this.playgroundCards[rowIndex] = [];
      for (let columnIndex = 0; columnIndex < PLAYGROUND_SIZE; columnIndex++) {
        this.playgroundCards[rowIndex][columnIndex] = {
          id: rowIndex + ";" + columnIndex,
          value: null
        };
      }
    }
  }

  ngOnInit() {
    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === EVENT_TYPE.playgroundCardsChanged) {
        this.UpdatePlaygroundCards();
      }
    });
    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === EVENT_TYPE.candidateCardsChanged) {
        this.candidateCards = this.gameManagerService.candidateCards;
      }
    });
  }

  private UpdatePlaygroundCards() {
    const cards = this.gameManagerService.playgroundCards;
    for (let rowIndex = 0; rowIndex < PLAYGROUND_SIZE; rowIndex++) {
      for (let columnIndex = 0; columnIndex < PLAYGROUND_SIZE; columnIndex++) {
        this.playgroundCards[rowIndex][columnIndex].value =
          cards[rowIndex][columnIndex];
      }
    }
  }

  public clickCard(rowIndex: number, columnIndex: number) {
    this.gameManagerService.clickCard(rowIndex, columnIndex);
  }

  public trackByCardId(index, card) {
    return card.id;
  }
}
