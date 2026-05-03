Texas Reaper (德州收割者) - 项目设计与交接文档

1. 项目简介

Texas Reaper 是一款结合了“德州扑克”牌型规则与“Roguelike/消除类”资源管理的快节奏生存博弈游戏。
玩家不需要与其他对手对战，而是与时间和通货膨胀赛跑。玩家需要通过消耗资产（Chips）揭开/替换场上的卡牌，并利用系统自动识别的最优牌型进行“收割（Harvest）”以赚取更多资产，最终在倒计时结束前达到关卡目标门槛（Target Score）。

2. 核心架构与技术栈

前端框架: React (使用 Functional Components & Hooks)

样式方案: Tailwind CSS (高度依赖其实用类，包含复杂的状态修饰符如 hover:, active:, disabled:)

动画方案:

CSS Keyframes (@keyframes 驱动的飞入和溶解)

SVG Shader (使用 <feTurbulence> 实现的 Perlin Noise 溶解特效)

状态管理: React 原生 useState, useEffect (计时器/监听器), useMemo (牌型算法优化), useCallback。

3. 给接手 AI 的架构提示 (Architecture Notes for Next AI)

3.1 核心数据结构

卡牌状态被独立封装在对象中，请注意 status 字段对于动画的控制至关重要：

// 卡牌基础对象
const card = { suit: {name, color, emoji}, rank: 'A', value: 14, id: '唯一随机ID' }

// 场面状态结构 (handCards & commCards)
const boardCardState = {
  card: card,
  isRevealed: boolean, // 是否已翻开
  status: 'flying' | 'active' | 'dissolving' // 控制 CSS 动画的生命周期
}


3.2 关键机制实现逻辑

单选逻辑: 不使用卡牌内部的 isSelected，而是由一个全局的 const [selectedId, setSelectedId] = useState(null) 控制，点击背景会清空 selectedId。

自动牌型算法 (bestHandInfo): 在 useMemo 中实时计算。它会收集场上所有 isRevealed === true 且 status !== 'dissolving' 的卡牌进行德州扑克牌型判定。

动画生命周期拦截: handleHarvest（收割）是一个 async 函数。它先将卡牌状态改为 dissolving，通过 setTimeout 阻塞等待 CSS 动画播完，然后再替换数据数组并赋予新牌 flying 状态，最后再将新牌切换回 active。修改这部分时极易引发 React 重新渲染导致的白屏 Bug，需严格保证卡牌的 key={item.card.id} 是唯一的。

动态通胀: revealCost、swapCostHand 和 swapCostComm 都会随着 level 变量递增。

即时通关检测: useEffect 监听 chips，一旦 chips >= targetScore 且当前没有在播放收割动画（!isHarvesting），立即跳转到 LEVEL_UP 状态。

4. 本地启动指南 (Local Setup Instructions)

由于项目完全由单文件 React 组件和 Tailwind CSS 构成，推荐使用 Vite 快速搭建本地环境。

第一步：初始化 Vite React 项目

在终端运行以下命令：

npm create vite@latest texas-reaper -- --template react
cd texas-reaper
npm install


第二步：安装并配置 Tailwind CSS

该项目极度依赖 Tailwind CSS，必须正确配置：

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


修改生成的 tailwind.config.js 文件，确保配置了内容路径：

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


清空并修改 src/index.css，引入 Tailwind 的基础指令：

@tailwind base;
@tailwind components;
@tailwind utilities;

/* 屏蔽默认 body 边距，确保全屏体验 */
body {
  margin: 0;
  padding: 0;
  background-color: #0a0a0a; /* neutral-950 */
}


第三步：植入游戏代码

将本项目提供的核心代码（即 texas_reaper_final.jsx 内的全部代码）复制。

打开 src/App.jsx，将其内容完全替换为复制的代码。

第四步：启动开发服务器

npm run dev


打开终端提示的本地地址（通常是 http://localhost:5173），即可在本地浏览器中完美运行并调试 Texas Reaper。