import { HOST } from "./../config/game-config";
import { Injectable } from "@angular/core";
import { PLAYGROUND_SIZE, EVENT_TYPE, MAX_GENERATED_CARD, ARROW, RequestType, ResponseType } from "../config/game-config";
import { EmitService } from "./emit.service";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class GameManagerService {
  public playgroundCards = [];
  public candidateCards = [];
  socket = io(HOST);

  constructor(public emitService: EmitService) {
    this.setSubscribe();
    this.initialService();
  }

  private setSubscribe() {
    this.socket.on(ResponseType.playgroundCardsChanged, data => {
      this.playgroundCards = data;
      console.log("Received playgroundCardsChanged, current playgroundCards is:");
      console.log(this.playgroundCards);
      this.emitPlaygroundCardsChanged();
    });

    this.socket.on(ResponseType.candidateCardsChanged, data => {
      this.candidateCards = data;
      console.log("Received candidateCardsChanged, current candidateCards is:");
      console.log(this.candidateCards);
      this.emitCandidateCardsChanged();
    });
  }

  private initialService() {
    this.getData();
  }

  getData() {
    this.socket.emit(RequestType.getData);
  }

  private emitPlaygroundCardsChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.playgroundCardsChanged);
  }

  private emitCandidateCardsChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.candidateCardsChanged);
  }

  clickCard(rowIndex: number, columnIndex: number) {
    this.socket.emit(RequestType.clickCard, rowIndex, columnIndex);
  }
}
