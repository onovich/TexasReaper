# Texas Reaper / 德州收割者

Texas Reaper 是一个基于 React + Vite + Tailwind CSS 的 Web 游戏项目。

当前仓库的目标是把原始 Gemini Demo 在不改动原版源码的前提下，完成一套可维护、可部署、可继续精修的 Web 重构版本，并逐步达到交互和视觉层面的高保真复刻。

## 当前状态

- 原版单文件 Demo 已保留，不参与直接修改
- 新版 Web 工程已独立建立，支持本地开发和构建
- 核心机制已从单文件中拆分为数据层、逻辑层、表现层和容器层
- GitHub Pages 自动部署工作流已配置
- 当前阶段重点是继续完成像素级 UI 和交互对齐

## 仓库结构

### 原版参考

- [orogin/texas_reaper_final.jsx](orogin/texas_reaper_final.jsx): 原始 Gemini Demo 单文件实现
- [orogin/Lanch.md](orogin/Lanch.md): 原项目设计与交接文档

### 新版 Web 工程

- [frontend](frontend): 新的前端工程根目录
- [frontend/src/App.jsx](frontend/src/App.jsx): 应用入口，负责组装页面与游戏容器
- [frontend/src/game/data](frontend/src/game/data): 游戏静态数据与配置
- [frontend/src/game/logic](frontend/src/game/logic): 纯逻辑与规则计算
- [frontend/src/game/hooks](frontend/src/game/hooks): React 容器层，负责状态编排与时序
- [frontend/src/components](frontend/src/components): 视图组件与分屏 UI

## 分层设计

### 数据层

位于 [frontend/src/game/data](frontend/src/game/data)

负责内容：

- 扑克牌花色、点数、数值映射
- 牌型定义
- 游戏初始参数与动画时间配置

### 逻辑层

位于 [frontend/src/game/logic](frontend/src/game/logic)

负责内容：

- 最优牌型识别
- 收割收益计算
- 翻牌、换牌、补牌、排序等纯状态变换

这一层不依赖 React，也不依赖 DOM。

### 容器层

位于 [frontend/src/game/hooks/useTexasReaperGame.js](frontend/src/game/hooks/useTexasReaperGame.js)

负责内容：

- 游戏总状态管理
- 动画时序衔接
- 倒计时
- UI 事件分发

### 表现层

位于 [frontend/src/components](frontend/src/components)

负责内容：

- 顶部状态栏
- 牌面渲染
- 各阶段界面
- 动画效果承载

## 本地开发

### 环境要求

- Node.js 18 或更高版本
- npm

### 安装依赖

在仓库根目录执行：

```bash
cd frontend
npm install
```

### 启动开发环境

```bash
cd frontend
npm run dev
```

默认会启动 Vite 本地开发服务器。

### 生产构建

```bash
cd frontend
npm run build
```

构建产物输出到 frontend/dist。

### 本地预览生产包

```bash
cd frontend
npm run preview
```

## GitHub Pages 部署

仓库已包含自动部署工作流：

- [ .github/workflows/deploy.yml ](.github/workflows/deploy.yml)

部署方式：

- 推送到 main 分支后自动触发构建与发布
- Vite 的站点基路径已配置为 /TexasReaper/

如果这是第一次启用 Pages，需要在 GitHub 仓库设置中将 Pages 来源切换为 GitHub Actions。

预期访问地址：

- https://onovich.github.io/TexasReaper/

## 当前重点

当前重构已经完成第一阶段：

- 将原始单文件逻辑拆开
- 建立新的 Web 工程结构
- 保留原版机制表达
- 让项目具备持续迭代能力

接下来的重点不是继续扩展技术栈，而是逐项完成高保真复刻：

- 牌区布局尺寸对齐
- 字体、颜色、阴影和圆角细节对齐
- 交互反馈与动画时序对齐
- 移动端与桌面端表现校准

## 设计原则

- 不改动原版参考实现
- 优先保证机制一致性
- 在机制稳定的前提下推进像素级 UI 复刻
- 保持结构可维护，避免重新堆回单文件

## 远端仓库

- git@github.com:onovich/TexasReaper.git
