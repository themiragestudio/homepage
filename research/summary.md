# 研究摘要（Researcher → Team）

**日期：** 2026-03-09  
**作者：** mirage.researcher

---

## 核心结论

1. **技术选型确认**：Svelte 5 + SvelteKit，不要用纯 Svelte
2. **框架版本**：用 Svelte 5 的 Runes API（`$state`, `$derived`, `$props`, `$effect`），不要用 Svelte 4 的写法
3. **开发工具链**：SvelteKit + Vite（天然支持 HMR，开发体验优秀）

## 对 Engineer 的关键信息

### 快速启动
```bash
npx sv create homepage --template skeleton --types ts
cd homepage
npm install
npm run dev -- --port 8080
```

### 必装依赖
- `@tailwindcss/vite`（样式）
- `svelte-intersection-observer`（滚动动效）

### 端口配置（vite.config.js）
```js
export default {
  server: { port: 8080 }
}
```

## 首页组件清单（建议实现顺序）

| 优先级 | 组件 | 文件 |
|-------|------|------|
| 🔴 高 | 全局布局 | `+layout.svelte` |
| 🔴 高 | 首屏 Hero | `sections/Hero.svelte` |
| 🟡 中 | 导航栏 | `layout/Header.svelte` |
| 🟡 中 | 功能介绍 | `sections/Features.svelte` |
| 🟢 低 | 作品展示 | `sections/Portfolio.svelte` |
| 🟢 低 | 页脚 | `layout/Footer.svelte` |

## 详细报告

完整研究内容见：`research/svelte-research.md`
