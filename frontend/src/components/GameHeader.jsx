function formatTime(timeLeft) {
  return `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
}

export function GameHeader({ chips, targetScore, timeLeft }) {
  return (
    <div className="w-full max-w-4xl lg:max-w-6xl 2xl:max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 mb-6 lg:mb-10">
      <div className="bg-neutral-900 border border-neutral-800 p-4 lg:p-5 rounded-3xl shadow-xl border-b-2 border-yellow-500/20 relative overflow-hidden min-h-[112px] lg:min-h-[132px]">
        <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1 z-10 relative">当前资产</div>
        <div className={`text-3xl sm:text-4xl xl:text-5xl font-black z-10 relative ${chips < 50 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
          🪙 {chips}
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full -mr-8 -mt-8 blur-2xl" />
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-4 lg:p-5 rounded-3xl shadow-xl flex flex-col items-center justify-center min-h-[112px] lg:min-h-[132px]">
        <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">生存倒计时</div>
        <div className={`text-4xl sm:text-5xl xl:text-6xl font-black tabular-nums ${timeLeft < 20 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-4 lg:p-5 rounded-3xl shadow-xl flex flex-col items-start sm:items-end justify-center border-b-2 border-indigo-500/20 min-h-[112px] lg:min-h-[132px]">
        <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">本关目标</div>
        <div className="text-3xl sm:text-4xl xl:text-5xl font-black font-mono tracking-tighter text-indigo-400">🎯 {targetScore}</div>
      </div>
    </div>
  );
}
