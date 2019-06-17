import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlaygroundComponent } from './game-playground.component';

describe('GamePlaygroundComponent', () => {
  let component: GamePlaygroundComponent;
  let fixture: ComponentFixture<GamePlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
