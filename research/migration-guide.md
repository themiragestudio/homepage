# CSS → Tailwind 迁移指南

**作者：** Researcher (mirage.researcher)  
**日期：** 2026-03-09  
**适用场景：** 从传统 CSS / SCSS 迁移到 Tailwind v4

---

## 一、迁移原则

**迁移不是重写，是逐步替换。**

核心思路：
1. 先跑通 Tailwind 安装，不动原有 CSS
2. 新组件直接用 Tailwind
3. 旧组件按优先级逐步迁移
4. 保留无法用 Tailwind 表达的复杂效果（用 Scoped CSS）

---

## 二、迁移前准备

### 2.1 安装依赖

```bash
npm install tailwindcss @tailwindcss/vite clsx
```

### 2.2 更新 `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  server: { port: 8080 }
});
```

### 2.3 创建 `src/app.css`（或修改现有入口 CSS）

```css
@import "tailwindcss";

/* ↓ 原有 CSS 变量迁移到 @theme */
@theme {
  /* 把原来的 :root 变量搬到这里 */
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --font-sans: "Inter", system-ui, sans-serif;
}

/* ↓ 原有全局样式暂时保留在这里，逐步清理 */
/* 旧的全局 CSS... */
```

---

## 三、常见迁移模式

### 3.1 布局类

| 传统 CSS | Tailwind | 说明 |
|---------|---------|------|
| `display: flex` | `flex` | |
| `flex-direction: column` | `flex-col` | |
| `align-items: center` | `items-center` | |
| `justify-content: space-between` | `justify-between` | |
| `display: grid` | `grid` | |
| `grid-template-columns: repeat(3, 1fr)` | `grid-cols-3` | |
| `gap: 1rem` | `gap-4` | 1rem = 4 单位 |
| `position: relative` | `relative` | |
| `position: absolute; inset: 0` | `absolute inset-0` | |
| `overflow: hidden` | `overflow-hidden` | |

### 3.2 间距（Tailwind 间距单位：1 = 0.25rem = 4px）

| 传统 CSS | Tailwind |
|---------|---------|
| `padding: 1rem` (16px) | `p-4` |
| `padding: 1.5rem` (24px) | `p-6` |
| `padding: 2rem` (32px) | `p-8` |
| `margin: 0 auto` | `mx-auto` |
| `margin-bottom: 1rem` | `mb-4` |
| `padding-top: 5rem` | `pt-20` |
| `padding: 0.5rem 1rem` | `py-2 px-4` |

### 3.3 尺寸

| 传统 CSS | Tailwind |
|---------|---------|
| `width: 100%` | `w-full` |
| `max-width: 1280px` | `max-w-7xl` |
| `height: 100vh` | `h-screen` |
| `width: 3rem; height: 3rem` | `size-12` |
| `min-height: 100vh` | `min-h-screen` |

### 3.4 字体与文本

| 传统 CSS | Tailwind |
|---------|---------|
| `font-size: 1rem` | `text-base` |
| `font-size: 1.5rem` | `text-2xl` |
| `font-size: 3rem` | `text-5xl` |
| `font-weight: 600` | `font-semibold` |
| `font-weight: 700` | `font-bold` |
| `line-height: 1.5` | `leading-normal` |
| `text-align: center` | `text-center` |
| `color: #6b7280` | `text-gray-500` |
| `letter-spacing: 0.05em` | `tracking-wide` |
| `text-transform: uppercase` | `uppercase` |

### 3.5 背景与边框

| 传统 CSS | Tailwind |
|---------|---------|
| `background-color: white` | `bg-white` |
| `background-color: #f9fafb` | `bg-gray-50` |
| `border-radius: 0.5rem` | `rounded-lg` |
| `border-radius: 9999px` | `rounded-full` |
| `border: 1px solid #e5e7eb` | `border border-gray-200` |
| `box-shadow: 0 4px 6px ...` | `shadow-md` |
| `opacity: 0.5` | `opacity-50` |

### 3.6 过渡与动画

| 传统 CSS | Tailwind |
|---------|---------|
| `transition: all 0.2s` | `transition` |
| `transition: colors 0.15s` | `transition-colors duration-150` |
| `transform: translateY(-2px)` | `-translate-y-0.5` |
| `transform: scale(1.05)` | `scale-105` |
| `cursor: pointer` | `cursor-pointer` |
| `user-select: none` | `select-none` |

---

## 四、迁移策略：三阶段法

### 阶段一：基础设施（Day 1，约 2h）

