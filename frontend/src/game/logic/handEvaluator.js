import { RANK_VALUES } from '../data/cards';
import { findHandType, HIGH_CARD_HAND } from '../data/handTypes';

export function getBestHandInfo(visibleCards) {
  if (visibleCards.length === 0) {
    return HIGH_CARD_HAND;
  }

  const rankCounts = {};
  const suitCounts = {};

  visibleCards.forEach((card) => {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    suitCounts[card.suit.name] = (suitCounts[card.suit.name] || 0) + 1;
  });

  const counts = Object.values(rankCounts).sort((left, right) => right - left);
  const hasFlush = Object.values(suitCounts).some((count) => count >= 5);
  const sortedRanks = [...new Set(visibleCards.map((card) => RANK_VALUES[card.rank]))].sort((left, right) => left - right);

  let hasStraight = false;

  if (sortedRanks.length >= 5) {
    for (let index = 0; index <= sortedRanks.length - 5; index += 1) {
      if (sortedRanks[index + 4] - sortedRanks[index] === 4) {
        hasStraight = true;
      }
    }

    if (!hasStraight && [14, 2, 3, 4, 5].every((value) => sortedRanks.includes(value))) {
      hasStraight = true;
    }
  }

  if (hasFlush && hasStraight) return findHandType('STRAIGHT_FLUSH');
  if (counts[0] >= 4) return findHandType('FOUR_KIND');
  if (counts[0] === 3 && counts.length >= 2 && counts[1] >= 2) return findHandType('FULL_HOUSE');
  if (hasFlush) return findHandType('FLUSH');
  if (hasStraight) return findHandType('STRAIGHT');
  if (counts[0] === 3) return findHandType('THREE_KIND');
  if (counts[0] === 2 && counts.length >= 2 && counts[1] >= 2) return findHandType('TWO_PAIR');
  if (counts[0] === 2) return findHandType('PAIR');

  return findHandType('HIGH_CARD');
}
