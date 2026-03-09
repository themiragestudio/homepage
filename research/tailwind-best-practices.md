# Tailwind CSS 最佳实践

**作者：** Researcher (mirage.researcher)  
**日期：** 2026-03-09  
**版本：** Tailwind CSS v4（当前最新）

---

## 一、Svelte 5 + Tailwind v4 集成配置

### 1.1 安装方式（Vite 插件，推荐）

Tailwind v4 不再需要 `tailwind.config.js`，改为通过 CSS `@theme` 指令配置。

```bash
npm install tailwindcss @tailwindcss/vite
```

### 1.2 `vite.config.ts` 配置

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),   // 放在 sveltekit() 之后
  ],
  server: {
    port: 8080       // 项目要求端口
  }
});
```

### 1.3 全局 CSS 入口（`src/app.css`）

```css
@import "tailwindcss";

/* 品牌主题变量 */
@theme {
  --color-brand-50:  oklch(0.97 0.01 280);
  --color-brand-100: oklch(0.93 0.03 280);
  --color-brand-500: oklch(0.60 0.18 280);
  --color-brand-600: oklch(0.52 0.20 280);
  --color-brand-900: oklch(0.25 0.08 280);

  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Cal Sans", "Inter", sans-serif;

  --radius-card: 1rem;
  --radius-btn:  0.5rem;
}

/* Dark mode：手动切换模式（通过 .dark class） */
@custom-variant dark (&:where(.dark, .dark *));

/* 全局 base 样式 */
@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3 {
    font-family: var(--font-display);
  }
}
```

### 1.4 在 `+layout.svelte` 中引入

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
</script>

<slot />
```

---

## 二、Tailwind v4 核心变化（对比 v3）

| 特性 | Tailwind v3 | Tailwind v4 |
|------|------------|------------|
| 配置文件 | `tailwind.config.js` | CSS `@theme` 指令 |
| 安装 | PostCSS 插件 | Vite 原生插件 |
| 颜色空间 | HEX / HSL | OKLCH（更准确） |
| 内容扫描 | `content: [...]` 配置 | 自动检测（无需配置） |
| 暗色模式 | `darkMode: 'class'` | `@custom-variant dark` |
| 导入语句 | `@tailwind base/components/utilities` | `@import "tailwindcss"` |

> ⚠️ **重要**：如果看到用 `tailwind.config.js` 的教程，那是 v3 的写法。本项目使用 v4。

---

## 三、核心使用模式

### 3.1 响应式设计（Mobile First）

Tailwind 的断点是**最小宽度**（mobile-first），无前缀的类适用于所有屏幕：

```
sm  → 640px+
md  → 768px+
lg  → 1024px+
xl  → 1280px+
2xl → 1536px+
```

```html
<!-- 正确：先写移动端样式，大屏覆盖 -->
<div class="flex-col sm:flex-row">

<!-- 错误：sm 不是"小屏"，是"640px 及以上" -->
<div class="sm:text-center">  ❌
```

### 3.2 状态变体

```html
<!-- hover / focus / active -->
<button class="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 
               focus:outline-none focus:ring-2 focus:ring-brand-500/50">
  按钮
</button>

<!-- dark mode -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

<!-- group-hover（父子联动） -->
<div class="group">
  <p class="opacity-0 group-hover:opacity-100 transition-opacity">
    悬停时出现
  </p>
</div>
```

### 3.3 任意值（Arbitrary Values）

当设计稿有非标准数值时：

```html
<!-- 像素值 -->
<div class="top-[117px] w-[320px]">

<!-- 颜色值 -->
<div class="bg-[#1a1a2e] text-[#e2e8f0]">

<!-- CSS 变量 -->
<div class="text-(--brand-color) bg-(--surface-color)">

<!-- 复杂表达式 -->
<div class="grid-cols-[1fr_2fr_1fr] h-[calc(100vh-4rem)]">
```

### 3.4 避免重复：组件类 vs Svelte 组件

**不推荐** 用 `@apply` 提取 class（官方不再推荐）：
```css
/* ❌ 反模式 */
.btn { @apply px-4 py-2 bg-blue-500 rounded; }
```

**推荐** 用 Svelte 组件封装重复样式：
```svelte
<!-- ✅ Button.svelte -->
<script>
  let { variant = 'primary', size = 'md', onclick, children } = $props();
  
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white',
    outline: 'border border-brand-500 text-brand-500 hover:bg-brand-50',
    ghost:   'text-brand-500 hover:bg-brand-50',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
</script>

<button
  class="inline-flex items-center justify-center rounded-btn font-medium 
         transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50
         {variants[variant]} {sizes[size]}"
  {onclick}
>
  {@render children()}
</button>
```