**目标**：Tailwind 跑通，不破坏现有样式

1. 安装并配置 Tailwind（见上方）
2. 把 `:root` 中的 CSS 变量迁移到 `@theme`
3. 保留所有原有 CSS，仅添加 Tailwind 支持
4. 验证：运行项目，确认无样式冲突

**注意**：Tailwind 的 Preflight（基础重置）会覆盖部分浏览器默认样式。如果发现样式异常，在 `app.css` 中加：
```css
@layer base {
  /* 还原被 Preflight 影响的样式 */
  a { color: inherit; }
}
```

### 阶段二：新组件用 Tailwind（Day 1-2，持续）

**目标**：所有新代码直接用 Tailwind

原则：
- 新建组件 → 全部 Tailwind
- 旧组件的新功能 → 混用（新增部分用 Tailwind）
- 不强行迁移稳定运行的旧代码

### 阶段三：存量迁移（按优先级）

**迁移优先级排序：**

| 优先级 | 目标 | 原因 |
|-------|------|------|
| 🔴 高 | 全局 base 样式 | 影响范围大，迁移收益高 |
| 🔴 高 | Header / Footer | 高频复用，迁移收益高 |
| 🟡 中 | Hero Section | 视觉核心，迁移可改善一致性 |
| 🟡 中 | 通用 UI 组件（Button, Card） | 复用率高 |
| 🟢 低 | 一次性 Section | 稳定运行就不动 |
| ⚪ 跳过 | 复杂动效 CSS | Tailwind 表达力不够，保留 Scoped CSS |

---

## 五、迁移陷阱与解决方案

### 陷阱 1：Preflight 重置冲突

**现象**：迁移后按钮、链接等样式消失。  
**原因**：Tailwind Preflight 会移除浏览器默认样式。  
**解决**：
```css
@layer base {
  button { cursor: pointer; }
  a { text-decoration: underline; }  /* 如果需要的话 */
}
```

### 陷阱 2：动态 class 被 Tree-shaking 删除

**现象**：动态颜色/大小的 class 在生产构建中不生效。  
**原因**：Tailwind 扫描源码时找不到完整的 class 名。  
**解决**：
```svelte
<!-- ❌ 不要这样 -->
<div class="text-{color}-500">

<!-- ✅ 改为完整 class 名 + 条件 -->
<div class={color === 'red' ? 'text-red-500' : 'text-blue-500'}>

<!-- ✅ 或者用 safelist -->
```
```css
/* app.css 中强制保留 */
@layer utilities {
  .text-red-500, .text-blue-500, .text-green-500 {}
}
```

### 陷阱 3：Svelte Scoped CSS 与 Tailwind 冲突

**现象**：`<style>` 块中的选择器覆盖了 Tailwind class。  
**原因**：Svelte Scoped CSS 有作用域 hash，但特异性可能更高。  
**解决**：明确区分职责 —— Tailwind 管布局/间距/颜色，Scoped CSS 管复杂效果。

### 陷阱 4：@apply 在 v4 中不推荐

Tailwind v4 官方不推荐 `@apply`，因为它让工具类失去了原本的优势。  
替代方案：用 Svelte 组件封装重复样式（见最佳实践文档）。

### 陷阱 5：v3 教程 vs v4 写法

常见混淆：

| v3（旧） | v4（新） |
|---------|---------|
| `tailwind.config.js` | `@theme` 在 CSS 中 |
| `@tailwind base` | `@import "tailwindcss"` |
| `darkMode: 'class'` | `@custom-variant dark (...)` |
| `content: ['./src/**/*.svelte']` | 自动检测，无需配置 |

---

## 六、CSS 变量迁移参考

### 原有 `:root` 变量迁移到 `@theme`

```css
/* 迁移前：app.css */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --text-primary: #111827;
  --bg-surface: #ffffff;
  --radius: 0.5rem;
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

/* 迁移后：app.css */
@import "tailwindcss";

@theme {
  /* 颜色 → 可直接用 bg-brand-500 等工具类 */
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  
  /* 字体 */
  --font-sans: "Inter", system-ui, sans-serif;
  
  /* 圆角 */
  --radius-card: 1rem;
  --radius-btn:  0.5rem;
}

/* 非 Tailwind 范畴的变量保留在 :root */
:root {
  --shadow-custom: 0 4px 6px -1px rgba(0,0,0,0.1);
}
```

---

*迁移完成后，建议删除 `src/app.css` 中所有已迁移的旧 CSS，保持文件整洁。*
