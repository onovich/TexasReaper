export function LevelUpScreen({ level, onNextLevel }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500">
      <div className="text-9xl">🚀</div>
      <div className="space-y-4">
        <h2 className="text-7xl font-black text-emerald-500 tracking-tighter">本关目标达成！</h2>
        <p className="text-neutral-400 font-bold uppercase tracking-widest text-xl">已重置各项物价</p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onNextLevel();
        }}
        className="px-20 py-6 bg-white text-black rounded-3xl font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
      >
        进入 Level {level + 1}
      </button>
    </div>
  );
}
