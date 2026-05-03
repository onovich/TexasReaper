export function LevelUpScreen({ level, onNextLevel }) {
  return (
    <div className="flex-1 w-full max-w-5xl xl:max-w-6xl flex flex-col items-center justify-center text-center space-y-8 lg:space-y-10 animate-in zoom-in duration-500 py-6 lg:py-10">
      <div className="text-7xl sm:text-8xl xl:text-9xl">🚀</div>
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-black text-emerald-500 tracking-tighter">本关目标达成！</h2>
        <p className="text-base sm:text-lg xl:text-xl text-neutral-400 font-bold uppercase tracking-widest">已重置各项物价</p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onNextLevel();
        }}
        className="px-10 sm:px-16 xl:px-20 py-4 sm:py-5 xl:py-6 bg-white text-black rounded-3xl font-black text-xl sm:text-2xl xl:text-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
      >
        进入 Level {level + 1}
      </button>
    </div>
  );
}
