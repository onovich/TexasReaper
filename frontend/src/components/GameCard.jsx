export function GameCard({ item, isSelected, onSelect, onSwap, swapCost, canSelect, showSwapButton }) {
  return (
    <div
      key={item.card.id}
      onClick={onSelect}
      className={`relative transition-all duration-300 ease-out transform cursor-pointer
        ${isSelected ? '-translate-y-8 z-30' : 'hover:-translate-y-1 z-10'}
        ${item.status === 'dissolving' ? 'animate-dissolve pointer-events-none' : ''}
        ${item.status === 'flying' ? 'animate-fly-in pointer-events-none' : ''}
        ${!canSelect ? 'cursor-default' : ''}`}
    >
      <div
        className={`w-16 h-24 sm:w-24 sm:h-36 rounded-2xl flex flex-col items-center justify-between p-2 border-2 shadow-xl transition-all duration-300
          ${item.isRevealed
            ? (isSelected ? 'bg-indigo-50 border-indigo-500 shadow-[0_20px_40px_rgba(79,70,229,0.4)]' : 'bg-white border-neutral-200')
            : 'bg-neutral-900 border-neutral-800'}`}
      >
        {item.isRevealed ? (
          <>
            <div className={`self-start font-black text-xs sm:text-lg ${item.card.suit.color}`}>{item.card.rank}</div>
            <div className="text-3xl sm:text-5xl">{item.card.suit.emoji}</div>
            <div className={`self-end font-black text-xs sm:text-lg rotate-180 ${item.card.suit.color}`}>{item.card.rank}</div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10">
            <span className="text-4xl text-neutral-700">?</span>
          </div>
        )}
      </div>
      {showSwapButton ? (
        <button
          onClick={onSwap}
          className="absolute -top-4 -right-4 bg-yellow-400 text-black font-black px-3 py-1 rounded-xl text-[10px] shadow-2xl z-40 border-2 border-black transition-transform hover:scale-110 active:scale-90"
        >
          ♻️ {swapCost}
        </button>
      ) : null}
    </div>
  );
}
