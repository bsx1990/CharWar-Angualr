export const PLAYGROUND_SIZE = 4;
export const MAX_GENERATED_CARD = 9;
export const ANIMATION_TIME = 100;
export const HOST = 'ws://192.168.12.65:1001';

export const USING_STEP_BY_STEP_ANIMATION = false;

export const ARROW = {
  LEFT_UP: [-1, -1],
  UP: [0, -1],
  RIGHT_UP: [1, -1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  LEFT_DOWN: [-1, 1],
  DOWN: [0, 1],
  RIGHT_DOWN: [1, 1]
};

export const RequestType = {
  getData: 'GetData',
  clickCard: 'ClickCard',
  replay: 'Replay',
  gameModeChanged: 'GameModeChanged'
};

export const RESPONSE_TYPE = {
  playgroundCardsChanged: 'PlaygroundCardsChanged',
  candidateCardsChanged: 'CandidateCardsChanged',
  scoreChanged: 'ScoreChanged',
  bestScoreChanged: 'BestScoreChanged',
  gameStateChanged: 'GameStateChanged',
  playSkill: 'PlaySkill'
};

export const GAME_MODES = {
  peace: 'Peace',
  war: 'War'
};
