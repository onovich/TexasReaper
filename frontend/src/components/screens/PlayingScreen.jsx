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
    <div className="w-full max-w-5xl flex-1 flex flex-col justify-between gap-3 animate-in fade-in duration-500 pb-2 min-h-0">
      <div className="flex justify-center shrink-0">
        <div className="w-full max-w-2xl bg-neutral-900/90 border-2 border-indigo-500/20 px-3 py-2 rounded-[1.2rem] flex flex-row items-center justify-between gap-2 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col flex-1 items-center text-center">
            <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">系统识别当前组合</span>
            <span className="text-xl font-black text-white leading-none mt-1 truncate">{bestHandInfo.name}</span>
          </div>
          <div className="hidden w-px h-8 bg-white/10" />
          <div className="flex flex-col flex-1 items-center text-center">
            <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">收割资产预估</span>
            <span className="text-xl font-black text-emerald-400 leading-none mt-1">+{harvestReward}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-3">
        <div className="flex items-center justify-center gap-1.5 shrink-0">
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
        <div className="flex items-center justify-center gap-4 shrink-0 border-t border-white/5 pt-3 relative w-full">
          <div className="absolute -top-3 text-[8px] text-white/20">您的手牌</div>
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

      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="w-full max-w-3xl grid grid-cols-2 gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onReveal();
            }}
            disabled={commCards.every((item) => item.isRevealed) || chips < revealCost || isHarvesting}
            className="py-3 rounded-[1.25rem] font-black text-sm bg-white text-black border-b-[4px] border-neutral-300 hover:bg-neutral-100 transition-all disabled:opacity-50 active:scale-95 shadow-lg leading-tight"
          >
            <span className="text-[8px] uppercase tracking-widest opacity-60 mb-0.5 block">紧逼 / 翻牌</span>
            -{revealCost} 筹码
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onHarvest();
            }}
            disabled={isHarvesting}
            className="py-3 bg-emerald-600 rounded-[1.25rem] font-black text-sm text-white border-b-[4px] border-emerald-800 hover:bg-emerald-500 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] disabled:opacity-50 active:scale-95 flex flex-col items-center justify-center leading-tight truncate px-1"
          >
            <span className="text-[8px] uppercase tracking-widest opacity-80 mb-0.5">收割场面</span>
            {bestHandInfo.name}
          </button>
        </div>

        <div className="w-full max-w-3xl flex flex-row gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onSkillSort();
            }}
            disabled={charge < 10 || isHarvesting}
            className={`flex-[3] py-2.5 rounded-xl font-black text-[10px] transition-all border-b-[3px] flex flex-row items-center justify-center gap-1.5
              ${charge < 10 ? 'bg-neutral-900 border-neutral-950 text-neutral-700' : 'bg-indigo-600 border-indigo-800 text-white shadow-lg animate-pulse'}`}
          >
            <div className="flex flex-wrap items-center justify-center gap-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${index < charge ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-neutral-800'}`}
                />
              ))}
            </div>
            <span>SORT {charge === 10 ? '已就绪' : `(${charge}/10)`}</span>
          </button>
          <div className="flex-1 min-h-[36px] bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col items-center justify-center uppercase font-black text-[10px] text-indigo-400">
            Lv.{level}
          </div>
        </div>
      </div>
    </div>
  );
}
