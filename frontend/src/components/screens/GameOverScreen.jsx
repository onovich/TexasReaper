export function GameOverScreen({ onRestart }) {
  return (
    <div className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500 py-6">
      <div className="text-7xl">💀</div>
      <h2 className="text-4xl font-black text-red-600 tracking-tighter">挑战失败</h2>
      <div className="bg-emerald-500/10 border-2 border-emerald-500/20 px-10 py-8 rounded-[3rem] shadow-inner">
        <div className="text-[10px] text-emerald-500/70 font-black tracking-widest uppercase mb-2">资产归零或超时</div>
        <div className="text-6xl font-black text-emerald-400 tabular-nums">0</div>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onRestart();
        }}
        className="px-10 py-4 bg-white text-black rounded-3xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        重新挑战
      </button>
    </div>
  );
}
