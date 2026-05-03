export function GameEffects() {
  return (
    <>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="perlin-dissolve" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.5"
              in="noise"
              result="coloredNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="coloredNoise"
              scale="35"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>
      <style>{`
        @keyframes dissolveOut {
          0% { opacity: 1; filter: url(#perlin-dissolve) blur(0px); transform: scale(1); }
          100% { opacity: 0; filter: url(#perlin-dissolve) blur(4px); transform: scale(1.1) translateY(-10px) rotate(5deg); }
        }
        @keyframes flyIn {
          0% { transform: translateY(100vh) rotate(15deg) scale(0.5); opacity: 0; }
          100% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
        }
        .animate-dissolve { animation: dissolveOut 0.5s forwards ease-out; }
        .animate-fly-in { animation: flyIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </>
  );
}
