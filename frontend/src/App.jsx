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
    <div className="fixed inset-0 w-full h-[100dvh] bg-black desktop-emulator overflow-hidden flex justify-center items-center">
      <div
        className="w-full max-w-[440px] h-[100dvh] sm:h-[92dvh] sm:max-h-[920px] sm:rounded-[2.5rem] sm:border-[8px] sm:border-neutral-900 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-neutral-950 text-white font-sans flex flex-col items-center px-2 py-2 select-none overflow-x-hidden overflow-y-auto relative"
        onClick={actions.clearSelection}
      >
        <GameEffects />
        <GameHeader chips={state.chips} targetScore={state.targetScore} timeLeft={state.timeLeft} />
        <div className="w-full flex-1 flex flex-col items-center min-h-0">
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
     </div>
    </div>
  );
}