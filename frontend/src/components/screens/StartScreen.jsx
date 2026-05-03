export function StartScreen({ onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-1000">
      <div className="relative">
        <h1 className="text-9xl font-black italic tracking-tighter text-indigo-500 drop-shadow-2xl">REAPER</h1>
        <div className="absolute -top-4 -right-10 bg-yellow-400 text-black px-4 py-1 rounded-full font-black text-sm rotate-12 border-4 border-neutral-950">VFX PRO</div>
      </div>
      <p className="text-neutral-500 max-w-md text-lg leading-relaxed">
        注意：每次换牌都会引发 <span className="text-red-400 font-bold">即时通胀涨价</span>。<br />
        合理分配开销，时间耗尽前达标即刻过关。
      </p>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onStart();
        }}
        className="px-20 py-6 bg-indigo-600 rounded-3xl font-black text-3xl hover:bg-indigo-500 transition-all shadow-[0_0_50px_rgba(79,70,229,0.4)] active:scale-95"
      >
        开启收割之路
      </button>
    </div>
  );
}
