# Texas Reaper

Texas Reaper 是一个以扑克组合判断为核心、强调节奏与取舍的网页小游戏，使用 React、Vite 和 Tailwind CSS 构建。

当前版本的重点有三项：

- 保留核心游戏循环与牌型判定规则
- 提供以移动端为优先的视觉与交互体验
- 支持直接部署到 GitHub Pages

## 在线体验

- GitHub Pages：https://onovich.github.io/TexasReaper/

## 项目特点

- 移动端优先设计，桌面端以手机画框方式呈现
- 使用 React 组织状态，并将数据、逻辑、界面拆分为独立层次
- 内置 GitHub Actions + GitHub Pages 自动部署流程
- 仓库中保留原始参考原型，便于后续持续对照迭代

## 技术栈

- React 18
- Vite 5
- Tailwind CSS 3
- GitHub Actions + GitHub Pages

## 本地开发

环境要求：

- Node.js 18 及以上
- npm

安装依赖：

```bash
cd frontend
npm install
```

启动开发环境：

```bash
cd frontend
npm run dev
```

构建生产版本：

```bash
cd frontend
npm run build
```

本地预览生产构建：

```bash
cd frontend
npm run preview
```

## 部署说明

当前仓库已经配置好基于 GitHub Actions 的 GitHub Pages 自动部署。

- 工作流文件：.github/workflows/deploy.yml
- 生产环境基础路径：/TexasReaper/
- 推送到 main 分支后会自动触发部署

如果仓库还没有启用 Pages，需要在 GitHub 仓库设置中将 Pages 来源切换为 GitHub Actions。

## 项目结构

- frontend/：Web 前端工程
- frontend/src/game/data：游戏静态数据与配置
- frontend/src/game/logic：纯规则逻辑与结算计算
- frontend/src/game/hooks：状态编排、时序和交互调度
- frontend/src/components：界面组件与分屏视图
- orogin/：原始参考原型与归档材料

## 维护说明

面向维护者的内部文档已经从公开 README 中拆分出去：

- docs/engineering-retrospective.md
- docs/roadmap.md
