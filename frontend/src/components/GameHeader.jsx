function formatTime(timeLeft) {
  return `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
}

export function GameHeader({ chips, targetScore, timeLeft }) {
  return (
    <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl grid grid-cols-3 gap-2 sm:gap-4 mb-2 sm:mb-4 shrink-0">
      <div className="bg-neutral-900 border border-neutral-800 p-2 sm:p-4 rounded-xl sm:rounded-3xl shadow-xl border-b-2 border-yellow-500/20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="text-[9px] sm:text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-0.5 sm:mb-1 z-10 relative">当前资产</div>
        <div className={`text-xl sm:text-3xl xl:text-4xl font-black z-10 relative leading-none ${chips < 50 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
          🪙 {chips}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-2 sm:p-4 rounded-xl sm:rounded-3xl shadow-xl flex flex-col items-center justify-center">
        <div className="text-[9px] sm:text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-0.5 sm:mb-1">生存倒计时</div>
        <div className={`text-2xl sm:text-4xl xl:text-[2.8rem] font-black tabular-nums leading-none ${timeLeft < 20 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-2 sm:p-4 rounded-xl sm:rounded-3xl shadow-xl flex flex-col items-center justify-center border-b-2 border-indigo-500/20">
        <div className="text-[9px] sm:text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-0.5 sm:mb-1">本关目标</div>
        <div className="text-xl sm:text-3xl xl:text-4xl font-black font-mono tracking-tighter text-indigo-400 leading-none">🎯 {targetScore}</div>
      </div>
    </div>
  );
}
