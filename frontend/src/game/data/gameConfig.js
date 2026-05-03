export const GAME_STATES = {
  START: 'START',
  PLAYING: 'PLAYING',
  LEVEL_UP: 'LEVEL_UP',
  GAMEOVER: 'GAMEOVER',
};

export const INITIAL_GAME_VALUES = {
  chips: 150,
  targetScore: 500,
  timeLeft: 120,
  level: 1,
  charge: 0,
  handSwapCost: 3,
  commSwapCost: 12,
};

export const HAND_CARD_COUNT = 2;
export const COMMUNITY_CARD_COUNT = 5;
export const MAX_CHARGE = 10;

export const ANIMATION_MS = {
  spawn: 600,
  harvest: 500,
  swap: 500,
};
