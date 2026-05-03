function formatTime(timeLeft) {
  return `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
}

export function GameHeader({ chips, targetScore, timeLeft }) {
  return (
    <div className="w-full max-w-4xl grid grid-cols-3 gap-2 mb-2 shrink-0">
      <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-xl shadow-xl border-b-2 border-yellow-500/20 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="text-[9px] text-neutral-500 font-black uppercase tracking-widest mb-0.5 z-10 relative">当前资产</div>
        <div className={`text-xl font-black z-10 relative leading-none ${chips < 50 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
          🪙 {chips}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-xl shadow-xl flex flex-col items-center justify-center">
        <div className="text-[9px] text-neutral-500 font-black uppercase tracking-widest mb-0.5">生存倒计时</div>
        <div className={`text-2xl font-black tabular-nums leading-none ${timeLeft < 20 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-xl shadow-xl flex flex-col items-center justify-center border-b-2 border-indigo-500/20">
        <div className="text-[9px] text-neutral-500 font-black uppercase tracking-widest mb-0.5">本关目标</div>
        <div className="text-xl font-black font-mono tracking-tighter text-indigo-400 leading-none">🎯 {targetScore}</div>
      </div>
    </div>
  );
}