### 3.5 条件 class（Svelte 中）

```svelte
<script>
  let { active, disabled } = $props();
</script>

<!-- 方式一：三元表达式（简单情况） -->
<div class="px-4 {active ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700'}">

<!-- 方式二：clsx 库（推荐，多条件时更清晰） -->
<script>
  import { clsx } from 'clsx';
  
  $: classes = clsx(
    'px-4 py-2 rounded transition-colors',
    active && 'bg-brand-500 text-white',
    disabled && 'opacity-50 cursor-not-allowed',
    !active && !disabled && 'bg-gray-100 hover:bg-gray-200'
  );
</script>
<div class={classes}>
```

安装 `clsx`：`npm install clsx`

---

## 四、Dark Mode 实现（手动切换）

### 4.1 app.css 配置

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

### 4.2 主题切换 Store（`lib/stores/theme.svelte.js`）

```js
// 从 localStorage 初始化，避免闪烁
const stored = typeof localStorage !== 'undefined' 
  ? localStorage.getItem('theme') 
  : null;

let isDark = $state(stored === 'dark' || 
  (!stored && typeof window !== 'undefined' && 
   window.matchMedia('(prefers-color-scheme: dark)').matches));

export function toggleTheme() {
  isDark = !isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', isDark);
}

export { isDark };
```

### 4.3 在 `+layout.svelte` 初始化

```svelte
<script>
  import { isDark } from '$lib/stores/theme.svelte.js';
  import '../app.css';
</script>

<!-- 把 dark class 挂到 html 元素 -->
<svelte:element this="html" class={isDark ? 'dark' : ''}>
  <slot />
</svelte:element>
```

---

## 五、性能最佳实践

### 5.1 Tailwind v4 自动优化（无需手动配置）

- **自动 Tree-shaking**：只生成用到的 class，无需 `content` 配置
- **零运行时**：纯编译时生成，不影响 JS bundle
- **增量构建**：开发时只重新生成变更的样式

### 5.2 避免动态 class 拼接

```svelte
<!-- ❌ Tailwind 扫描不到动态拼接的类名 -->
<div class="text-{color}-500">

<!-- ✅ 用完整类名 + 条件逻辑 -->
<div class={color === 'red' ? 'text-red-500' : 'text-blue-500'}>

<!-- ✅ 或者用 safelist（在 app.css 中） -->
```

```css
/* app.css - 强制包含某些动态类 */
@layer utilities {
  .text-red-500 {}
  .text-blue-500 {}
  .text-green-500 {}
}
```

### 5.3 合理使用 `@layer`

```css
@import "tailwindcss";

/* base：HTML 元素默认样式 */
@layer base {
  h1 { font-size: var(--text-4xl); line-height: 1.1; }
}

/* components：可复用组件类（可被 utilities 覆盖） */
@layer components {
  .card {
    background: white;
    border-radius: var(--radius-card);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
  }
}

/* utilities：单一职责工具类（最高优先级） */
@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, var(--color-brand-500), #a855f7);
    -webkit-background-clip: text;
    color: transparent;
  }
}
```

---

## 六、Svelte + Tailwind 特有技巧

### 6.1 Scoped CSS 与 Tailwind 混用

```svelte
<div class="relative overflow-hidden">
  <div class="hero-bg" />
</div>

<style>
  /* Tailwind 处理不了的复杂效果，用 Scoped CSS 补充 */
  .hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 80% at 50% -20%,
      rgba(120, 80, 255, 0.3),
      transparent
    );
    pointer-events: none;
  }
</style>
```

### 6.2 Svelte 过渡 + Tailwind class 联用

```svelte
<script>
  import { fly, fade } from 'svelte/transition';
  let visible = $state(false);
</script>

<!-- Tailwind 控制静态样式，Svelte transition 控制动画 -->
{#if visible}
  <div
    class="rounded-xl bg-white p-6 shadow-lg"
    in:fly={{ y: 20, duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    内容
  </div>
{/if}
```

### 6.3 动态主题色（CSS 变量 + Tailwind）

```svelte
<!-- 通过 CSS 变量驱动主题，Tailwind 引用变量 -->
<div style="--accent: #6366f1" class="bg-(--accent) text-white">
```

---

*报告完成时间：2026-03-09 | 参考来源：Tailwind CSS v4 官方文档*
