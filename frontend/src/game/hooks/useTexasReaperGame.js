import { useEffect, useMemo, useRef, useState } from 'react';
import { GAME_STATES, INITIAL_GAME_VALUES, ANIMATION_MS } from '../data/gameConfig';
import { HIGH_CARD_HAND } from '../data/handTypes';
import { getBestHandInfo } from '../logic/handEvaluator';
import {
  activateBoardCards,
  computeHarvestReward,
  computeNextTargetScore,
  computeRevealCost,
  createCommunityCards,
  createHandCards,
  createRevealedReplacementCard,
  getSwapActivationDelay,
  getVisibleCards,
  incrementCharge,
  markHandCardsDissolving,
  markRevealedCommunityCardsDissolving,
  replaceCommunityCard,
  replaceHandCard,
  replaceHarvestedCommunityCards,
  revealNextCommunityCard,
  sortCommunityCardsByValue,
} from '../logic/gameState';

function useTimeoutManager() {
  const timersRef = useRef(new Set());

  const schedule = (callback, delay) => {
    const timerId = window.setTimeout(() => {
      timersRef.current.delete(timerId);
      callback();
    }, delay);

    timersRef.current.add(timerId);

    return timerId;
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current.clear();
    };
  }, []);

  return schedule;
}

export function useTexasReaperGame() {
  const schedule = useTimeoutManager();
  const isMountedRef = useRef(true);

  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [chips, setChips] = useState(INITIAL_GAME_VALUES.chips);
  const [targetScore, setTargetScore] = useState(INITIAL_GAME_VALUES.targetScore);
  const [timeLeft, setTimeLeft] = useState(INITIAL_GAME_VALUES.timeLeft);
  const [level, setLevel] = useState(INITIAL_GAME_VALUES.level);
  const [charge, setCharge] = useState(INITIAL_GAME_VALUES.charge);
  const [handCards, setHandCards] = useState([]);
  const [commCards, setCommCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [handSwapCost, setHandSwapCost] = useState(INITIAL_GAME_VALUES.handSwapCost);
  const [commSwapCost, setCommSwapCost] = useState(INITIAL_GAME_VALUES.commSwapCost);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const revealCost = useMemo(() => computeRevealCost(level), [level]);

  const bestHandInfo = useMemo(() => {
    if (gameState !== GAME_STATES.PLAYING || handCards.length === 0) {
      return HIGH_CARD_HAND;
    }

    return getBestHandInfo(getVisibleCards(handCards, commCards));
  }, [commCards, gameState, handCards]);

  const harvestReward = useMemo(() => computeHarvestReward(bestHandInfo, level), [bestHandInfo, level]);

  const spawnCards = () => {
    setHandCards(createHandCards());
    setCommCards(createCommunityCards());
    setSelectedId(null);

    schedule(() => {
      if (!isMountedRef.current) {
        return;
      }

      setHandCards((currentHandCards) => activateBoardCards(currentHandCards));
      setCommCards((currentCommunityCards) => activateBoardCards(currentCommunityCards));
    }, ANIMATION_MS.spawn);
  };

  const resetGame = () => {
    setChips(INITIAL_GAME_VALUES.chips);
    setTargetScore(INITIAL_GAME_VALUES.targetScore);
    setLevel(INITIAL_GAME_VALUES.level);
    setCharge(INITIAL_GAME_VALUES.charge);
    setTimeLeft(INITIAL_GAME_VALUES.timeLeft);
    setHandSwapCost(INITIAL_GAME_VALUES.handSwapCost);
    setCommSwapCost(INITIAL_GAME_VALUES.commSwapCost);
    setIsHarvesting(false);
    spawnCards();
    setGameState(GAME_STATES.PLAYING);
  };

  const nextLevel = () => {
    setLevel((currentLevel) => currentLevel + 1);
    setTargetScore((currentTargetScore) => computeNextTargetScore(currentTargetScore, level));
    setCharge(INITIAL_GAME_VALUES.charge);
    setTimeLeft(INITIAL_GAME_VALUES.timeLeft);
    setHandSwapCost(INITIAL_GAME_VALUES.handSwapCost);
    setCommSwapCost(INITIAL_GAME_VALUES.commSwapCost);
    setIsHarvesting(false);
    spawnCards();
    setGameState(GAME_STATES.PLAYING);
  };

  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) {
      return;
    }

    if (chips >= targetScore && !isHarvesting) {
      setGameState(GAME_STATES.LEVEL_UP);
    }

    if (chips <= 0) {
      setGameState(GAME_STATES.GAMEOVER);
    }
  }, [chips, gameState, isHarvesting, targetScore]);

  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING || timeLeft <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTimeLeft) => {
        if (currentTimeLeft <= 1) {
          setGameState(GAME_STATES.GAMEOVER);
          return 0;
        }

        return currentTimeLeft - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [gameState, timeLeft]);

  const clearSelection = () => {
    setSelectedId(null);
  };

  const toggleSelectedCard = (cardId) => {
    setSelectedId((currentSelectedId) => (currentSelectedId === cardId ? null : cardId));
  };

  const handleReveal = () => {
    const hasHiddenCard = commCards.some((item) => !item.isRevealed);

    if (!hasHiddenCard || chips < revealCost) {
      return;
    }

    setCommCards((currentCommunityCards) => revealNextCommunityCard(currentCommunityCards));
    setChips((currentChips) => currentChips - revealCost);
    clearSelection();
  };

  const handleHarvest = async () => {
    if (isHarvesting) {
      return;
    }

    setIsHarvesting(true);
    setCharge((currentCharge) => incrementCharge(currentCharge));
    setHandCards((currentHandCards) => markHandCardsDissolving(currentHandCards));
    setCommCards((currentCommunityCards) => markRevealedCommunityCardsDissolving(currentCommunityCards));

    await new Promise((resolve) => {
      schedule(resolve, ANIMATION_MS.harvest);
    });

    if (!isMountedRef.current) {
      return;
    }

    const nextChips = chips + harvestReward;
    setChips(nextChips);

    if (nextChips >= targetScore) {
      setIsHarvesting(false);
      return;
    }

    setHandCards(createHandCards());
    setCommCards(replaceHarvestedCommunityCards(commCards));
    clearSelection();

    schedule(() => {
      if (!isMountedRef.current) {
        return;
      }

      setHandCards((currentHandCards) => currentHandCards.map((item) => (
        item.status === 'flying' ? { ...item, status: 'active' } : item
      )));
      setCommCards((currentCommunityCards) => currentCommunityCards.map((item) => (
        item.status === 'flying' ? { ...item, status: 'active' } : item
      )));
      setIsHarvesting(false);
    }, ANIMATION_MS.harvest);
  };

  const handleSwap = (type, cardId) => {
    const cost = type === 'hand' ? handSwapCost : commSwapCost;

    if (chips < cost || isHarvesting) {
      return;
    }

    const replacementCard = createRevealedReplacementCard();

    setChips((currentChips) => currentChips - cost);
    clearSelection();

    if (type === 'hand') {
      setHandSwapCost((currentCost) => currentCost + 1);
      setHandCards((currentHandCards) => replaceHandCard(currentHandCards, cardId, replacementCard));
    } else {
      setCommSwapCost((currentCost) => currentCost + 3);
      setCommCards((currentCommunityCards) => replaceCommunityCard(currentCommunityCards, cardId, replacementCard));
    }

    schedule(() => {
      if (!isMountedRef.current) {
        return;
      }

      if (type === 'hand') {
        setHandCards((currentHandCards) => currentHandCards.map((item) => (
          item.card.id === replacementCard.card.id ? { ...item, status: 'active' } : item
        )));
        return;
      }

      setCommCards((currentCommunityCards) => currentCommunityCards.map((item) => (
        item.card.id === replacementCard.card.id ? { ...item, status: 'active' } : item
      )));
    }, getSwapActivationDelay());
  };

  const handleSkillSort = () => {
    if (charge < 10 || isHarvesting) {
      return;
    }

    setCommCards((currentCommunityCards) => sortCommunityCardsByValue(currentCommunityCards));
    setCharge(0);
    clearSelection();
  };

  return {
    state: {
      bestHandInfo,
      charge,
      chips,
      commCards,
      commSwapCost,
      gameState,
      handCards,
      handSwapCost,
      harvestReward,
      isHarvesting,
      level,
      revealCost,
      selectedId,
      targetScore,
      timeLeft,
    },
    actions: {
      clearSelection,
      handleHarvest,
      handleReveal,
      handleSkillSort,
      handleSwap,
      nextLevel,
      resetGame,
      toggleSelectedCard,
    },
  };
}
