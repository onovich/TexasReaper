import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- 扑克基础配置 ---
const SUITS = {
  HEARTS: { name: 'hearts', color: 'text-red-500', emoji: '❤️' },
  DIAMONDS: { name: 'diamonds', color: 'text-blue-400', emoji: '♦️' },
  CLUBS: { name: 'clubs', color: 'text-emerald-500', emoji: '♣️' },
  SPADES: { name: 'spades', color: 'text-slate-400', emoji: '♠️' },
};

const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const RANK_VALUES = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

const HAND_TYPES = [
  { id: 'ROYAL_FLUSH', name: '皇家同花顺', mult: 100, base: 1200 },
  { id: 'STRAIGHT_FLUSH', name: '同花顺', mult: 50, base: 700 },
  { id: 'FOUR_KIND', name: '四条', mult: 30, base: 500 },
  { id: 'FULL_HOUSE', name: '葫芦', mult: 15, base: 250 },
  { id: 'FLUSH', name: '同花', mult: 10, base: 150 },
  { id: 'STRAIGHT', name: '顺子', mult: 8, base: 120 },
  { id: 'THREE_KIND', name: '三条', mult: 5, base: 80 },
  { id: 'TWO_PAIR', name: '两对', mult: 3, base: 50 },
  { id: 'PAIR', name: '一对', mult: 1, base: 20 },
  { id: 'HIGH_CARD', name: '高牌', mult: 0, base: 5 },
];

const createCard = () => {
  const suitKeys = Object.keys(SUITS);
  const suit = SUITS[suitKeys[Math.floor(Math.random() * suitKeys.length)]];
  const rank = RANKS[Math.floor(Math.random() * RANKS.length)];
  return {
    suit,
    rank,
    value: RANK_VALUES[rank],
    id: Math.random().toString(36).substr(2, 9),
  };
};

