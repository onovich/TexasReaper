import { ANIMATION_MS, COMMUNITY_CARD_COUNT, HAND_CARD_COUNT, MAX_CHARGE } from '../data/gameConfig';
import { createBoardCard } from '../data/cards';

export function createHandCards(status = 'flying') {
  return Array.from({ length: HAND_CARD_COUNT }, () => createBoardCard({ isRevealed: true, status }));
}

export function createCommunityCards(status = 'flying') {
  return Array.from({ length: COMMUNITY_CARD_COUNT }, () => createBoardCard({ isRevealed: false, status }));
}

export function activateBoardCards(cards) {
  return cards.map((item) => ({ ...item, status: 'active' }));
}

export function getVisibleCards(handCards, commCards) {
  return [
    ...handCards.filter((item) => item.isRevealed && item.status !== 'dissolving').map((item) => item.card),
    ...commCards.filter((item) => item.isRevealed && item.status !== 'dissolving').map((item) => item.card),
  ];
}

export function computeRevealCost(level) {
  return 5 + (level - 1) * 2;
}

export function computeHarvestReward(bestHandInfo, level) {
  return bestHandInfo.base + bestHandInfo.mult * level * 10;
}

export function computeNextTargetScore(currentTargetScore, currentLevel) {
  return currentTargetScore + 600 + currentLevel * 200;
}

export function revealNextCommunityCard(commCards) {
  const nextIndex = commCards.findIndex((item) => !item.isRevealed);

  if (nextIndex === -1) {
    return commCards;
  }

  return commCards.map((item, index) => (
    index === nextIndex ? { ...item, isRevealed: true } : item
  ));
}

export function markHandCardsDissolving(handCards) {
  return handCards.map((item) => ({ ...item, status: 'dissolving' }));
}

export function markRevealedCommunityCardsDissolving(commCards) {
  return commCards.map((item) => (item.isRevealed ? { ...item, status: 'dissolving' } : item));
}

export function createRevealedReplacementCard() {
  return createBoardCard({ isRevealed: true, status: 'flying' });
}

export function replaceHandCard(handCards, cardId, replacementCard) {
  return handCards.map((item) => (item.card.id === cardId ? replacementCard : item));
}

export function replaceCommunityCard(commCards, cardId, replacementCard) {
  const nextCommunityCards = commCards.map((item) => (item.card.id === cardId ? replacementCard : item));

  nextCommunityCards.sort((left, right) => left.card.value - right.card.value);

  return nextCommunityCards;
}

export function replaceHarvestedCommunityCards(commCards) {
  return commCards.map((item) => (
    item.isRevealed ? createBoardCard({ isRevealed: false, status: 'flying' }) : item
  ));
}

export function sortCommunityCardsByValue(commCards) {
  return [...commCards].sort((left, right) => left.card.value - right.card.value);
}

export function incrementCharge(charge) {
  return Math.min(MAX_CHARGE, charge + 1);
}

export function getSwapActivationDelay() {
  return ANIMATION_MS.swap;
}
