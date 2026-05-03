export const SUITS = {
  HEARTS: { name: 'hearts', color: 'text-red-500', emoji: '❤️' },
  DIAMONDS: { name: 'diamonds', color: 'text-blue-400', emoji: '♦️' },
  CLUBS: { name: 'clubs', color: 'text-emerald-500', emoji: '♣️' },
  SPADES: { name: 'spades', color: 'text-slate-400', emoji: '♠️' },
};

export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const suitKeys = Object.keys(SUITS);

export function createCard() {
  const suit = SUITS[suitKeys[Math.floor(Math.random() * suitKeys.length)]];
  const rank = RANKS[Math.floor(Math.random() * RANKS.length)];

  return {
    suit,
    rank,
    value: RANK_VALUES[rank],
    id: Math.random().toString(36).substr(2, 9),
  };
}

export function createBoardCard({ isRevealed, status }) {
  return {
    card: createCard(),
    isRevealed,
    status,
  };
}
