import { PLAYGROUND_SIZE, ANIMATION_TIME, USING_STEP_BY_STEP_ANIMATION, RESPONSE_TYPE } from './../../config/game-config';
import { GameManagerService } from './../../services/game-manager.service';
import { Component, OnInit } from '@angular/core';
import { EmitService } from 'src/app/services/emit.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IntervalAutoSendQueue } from 'src/app/infrastructure/interval-auto-send-queue';

@Component({
  selector: 'game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.scss'],
  animations: [
    trigger('CardUpAndDown', [
      state(
        'not-empty',
        style({
          backgroundColor: '#86b5bd'
        })
      ),
      state(
        'empty',
        style({
          backgroundColor: 'transparent'
        })
      ),
      transition('empty <=> not-empty', [animate(ANIMATION_TIME)])
    ]),

    trigger('SkillAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate(ANIMATION_TIME, style({ opacity: 1 }))]),
      transition(':leave', [animate(ANIMATION_TIME, style({ opacity: 0 }))])
    ])
  ]
})
export class GamePlaygroundComponent implements OnInit {
  public playgroundCards;
  public candidateCards = this.gameManagerService.candidateCards;
  public isGameOver = false;
  public skill;
  public isPlayingAnimation = false;

  private playgroundCardsChangingQueue;

  constructor(public emitService: EmitService, public gameManagerService: GameManagerService) {
    this.initPlaygroundCards();
  }

  private initPlaygroundCards() {
    this.playgroundCards = [];
    for (let rowIndex = 0; rowIndex < PLAYGROUND_SIZE; rowIndex++) {
      this.playgroundCards[rowIndex] = [];
      for (let columnIndex = 0; columnIndex < PLAYGROUND_SIZE; columnIndex++) {
        this.playgroundCards[rowIndex][columnIndex] = {
          id: rowIndex + ';' + columnIndex,
          value: null
        };
      }
    }
  }

  ngOnInit() {
    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === RESPONSE_TYPE.playgroundCardsChanged) {
        if (USING_STEP_BY_STEP_ANIMATION) {
          if (this.playgroundCardsChangingQueue == null) {
            this.playgroundCardsChangingQueue = new IntervalAutoSendQueue(ANIMATION_TIME, data => this.UpdatePlaygroundCards(data));
          }
          this.playgroundCardsChangingQueue.push(this.gameManagerService.playgroundCards);
        } else {
          this.UpdatePlaygroundCards(this.gameManagerService.playgroundCards);
        }
      }
    });

    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === RESPONSE_TYPE.candidateCardsChanged) {
        this.candidateCards = this.gameManagerService.candidateCards;
      }
    });

    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === RESPONSE_TYPE.gameStateChanged) {
        this.isGameOver = this.gameManagerService.gameState === 'GameOver';
      }
    });

    this.emitService.eventEmit.subscribe((value: any) => {
      if (value === RESPONSE_TYPE.playSkill) {
        this.isPlayingAnimation = true;
        this.skill = this.gameManagerService.skill;
        console.log(`skill: ${this.skill}`);
        setInterval(() => {
          this.isPlayingAnimation = false;
        }, ANIMATION_TIME);
      }
    });
  }

  private UpdatePlaygroundCards(cards) {
    for (let rowIndex = 0; rowIndex < PLAYGROUND_SIZE; rowIndex++) {
      for (let columnIndex = 0; columnIndex < PLAYGROUND_SIZE; columnIndex++) {
        this.playgroundCards[rowIndex][columnIndex].value = cards[rowIndex][columnIndex];
      }
    }
  }

  public clickCard(rowIndex: number, columnIndex: number) {
    this.gameManagerService.clickCard(rowIndex, columnIndex);
  }

  public trackByCardId(index, card) {
    return card.id;
  }

  public replay() {
    this.gameManagerService.replay();
  }
}
