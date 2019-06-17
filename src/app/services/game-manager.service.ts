import { Injectable } from "@angular/core";
import {
  PLAYGROUND_SIZE,
  // CARD_VALUE,
  EVENT_TYPE,
  MAX_GENERATED_CARD,
  ARROW
} from "../config/game-config";
import { EmitService } from "./emit.service";

@Injectable({
  providedIn: "root"
})
export class GameManagerService {
  public playgroundCards = [];
  public candidateCards = [];

  constructor(public emitService: EmitService) {
    this.initialService();
  }

  private initialService() {
    this.playgroundCards = this.getDefaultPlaygroundCards();
    this.emitPlaygroundCardsChanged();

    this.appendCandidateCard();
    this.appendCandidateCard();
    this.emitCandidateCardsChanged();
  }

  getDefaultPlaygroundCards() {
    const result = [];
    for (let row = 0; row < PLAYGROUND_SIZE; row++) {
      result[row] = [];
      for (let column = 0; column < PLAYGROUND_SIZE; column++) {
        result[row][column] = null;
      }
    }
    return result;
  }

  generateCard() {
    let maxCard = Math.max(
      ...Array.prototype.concat.apply([], this.playgroundCards)
    );
    if (isNaN(maxCard)) {
      maxCard = 0;
    }

    if (maxCard > MAX_GENERATED_CARD) {
      maxCard = MAX_GENERATED_CARD;
    }

    return Math.trunc(Math.random() * maxCard + 1);
  }

  private emitPlaygroundCardsChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.playgroundCardsChanged);
  }

  private emitCandidateCardsChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.candidateCardsChanged);
  }

  clickCard(rowIndex: number, columnIndex: number) {
    console.log(
      "received click card request, rowIndex:" +
        rowIndex +
        ", columnIndex: " +
        columnIndex
    );

    if (this.playgroundCards[rowIndex][columnIndex] != null) {
      return;
    }

    let currentCandidateCard = this.candidateCards.shift();
    this.appendCandidateCard();
    this.emitCandidateCardsChanged();

    this.playgroundCards[rowIndex][columnIndex] = currentCandidateCard;
    let combinedCardsIndexs = this.getSameCardsFromAround(
      rowIndex,
      columnIndex
    );
    while (combinedCardsIndexs.length > 0) {
      this.combineCards(combinedCardsIndexs, rowIndex, columnIndex);
      this.emitPlaygroundCardsChanged();
      combinedCardsIndexs = this.getSameCardsFromAround(rowIndex, columnIndex);
    }
  }

  private combineCards(
    combinedCardsIndexs: any[],
    rowIndex: number,
    columnIndex: number
  ) {
    combinedCardsIndexs.forEach(index => {
      this.playgroundCards[index[0]][index[1]] = null;
    });

    this.playgroundCards[rowIndex][columnIndex] =
      this.playgroundCards[rowIndex][columnIndex] + 1;
  }

  private getSameCardsFromAround(rowIndex: number, columnIndex: number) {
    const centerCard = this.playgroundCards[rowIndex][columnIndex];
    let result = [];

    const arrows = [
      ARROW.LEFT_UP,
      ARROW.UP,
      ARROW.RIGHT_UP,
      ARROW.LEFT,
      ARROW.RIGHT,
      ARROW.LEFT_DOWN,
      ARROW.DOWN,
      ARROW.RIGHT_DOWN
    ];
    arrows.forEach(arrow => {
      const columnOffset = arrow[0];
      const rowOffset = arrow[1];
      const targetRowIndex = rowIndex + rowOffset;
      const targetColumnIndex = columnIndex + columnOffset;

      if (
        this.isOutofPlaygroundRange(targetRowIndex) ||
        this.isOutofPlaygroundRange(targetColumnIndex)
      ) {
        return;
      }

      if (
        this.playgroundCards[targetRowIndex][targetColumnIndex] === centerCard
      ) {
        result.push([targetRowIndex, targetColumnIndex]);
      }
    });

    return result;
  }

  private isOutofPlaygroundRange(index: number): boolean {
    return PLAYGROUND_SIZE <= index || index < 0;
  }

  private appendCandidateCard() {
    this.candidateCards.push(this.generateCard());
  }
}
