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
    <div className="w-full max-w-5xl xl:max-w-5xl 2xl:max-w-6xl h-full min-h-0 flex flex-col justify-between gap-4 lg:gap-5 animate-in fade-in duration-500">
      <div className="flex justify-center min-h-[72px] lg:min-h-[80px] shrink-0">
        <div className="w-full max-w-2xl xl:max-w-3xl bg-neutral-900/90 border-2 border-indigo-500/20 px-4 sm:px-6 xl:px-8 py-3 xl:py-4 rounded-[1.6rem] xl:rounded-[2rem] flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-5 xl:gap-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">系统识别当前组合</span>
            <span className="text-2xl sm:text-3xl xl:text-[2.25rem] font-black text-white leading-none">{bestHandInfo.name}</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">收割资产预估</span>
            <span className="text-2xl sm:text-3xl xl:text-[2.1rem] font-black text-emerald-400 leading-none">+{harvestReward}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-3 lg:gap-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-5 xl:gap-6 min-h-[144px] xl:min-h-[156px] 2xl:min-h-[170px] shrink-0">
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
        <div className="flex items-center justify-center gap-5 sm:gap-8 xl:gap-10 2xl:gap-12 min-h-[144px] xl:min-h-[156px] 2xl:min-h-[170px] shrink-0">
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
      </div>

      <div className="flex flex-col items-center gap-3 lg:gap-4 pt-1 shrink-0">
        <div className="w-full max-w-3xl xl:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onReveal();
            }}
            disabled={commCards.every((item) => item.isRevealed) || chips < revealCost || isHarvesting}
            className="py-5 sm:py-6 xl:py-7 rounded-[1.75rem] xl:rounded-[2.25rem] font-black text-xl sm:text-2xl xl:text-[1.9rem] bg-white text-black border-b-8 border-neutral-300 hover:bg-neutral-100 transition-all disabled:opacity-50 active:scale-95 shadow-2xl leading-tight"
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
            className="py-5 sm:py-6 xl:py-7 bg-emerald-600 rounded-[1.75rem] xl:rounded-[2.25rem] font-black text-xl sm:text-2xl xl:text-[1.9rem] text-white border-b-8 border-emerald-800 hover:bg-emerald-500 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-50 active:scale-95 flex flex-col items-center justify-center leading-tight"
          >
            <span className="text-[10px] uppercase tracking-widest opacity-80 mb-1">执行场面收割</span>
            收割：{bestHandInfo.name}
          </button>
        </div>

        <div className="w-full max-w-3xl xl:max-w-4xl flex flex-col md:flex-row gap-3 lg:gap-4">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onSkillSort();
            }}
            disabled={charge < 10 || isHarvesting}
            className={`flex-[3] py-3 xl:py-4 rounded-2xl xl:rounded-3xl font-black text-sm xl:text-[0.95rem] transition-all border-b-4 flex flex-col sm:flex-row items-center justify-center gap-3 xl:gap-4
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
          <div className="flex-1 min-h-[72px] bg-neutral-900 border border-neutral-800 rounded-2xl xl:rounded-3xl flex flex-col items-center justify-center uppercase font-black text-xs xl:text-sm text-indigo-400">
            Level {level}
          </div>
        </div>
      </div>
    </div>
  );
}
