function formatTime(timeLeft) {
  return `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
}

export function GameHeader({ chips, targetScore, timeLeft }) {
  return (
    <div className="w-full max-w-4xl grid grid-cols-3 gap-4 mb-8">
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-xl border-b-2 border-yellow-500/20 relative overflow-hidden">
        <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1 z-10 relative">当前资产</div>
        <div className={`text-4xl font-black z-10 relative ${chips < 50 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
          🪙 {chips}
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full -mr-8 -mt-8 blur-2xl" />
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-xl flex flex-col items-center justify-center">
        <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">生存倒计时</div>
        <div className={`text-5xl font-black tabular-nums ${timeLeft < 20 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-xl flex flex-col items-end justify-center border-b-2 border-indigo-500/20">
        <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">本关目标</div>
        <div className="text-4xl font-black font-mono tracking-tighter text-indigo-400">🎯 {targetScore}</div>
      </div>
    </div>
  );
}