export default function App() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, LEVEL_UP, GAMEOVER
  const [chips, setChips] = useState(150);
  const [targetScore, setTargetScore] = useState(500);
  const [timeLeft, setTimeLeft] = useState(120);
  const [level, setLevel] = useState(1);
  const [charge, setCharge] = useState(0);
  
  const [handCards, setHandCards] = useState([]); 
  const [commCards, setCommCards] = useState([]); 
  const [selectedId, setSelectedId] = useState(null);
  const [isHarvesting, setIsHarvesting] = useState(false);

  // 独立状态：每次换牌都会涨价
  const [handSwapCost, setHandSwapCost] = useState(3);
  const [commSwapCost, setCommSwapCost] = useState(12);

  // 揭牌依然随关卡涨价
  const revealCost = useMemo(() => 5 + (level - 1) * 2, [level]);

  // 发牌与飞入动画挂载
  const spawnCards = () => {
    const h = [
      { card: createCard(), isRevealed: true, status: 'flying' }, 
      { card: createCard(), isRevealed: true, status: 'flying' }
    ];
    const c = Array(5).fill(0).map(() => ({ 
      card: createCard(), 
      isRevealed: false, 
      status: 'flying' 
    }));
    
    setHandCards(h);
    setCommCards(c);
    setSelectedId(null);

    setTimeout(() => {
      setHandCards(prev => prev.map(item => ({ ...item, status: 'active' })));
      setCommCards(prev => prev.map(item => ({ ...item, status: 'active' })));
    }, 600);
  };

  // 重置新游戏
  const resetGame = () => {
    setChips(150);
    setTargetScore(500);
    setLevel(1);
    setCharge(0);
    setTimeLeft(120);
    setHandSwapCost(3);  // 重置换牌价格
    setCommSwapCost(12); // 重置换牌价格
    spawnCards();
    setGameState('PLAYING');
  };

  // 进入下一关
  const nextLevel = () => {
    setLevel(l => l + 1);
    setTargetScore(prev => prev + 600 + (level * 200));
    setCharge(0); 
    setTimeLeft(120); 
    setHandSwapCost(3);  // 关卡刷新时，物价重置
    setCommSwapCost(12); 
    spawnCards(); 
    setGameState('PLAYING');
  };

  // 核心胜负判定
  useEffect(() => {
    if (gameState === 'PLAYING') {
      if (chips >= targetScore && !isHarvesting) {
        setGameState('LEVEL_UP');
      }
      if (chips <= 0) {
        setGameState('GAMEOVER');
      }
    }
  }, [chips, targetScore, gameState, isHarvesting]);

  // 倒计时
  useEffect(() => {
    let timer;
    if (gameState === 'PLAYING' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('GAMEOVER'); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // 场面最优牌型识别
  const bestHandInfo = useMemo(() => {
    if (gameState !== 'PLAYING' || handCards.length === 0) return HAND_TYPES[HAND_TYPES.length - 1];
    
    const visibleCards = [
      ...handCards.filter(c => c.isRevealed && c.status !== 'dissolving').map(c => c.card),
      ...commCards.filter(c => c.isRevealed && c.status !== 'dissolving').map(c => c.card)
    ];

    if (visibleCards.length === 0) return HAND_TYPES[HAND_TYPES.length - 1];

    const rankCounts = {};
    const suitCounts = {};
    visibleCards.forEach(c => {
      rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1;
      suitCounts[c.suit.name] = (suitCounts[c.suit.name] || 0) + 1;
    });

    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    const hasFlush = Object.values(suitCounts).some(s => s >= 5);
    const sortedRanks = [...new Set(visibleCards.map(c => RANK_VALUES[c.rank]))].sort((a, b) => a - b);
    
    let hasStraight = false;
    if (sortedRanks.length >= 5) {
      for (let i = 0; i <= sortedRanks.length - 5; i++) {
        if (sortedRanks[i+4] - sortedRanks[i] === 4) hasStraight = true;
      }
      if (!hasStraight && [14, 2, 3, 4, 5].every(v => sortedRanks.includes(v))) hasStraight = true;
    }

    if (hasFlush && hasStraight) return HAND_TYPES.find(h => h.id === 'STRAIGHT_FLUSH');
    if (counts[0] >= 4) return HAND_TYPES.find(h => h.id === 'FOUR_KIND');
    if (counts[0] === 3 && counts.length >= 2 && counts[1] >= 2) return HAND_TYPES.find(h => h.id === 'FULL_HOUSE');
    if (hasFlush) return HAND_TYPES.find(h => h.id === 'FLUSH');
    if (hasStraight) return HAND_TYPES.find(h => h.id === 'STRAIGHT');
    if (counts[0] === 3) return HAND_TYPES.find(h => h.id === 'THREE_KIND');
    if (counts[0] === 2 && counts.length >= 2 && counts[1] >= 2) return HAND_TYPES.find(h => h.id === 'TWO_PAIR');
    if (counts[0] === 2) return HAND_TYPES.find(h => h.id === 'PAIR');
    return HAND_TYPES.find(h => h.id === 'HIGH_CARD');
  }, [handCards, commCards, gameState]);

  // 从左往右揭开
  const handleReveal = () => {
    const nextIdx = commCards.findIndex(c => !c.isRevealed);
    if (nextIdx === -1 || chips < revealCost) return;

    const newComm = [...commCards];
    newComm[nextIdx].isRevealed = true;
    setChips(prev => prev - revealCost);
    setCommCards(newComm);
    setSelectedId(null);
  };

  // 收割 (带溶解效果)
  const handleHarvest = async () => {
    if (isHarvesting) return;
    setIsHarvesting(true);

    const reward = bestHandInfo.base + (bestHandInfo.mult * level * 10);
    setCharge(prev => Math.min(10, prev + 1));

    // 1. 触发卡牌消散溶解
    setHandCards(prev => prev.map(c => ({ ...c, status: 'dissolving' })));
    setCommCards(prev => prev.map(c => c.isRevealed ? { ...c, status: 'dissolving' } : c));

    await new Promise(r => setTimeout(r, 500));

    // 2. 结算筹码
    const newChips = chips + reward;
    setChips(newChips);

    // 3. 检测是否直接过关
    if (newChips >= targetScore) {
      setIsHarvesting(false);
      return;
    }

    // 4. 未过关则正常补牌
    const newH = [
      { card: createCard(), isRevealed: true, status: 'flying' },
      { card: createCard(), isRevealed: true, status: 'flying' }
    ];
    const newC = commCards.map(c => 
      c.isRevealed ? { card: createCard(), isRevealed: false, status: 'flying' } : c
    );

    setHandCards(newH);
    setCommCards(newC);
    setSelectedId(null);
    
    setTimeout(() => {
      setHandCards(prev => prev.map(c => c.status === 'flying' ? { ...c, status: 'active' } : c));
      setCommCards(prev => prev.map(c => c.status === 'flying' ? { ...c, status: 'active' } : c));
      setIsHarvesting(false);
    }, 500);
  };

  // 换牌逻辑 (每次操作即时涨价)
  const handleSwap = (e, type, id) => {
    e.stopPropagation();
    const cost = type === 'hand' ? handSwapCost : commSwapCost;
    if (chips < cost || isHarvesting) return;

    setChips(prev => prev - cost);
    setSelectedId(null);
    
    // 涨价逻辑：手牌涨 1，公牌涨 3
    if (type === 'hand') {
      setHandSwapCost(prev => prev + 1);
    } else {
      setCommSwapCost(prev => prev + 3);
    }
    
    const newCardObj = { card: createCard(), isRevealed: true, status: 'flying' };

    if (type === 'hand') {
      setHandCards(prev => prev.map(c => c.card.id === id ? newCardObj : c));
    } else {
      setCommCards(prev => {
        const newComm = prev.map(c => c.card.id === id ? newCardObj : c);
        newComm.sort((a, b) => a.card.value - b.card.value);
        return newComm;
      });
    }

    setTimeout(() => {
      if (type === 'hand') setHandCards(prev => prev.map(c => c.card.id === newCardObj.card.id ? { ...c, status: 'active' } : c));
      else setCommCards(prev => prev.map(c => c.card.id === newCardObj.card.id ? { ...c, status: 'active' } : c));
    }, 500);
  };

  const handleSkillSort = () => {
    if (charge < 10 || isHarvesting) return;
    const sorted = [...commCards].sort((a, b) => a.card.value - b.card.value);
    setCommCards(sorted);
    setCharge(0);
    setSelectedId(null);
  };

  return (
    <div 
      className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col items-center p-4 select-none overflow-hidden"
      onClick={() => setSelectedId(null)}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="perlin-dissolve" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.5" in="noise" result="coloredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
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
      
      {/* 顶部面板 */}
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-xl border-b-2 border-yellow-500/20 relative overflow-hidden">
          <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1 z-10 relative">当前资产</div>
          <div className={`text-4xl font-black z-10 relative ${chips < 50 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>🪙 {chips}</div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full -mr-8 -mt-8 blur-2xl"></div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-xl flex flex-col items-center justify-center">
          <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">生存倒计时</div>
          <div className={`text-5xl font-black tabular-nums ${timeLeft < 20 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-xl flex flex-col items-end justify-center border-b-2 border-indigo-500/20">
          <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">本关目标</div>
          <div className="text-4xl font-black font-mono tracking-tighter text-indigo-400">🎯 {targetScore}</div>
        </div>
      </div>

      {gameState === 'START' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-1000">
          <div className="relative">
            <h1 className="text-9xl font-black italic tracking-tighter text-indigo-500 drop-shadow-2xl">REAPER</h1>
            <div className="absolute -top-4 -right-10 bg-yellow-400 text-black px-4 py-1 rounded-full font-black text-sm rotate-12 border-4 border-neutral-950">VFX PRO</div>
          </div>
          <p className="text-neutral-500 max-w-md text-lg leading-relaxed">
            注意：每次换牌都会引发 <span className="text-red-400 font-bold">即时通胀涨价</span>。<br/>
            合理分配开销，时间耗尽前达标即刻过关。
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); resetGame(); }} 
            className="px-20 py-6 bg-indigo-600 rounded-3xl font-black text-3xl hover:bg-indigo-500 transition-all shadow-[0_0_50px_rgba(79,70,229,0.4)] active:scale-95"
          >
            开启收割之路
          </button>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <div className="w-full max-w-5xl space-y-10 animate-in fade-in duration-500">
          
          <div className="flex justify-center h-20">
            <div className="bg-neutral-900/90 border-2 border-indigo-500/20 px-10 py-4 rounded-[2.5rem] flex items-center gap-8 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col">
                 <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">系统识别当前组合</span>
                 <span className="text-4xl font-black text-white">{bestHandInfo.name}</span>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="flex flex-col">
                 <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">收割资产预估</span>
                 <span className="text-3xl font-black text-emerald-400">+{bestHandInfo.base + bestHandInfo.mult * level * 10}</span>
              </div>
            </div>
          </div>

          {/* 公牌区 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2 sm:gap-4 lg:gap-6 min-h-[144px]">
              {commCards.map((item) => {
                const isSelected = selectedId === item.card.id;
                return (
                  <div 
                    key={item.card.id}
                    onClick={(e) => { e.stopPropagation(); if(item.isRevealed && !isHarvesting) setSelectedId(isSelected ? null : item.card.id); }}
                    className={`relative transition-all duration-300 ease-out transform cursor-pointer
                      ${isSelected ? '-translate-y-8 z-30' : 'hover:-translate-y-1 z-10'}
                      ${item.status === 'dissolving' ? 'animate-dissolve pointer-events-none' : ''}
                      ${item.status === 'flying' ? 'animate-fly-in pointer-events-none' : ''}`}
                  >
                    <div className={`w-16 h-24 sm:w-24 sm:h-36 rounded-2xl flex flex-col items-center justify-between p-2 border-2 shadow-xl transition-all duration-300
                      ${item.isRevealed 
                        ? (isSelected ? 'bg-indigo-50 border-indigo-500 shadow-[0_20px_40px_rgba(79,70,229,0.4)]' : 'bg-white border-neutral-200') 
                        : 'bg-neutral-900 border-neutral-800'}`}>
                      {item.isRevealed ? (
                        <>
                          <div className={`self-start font-black text-xs sm:text-lg ${item.card.suit.color}`}>{item.card.rank}</div>
                          <div className="text-3xl sm:text-5xl">{item.card.suit.emoji}</div>
                          <div className={`self-end font-black text-xs sm:text-lg rotate-180 ${item.card.suit.color}`}>{item.card.rank}</div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10"><span className="text-4xl text-neutral-700">?</span></div>
                      )}
                    </div>
                    {isSelected && item.isRevealed && (
                      <button 
                        onClick={(e) => handleSwap(e, 'comm', item.card.id)} 
                        className="absolute -top-4 -right-4 bg-yellow-400 text-black font-black px-3 py-1 rounded-xl text-[10px] shadow-2xl z-40 border-2 border-black transition-transform hover:scale-110 active:scale-90"
                      >
                        ♻️ {commSwapCost}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 手牌区 */}
          <div className="flex justify-center gap-8 min-h-[144px]">
            {handCards.map((item) => {
              const isSelected = selectedId === item.card.id;
              return (
                <div 
                  key={item.card.id}
                  onClick={(e) => { e.stopPropagation(); if(!isHarvesting) setSelectedId(isSelected ? null : item.card.id); }}
                  className={`relative transition-all duration-300 ease-out transform cursor-pointer
                    ${isSelected ? '-translate-y-8 z-30' : 'hover:-translate-y-1 z-10'}
                    ${item.status === 'dissolving' ? 'animate-dissolve pointer-events-none' : ''}
                    ${item.status === 'flying' ? 'animate-fly-in pointer-events-none' : ''}`}
                >
                  <div className={`w-16 h-24 sm:w-24 sm:h-36 rounded-2xl flex flex-col items-center justify-between p-2 border-2 shadow-xl transition-all duration-300
                    ${isSelected ? 'bg-indigo-50 border-indigo-500 shadow-[0_20px_40px_rgba(79,70,229,0.4)]' : 'bg-white border-neutral-200'}`}>
                    <div className={`self-start font-black text-xs sm:text-lg ${item.card.suit.color}`}>{item.card.rank}</div>
                    <div className="text-3xl sm:text-5xl">{item.card.suit.emoji}</div>
                    <div className={`self-end font-black text-xs sm:text-lg rotate-180 ${item.card.suit.color}`}>{item.card.rank}</div>
                  </div>
                  {isSelected && (
                    <button 
                      onClick={(e) => handleSwap(e, 'hand', item.card.id)} 
                      className="absolute -top-4 -right-4 bg-yellow-400 text-black font-black px-3 py-1 rounded-xl text-[10px] shadow-2xl z-40 border-2 border-black transition-transform hover:scale-110 active:scale-90"
                    >
                      ♻️ {handSwapCost}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* 控制台 */}
          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="w-full max-w-3xl grid grid-cols-2 gap-5">
              <button 
                onClick={(e) => { e.stopPropagation(); handleReveal(); }}
                disabled={commCards.every(c => c.isRevealed) || chips < revealCost || isHarvesting}
                className="py-10 rounded-[3rem] font-black text-3xl bg-white text-black border-b-8 border-neutral-300 hover:bg-neutral-100 transition-all disabled:opacity-50 active:scale-95 shadow-2xl"
              >
                <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1 block">从左至右揭开</span>
                翻牌 -{revealCost}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleHarvest(); }}
                disabled={isHarvesting}
                className="py-10 bg-emerald-600 rounded-[3rem] font-black text-3xl text-white border-b-8 border-emerald-800 hover:bg-emerald-500 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-50 active:scale-95 flex flex-col items-center justify-center"
              >
                <span className="text-[10px] uppercase tracking-widest opacity-80 mb-1">执行场面收割</span>
                收割：{bestHandInfo.name}
              </button>
            </div>

            <div className="w-full max-w-3xl flex gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); handleSkillSort(); }}
                disabled={charge < 10 || isHarvesting}
                className={`flex-[3] py-5 rounded-2xl font-black text-sm transition-all border-b-4 flex items-center justify-center gap-6
                  ${charge < 10 ? 'bg-neutral-900 border-neutral-950 text-neutral-700' : 'bg-indigo-600 border-indigo-800 text-white shadow-lg animate-pulse'}`}
              >
                <div className="flex items-center gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`w-3.5 h-3.5 rounded-full transition-colors duration-500 ${i < charge ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-neutral-800'}`} />
                  ))}
                </div>
                <span>SORT 技能 {charge === 10 ? '已就绪' : `(${charge}/10)`}</span>
              </button>
              <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center uppercase font-black text-xs text-indigo-400">
                Level {level}
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'LEVEL_UP' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500">
          <div className="text-9xl">🚀</div>
          <div className="space-y-4">
             <h2 className="text-7xl font-black text-emerald-500 tracking-tighter">本关目标达成！</h2>
             <p className="text-neutral-400 font-bold uppercase tracking-widest text-xl">已重置各项物价</p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); nextLevel(); }} 
            className="px-20 py-6 bg-white text-black rounded-3xl font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            进入 Level {level + 1}
          </button>
        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500">
          <div className="text-9xl">💀</div>
          <h2 className="text-8xl font-black text-red-600 tracking-tighter">挑战失败</h2>
          <div className="bg-emerald-500/10 border-2 border-emerald-500/20 px-24 py-10 rounded-[4rem] shadow-inner">
             <div className="text-[10px] text-emerald-500/70 font-black tracking-widest uppercase mb-2">资产归零或超时</div>
             <div className="text-9xl font-black text-emerald-400 tabular-nums">0</div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); resetGame(); }} 
            className="px-20 py-6 bg-white text-black rounded-3xl font-black text-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            重新挑战
          </button>
        </div>
      )}
    </div>
  );
}