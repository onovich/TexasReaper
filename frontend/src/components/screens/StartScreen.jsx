export function StartScreen({ onStart }) {
  return (
    <div className="flex-1 w-full max-w-5xl xl:max-w-6xl flex flex-col items-center justify-center text-center space-y-8 lg:space-y-10 animate-in fade-in duration-1000 py-6 lg:py-10">
      <div className="relative">
        <h1 className="text-6xl sm:text-8xl xl:text-[9rem] 2xl:text-[10rem] font-black italic tracking-tighter text-indigo-500 drop-shadow-2xl">REAPER</h1>
        <div className="absolute -top-4 right-0 sm:-right-10 bg-yellow-400 text-black px-3 sm:px-4 py-1 rounded-full font-black text-xs sm:text-sm rotate-12 border-4 border-neutral-950">VFX PRO</div>
      </div>
      <p className="text-neutral-500 max-w-md xl:max-w-xl text-base sm:text-lg xl:text-xl leading-relaxed">
        注意：每次换牌都会引发 <span className="text-red-400 font-bold">即时通胀涨价</span>。<br />
        合理分配开销，时间耗尽前达标即刻过关。
      </p>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onStart();
        }}
        className="px-10 sm:px-16 xl:px-20 py-4 sm:py-5 xl:py-6 bg-indigo-600 rounded-3xl font-black text-xl sm:text-2xl xl:text-3xl hover:bg-indigo-500 transition-all shadow-[0_0_50px_rgba(79,70,229,0.4)] active:scale-95"
      >
        开启收割之路
      </button>
    </div>
  );
}
