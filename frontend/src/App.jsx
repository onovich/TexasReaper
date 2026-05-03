import { GameEffects } from './components/GameEffects';
import { GameHeader } from './components/GameHeader';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { LevelUpScreen } from './components/screens/LevelUpScreen';
import { PlayingScreen } from './components/screens/PlayingScreen';
import { StartScreen } from './components/screens/StartScreen';
import { useTexasReaperGame } from './game/hooks/useTexasReaperGame';
import { GAME_STATES } from './game/data/gameConfig';

export default function App() {
  const { state, actions } = useTexasReaperGame();

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col items-center px-4 py-4 lg:px-8 xl:px-10 2xl:px-12 select-none overflow-hidden"
      onClick={actions.clearSelection}
    >
      <GameEffects />
      <GameHeader chips={state.chips} targetScore={state.targetScore} timeLeft={state.timeLeft} />

      {state.gameState === GAME_STATES.START ? (
        <StartScreen onStart={actions.resetGame} />
      ) : null}

      {state.gameState === GAME_STATES.PLAYING ? (
        <PlayingScreen
          bestHandInfo={state.bestHandInfo}
          chips={state.chips}
          charge={state.charge}
          commCards={state.commCards}
          commSwapCost={state.commSwapCost}
          handCards={state.handCards}
          handSwapCost={state.handSwapCost}
          harvestReward={state.harvestReward}
          isHarvesting={state.isHarvesting}
          level={state.level}
          revealCost={state.revealCost}
          selectedId={state.selectedId}
          onHarvest={actions.handleHarvest}
          onReveal={actions.handleReveal}
          onSkillSort={actions.handleSkillSort}
          onSwap={actions.handleSwap}
          onToggleSelectedCard={actions.toggleSelectedCard}
        />
      ) : null}

      {state.gameState === GAME_STATES.LEVEL_UP ? (
        <LevelUpScreen level={state.level} onNextLevel={actions.nextLevel} />
      ) : null}

      {state.gameState === GAME_STATES.GAMEOVER ? (
        <GameOverScreen onRestart={actions.resetGame} />
      ) : null}
    </div>
  );
}