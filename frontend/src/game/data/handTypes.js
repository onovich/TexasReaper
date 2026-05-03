export const HAND_TYPES = [
  { id: 'ROYAL_FLUSH', name: '皇家同花顺', mult: 100, base: 1200 },
  { id: 'STRAIGHT_FLUSH', name: '同花顺', mult: 50, base: 700 },
  { id: 'FOUR_KIND', name: '四条', mult: 30, base: 500 },
  { id: 'FULL_HOUSE', name: '葫芦', mult: 15, base: 250 },
  { id: 'FLUSH', name: '同花', mult: 10, base: 150 },
  { id: 'STRAIGHT', name: '顺子', mult: 8, base: 120 },
  { id: 'THREE_KIND', name: '三条', mult: 5, base: 80 },
  { id: 'TWO_PAIR', name: '两对', mult: 3, base: 50 },
  { id: 'PAIR', name: '一对', mult: 1, base: 20 },
  { id: 'HIGH_CARD', name: '高牌', mult: 0, base: 5 },
];

export const HIGH_CARD_HAND = HAND_TYPES[HAND_TYPES.length - 1];

export function findHandType(id) {
  return HAND_TYPES.find((handType) => handType.id === id);
}
