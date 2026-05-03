export function LevelUpScreen({ level, onNextLevel }) {
  return (
    <div className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500 py-6">
      <div className="text-7xl">🚀</div>
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-emerald-500 tracking-tighter">本关目标达成！</h2>
        <p className="text-base text-neutral-400 font-bold uppercase tracking-widest">已重置各项物价</p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onNextLevel();
        }}
        className="px-10 py-4 bg-white text-black rounded-3xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
      >
        进入 Level {level + 1}
      </button>
    </div>
  );
}
