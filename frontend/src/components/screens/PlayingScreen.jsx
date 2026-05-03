import { GameCard } from '../GameCard';

export function PlayingScreen({
  bestHandInfo,
  chips,
  charge,
  commCards,
  commSwapCost,
  handCards,
  handSwapCost,
  harvestReward,
  isHarvesting,
  level,
  revealCost,
  selectedId,
  onHarvest,
  onReveal,
  onSkillSort,
  onSwap,
  onToggleSelectedCard,
}) {
  return (
    <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl space-y-8 lg:space-y-10 xl:space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-center min-h-[88px] lg:min-h-[96px]">
        <div className="w-full max-w-2xl xl:max-w-4xl bg-neutral-900/90 border-2 border-indigo-500/20 px-5 sm:px-8 xl:px-12 py-4 xl:py-5 rounded-[2rem] xl:rounded-[2.5rem] flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6 xl:gap-10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">系统识别当前组合</span>
            <span className="text-2xl sm:text-4xl xl:text-5xl font-black text-white">{bestHandInfo.name}</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">收割资产预估</span>
            <span className="text-2xl sm:text-3xl xl:text-4xl font-black text-emerald-400">+{harvestReward}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 sm:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 min-h-[144px] xl:min-h-[180px] 2xl:min-h-[212px]">
          {commCards.map((item) => {
            const isSelected = selectedId === item.card.id;
            const canSelect = item.isRevealed && !isHarvesting;

            return (
              <GameCard
                key={item.card.id}
                item={item}
                isSelected={isSelected}
                canSelect={canSelect}
                onSelect={(event) => {
                  event.stopPropagation();
                  if (canSelect) {
                    onToggleSelectedCard(item.card.id);
                  }
                }}
                onSwap={(event) => {
                  event.stopPropagation();
                  onSwap('comm', item.card.id);
                }}
                swapCost={commSwapCost}
                showSwapButton={isSelected && item.isRevealed}
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-5 sm:gap-8 xl:gap-12 2xl:gap-16 min-h-[144px] xl:min-h-[180px] 2xl:min-h-[212px]">
        {handCards.map((item) => {
          const isSelected = selectedId === item.card.id;
          const canSelect = !isHarvesting;

          return (
            <GameCard
              key={item.card.id}
              item={item}
              isSelected={isSelected}
              canSelect={canSelect}
              onSelect={(event) => {
                event.stopPropagation();
                if (canSelect) {
                  onToggleSelectedCard(item.card.id);
                }
              }}
              onSwap={(event) => {
                event.stopPropagation();
                onSwap('hand', item.card.id);
              }}
              swapCost={handSwapCost}
              showSwapButton={isSelected}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-5 lg:gap-6 pt-2 lg:pt-4">
        <div className="w-full max-w-3xl xl:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onReveal();
            }}
            disabled={commCards.every((item) => item.isRevealed) || chips < revealCost || isHarvesting}
            className="py-7 sm:py-8 xl:py-10 rounded-[2rem] xl:rounded-[3rem] font-black text-2xl sm:text-3xl xl:text-4xl bg-white text-black border-b-8 border-neutral-300 hover:bg-neutral-100 transition-all disabled:opacity-50 active:scale-95 shadow-2xl"
          >
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1 block">从左至右揭开</span>
            翻牌 -{revealCost}
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onHarvest();
            }}
            disabled={isHarvesting}
            className="py-7 sm:py-8 xl:py-10 bg-emerald-600 rounded-[2rem] xl:rounded-[3rem] font-black text-2xl sm:text-3xl xl:text-4xl text-white border-b-8 border-emerald-800 hover:bg-emerald-500 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-50 active:scale-95 flex flex-col items-center justify-center"
          >
            <span className="text-[10px] uppercase tracking-widest opacity-80 mb-1">执行场面收割</span>
            收割：{bestHandInfo.name}
          </button>
        </div>

        <div className="w-full max-w-3xl xl:max-w-5xl flex flex-col md:flex-row gap-4 xl:gap-6">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onSkillSort();
            }}
            disabled={charge < 10 || isHarvesting}
            className={`flex-[3] py-4 xl:py-5 rounded-2xl xl:rounded-3xl font-black text-sm xl:text-base transition-all border-b-4 flex flex-col sm:flex-row items-center justify-center gap-4 xl:gap-6
              ${charge < 10 ? 'bg-neutral-900 border-neutral-950 text-neutral-700' : 'bg-indigo-600 border-indigo-800 text-white shadow-lg animate-pulse'}`}
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3.5 h-3.5 rounded-full transition-colors duration-500 ${index < charge ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-neutral-800'}`}
                />
              ))}
            </div>
            <span>SORT 技能 {charge === 10 ? '已就绪' : `(${charge}/10)`}</span>
          </button>
          <div className="flex-1 min-h-[84px] bg-neutral-900 border border-neutral-800 rounded-2xl xl:rounded-3xl flex flex-col items-center justify-center uppercase font-black text-xs xl:text-sm text-indigo-400">
            Level {level}
          </div>
        </div>
      </div>
    </div>
  );
}
