import { HOST } from './../config/game-config';
import { Injectable } from '@angular/core';
import { EVENT_TYPE, RequestType, ResponseType } from '../config/game-config';
import { EmitService } from './emit.service';
import * as io from 'socket.io-client';
import { getUUID } from '../infrastructure/uuid-generator';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  public playgroundCards = [];
  public candidateCards = [];
  public score = 0;
  public bestScore = 0;

  private socket;

  constructor(public emitService: EmitService) {
    this.initSocket();
    this.setSubscribe();
    this.initialService();
  }

  private initSocket() {
    let token = localStorage.getItem('token');
    if (token == null) {
      token = getUUID();
      localStorage.setItem('token', token);
    }
    this.socket = io(`${HOST}?token=${token}`);
  }

  private setSubscribe() {
    this.socket.on(ResponseType.playgroundCardsChanged, data => {
      this.playgroundCards = data;
      console.log('Received playgroundCardsChanged, current playgroundCards is:');
      console.log(this.playgroundCards);
      this.emitPlaygroundCardsChanged();
    });

    this.socket.on(ResponseType.candidateCardsChanged, data => {
      this.candidateCards = data;
      console.log('Received candidateCardsChanged, current candidateCards is:');
      console.log(this.candidateCards);
      this.emitCandidateCardsChanged();
    });

    this.socket.on(ResponseType.scoreChanged, data => {
      this.score = data;
      console.log('Received scoreChanged, current score is:');
      console.log(this.score);
      this.emitScoreChanged();
    });

    this.socket.on(ResponseType.bestScoreChanged, data => {
      this.bestScore = data;
      console.log('Received bestScoreChanged, current bestScore is:');
      console.log(this.bestScore);
      this.emitBestScoreChanged();
    });
  }

  private initialService() {
    this.getData();
  }

  getData() {
    this.socket.emit(RequestType.getData, this.socket.id);
  }

  private emitPlaygroundCardsChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.playgroundCardsChanged);
  }

  private emitCandidateCardsChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.candidateCardsChanged);
  }

  private emitScoreChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.scoreChanged);
  }

  private emitBestScoreChanged() {
    this.emitService.eventEmit.emit(EVENT_TYPE.bestScoreChanged);
  }

  clickCard(rowIndex: number, columnIndex: number) {
    this.socket.emit(RequestType.clickCard, rowIndex, columnIndex);
  }
}
