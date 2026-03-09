# Svelte 框架研究报告

**作者：** Researcher (mirage.researcher)  
**日期：** 2026-03-09  
**项目：** Mirage Studio 首页  
**版本：** Svelte 5（最新稳定版）

---

## 一、Svelte 是什么

Svelte 是一个**编译型** UI 框架，与 React / Vue 最大的不同在于：它没有运行时虚拟 DOM，组件在构建时被直接编译成精简的原生 JavaScript。这意味着：

- **更小的包体积**：没有框架运行时开销
- **更快的执行速度**：直接操作 DOM，无 diff 算法
- **更简洁的代码**：写更少的样板

---

## 二、Svelte 5 核心概念：Runes 响应式系统

Svelte 5 引入了 **Runes**（符文）—— 一套全新的响应式 API，用特殊函数替代了 Svelte 4 的魔法变量机制，语义更清晰，可移植到 `.svelte.js` / `.svelte.ts` 文件中。

### 2.1 `$state` — 响应式状态

```svelte
<script>
  let count = $state(0);
  let user = $state({ name: 'Mirage', age: 18 });
</script>

<button onclick={() => count++}>点击：{count}</button>
```

- 基础类型直接赋值触发更新
- 对象/数组自动转为**深度响应式代理**（Proxy）
- `$state.raw()` — 不需要深度响应时使用，性能更好
- `$state.snapshot()` — 获取代理的静态快照（传给第三方库时用）

### 2.2 `$derived` — 派生状态

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  // 复杂派生用 $derived.by
  let total = $derived.by(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  });
</script>
```

- 自动追踪依赖，依赖变化时重新计算
- 采用**推拉式响应**：状态变更立即通知（推），但派生值惰性求值（拉）
- 值未改变时跳过下游更新（引用相等性检查）

### 2.3 `$props` — 组件 Props

```svelte
<script>
  // 解构写法（推荐）
  let { title, description = '默认描述', ...rest } = $props();
</script>
```

- 替代了 Svelte 4 的 `export let`
- 支持默认值、重命名、剩余 props
- **不要直接 mutate props**，应通过回调函数通信

### 2.4 `$effect` — 副作用

```svelte
<script>
  let color = $state('#ff3e00');
  let canvas;
  
  $effect(() => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color; // 自动追踪 color 依赖
    ctx.fillRect(0, 0, 100, 100);
    
    // 可选：返回清理函数
    return () => ctx.clearRect(0, 0, 100, 100);
  });
</script>
```

- 组件挂载到 DOM **之后**运行
- 自动追踪同步读取的响应式依赖
- 异步代码（await、setTimeout）内的读取**不会被追踪**
- **避免在 effect 内修改 state**（容易造成循环）

---

## 三、`.svelte` 文件结构

每个组件是一个 `.svelte` 文件，包含三个可选块：

```svelte
<script module>
  // 模块级代码：只运行一次（整个模块共享）
  // 适合：共享常量、模块级缓存
</script>

<script>
  // 实例级代码：每个组件实例运行一次
  // 在这里声明 state、props、effect
</script>

<!-- HTML 模板 -->
<div class="container">
  <slot />
</div>

<style>
  /* 样式默认是 Scoped 的（组件局部）*/
  .container { padding: 1rem; }
  
  /* 全局样式用 :global() */
  :global(body) { margin: 0; }
</style>
```

**关键特性：**
- CSS 默认**组件作用域**，不会泄漏到外部
- 模板使用 `{expression}` 插值
- 事件绑定：`onclick={handler}`（Svelte 5 弃用 `on:click`）

---

## 四、SvelteKit vs 纯 Svelte

| 对比维度 | 纯 Svelte | SvelteKit |
|---------|-----------|-----------|
| 定位 | UI 组件库 | 全栈应用框架 |
| 路由 | 无内置 | 基于文件系统 |
| SSR/SSG | 无内置 | 原生支持 |
| 类比 | React | Next.js |
| 适合场景 | 简单 SPA / 嵌入式组件 | 完整 Web 应用 |

**Mirage Studio 首页推荐：SvelteKit**
- 内置路由，多页面扩展方便
- 支持预渲染（SSG），对 SEO 友好
- Vite 驱动，开发体验极佳（HMR）

---

## 五、首页组件架构建议

### 5.1 目录结构

```
src/
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.svelte       # 导航栏
│   │   │   ├── Footer.svelte       # 页脚
│   │   │   └── Layout.svelte       # 页面包裹层
│   │   ├── sections/
│   │   │   ├── Hero.svelte         # 首屏 Banner
│   │   │   ├── Features.svelte     # 功能介绍
│   │   │   ├── About.svelte        # 关于我们
│   │   │   └── Contact.svelte      # 联系方式
│   │   └── ui/
│   │       ├── Button.svelte       # 通用按钮
│   │       ├── Card.svelte         # 卡片组件
│   │       └── Icon.svelte         # 图标组件
│   ├── stores/
│   │   └── theme.svelte.js         # 全局主题状态
│   └── utils/
│       └── animations.js
├── routes/
│   ├── +layout.svelte              # 全局布局
│   └── +page.svelte                # 首页
└── app.html
```

### 5.2 首页 Section 划分

一个典型 Studio 首页的结构：

```
┌─────────────────────────────────┐
│  Header (Nav + Logo + CTA)      │
├─────────────────────────────────┤
│  Hero Section                   │
│  (主标题 + 副标题 + 主 CTA)     │
├─────────────────────────────────┤
│  Features / Services            │
│  (3-4 个核心功能卡片)           │
├─────────────────────────────────┤
│  Portfolio / Works              │
│  (作品展示)                     │
├─────────────────────────────────┤
│  About / Team                   │
├─────────────────────────────────┤
│  Contact / CTA                  │
├─────────────────────────────────┤
│  Footer                         │
└─────────────────────────────────┘
```

### 5.3 组件设计原则

**1. Props 向下，Events 向上**
```svelte
<!-- Button.svelte -->
<script>
  let { label, variant = 'primary', onclick } = $props();
</script>
<button class={variant} {onclick}>{label}</button>
```

**2. 使用 Context API 跨层传值**
```svelte
<!-- Layout.svelte -->
<script>
  import { setContext } from 'svelte';
  setContext('theme', { primary: '#6366f1' });
</script>

<!-- 深层组件 -->
<script>
  import { getContext } from 'svelte';
  const theme = getContext('theme');
</script>
```

**3. 全局状态用 `.svelte.js` 文件**
```js
// lib/stores/theme.svelte.js
let isDark = $state(false);

export function toggleTheme() {
  isDark = !isDark;
}
export { isDark };
```

---

## 六、样式方案推荐

### 首选：Tailwind CSS + Svelte Scoped 混用

```svelte
<style>
  .hero-title {
    font-size: clamp(2rem, 5vw, 4rem);
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
```

- **Tailwind** 处理布局、间距、响应式
- **Scoped CSS** 处理复杂动效和品牌样式
- 避免全局 CSS 污染

### 动画方案

Svelte 内置：
```svelte
<script>
  import { fade, fly, slide } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
</script>

{#if visible}
  <div in:fly={{ y: 20, duration: 400 }} out:fade>
    内容
  </div>
{/if}
```

---

## 七、学习路径建议

### 阶段一：Svelte 基础（1-2 天）

1. **官方交互教程**：https://svelte.dev/tutorial
   - Part 1: Basic Svelte（重点）
   - Part 2: Advanced Svelte（选读）
2. **核心概念掌握顺序**：
   - `.svelte` 文件结构
   - `$state` 和 `$derived`
   - `$props` 组件通信
   - 模板语法（`{#if}`, `{#each}`, `{#await}`）
   - Scoped CSS

### 阶段二：SvelteKit（2-3 天）

1. **官方教程**：https://svelte.dev/tutorial/kit
2. **重点掌握**：
   - 文件系统路由（`+page.svelte`, `+layout.svelte`）
   - Load 函数（`+page.js` / `+page.server.js`）
   - 表单 Actions
   - 部署配置

### 阶段三：实战（进行中）

1. 从 `npx sv create` 脚手架开始
2. 按组件架构逐步实现各 Section
3. 接入 Tailwind CSS
4. 处理动效和交互

### 关键参考资源

| 资源 | 链接 | 用途 |
|------|------|------|
| 官方文档 | https://svelte.dev/docs | 完整参考 |
| 交互教程 | https://svelte.dev/tutorial | 入门学习 |
| Playground | https://svelte.dev/playground | 快速实验 |
| SvelteKit 文档 | https://svelte.dev/docs/kit | 应用框架 |
| Svelte Society | https://sveltesociety.dev | 组件生态 |

---

## 八、关键注意事项

1. **Svelte 5 vs Svelte 4**：两者 API 差异较大。Svelte 4 用 `$:` 声明响应，Svelte 5 用 Runes。新项目直接用 Svelte 5。

2. **不要在 `$effect` 里修改 state**：容易造成无限循环。应优先用 `$derived`。

3. **Props 不可 mutate**：子组件修改 props 会触发 `ownership_invalid_mutation` 警告。用回调或 `$bindable` 处理。

4. **异步依赖追踪**：`await` 之后读取的 state 不会被 `$effect` 追踪到，需要注意。

5. **TypeScript 支持**：`<script lang="ts">` 开启，推荐在组件中用 `interface Props` 定义 props 类型。

---

## 九、对 Engineer 的交接建议

- **脚手架命令**：`npx sv create homepage --template skeleton --types ts`
- **推荐依赖**：Tailwind CSS、`svelte-intersection-observer`（滚动动效）
- **端口配置**：`vite.config.js` 中设置 `server.port = 8080`
- **组件库参考**：shadcn-svelte（https://www.shadcn-svelte.com）

---

*研究完成。该报告已整合 Svelte 5 官方文档的核心内容，可直接作为开发参考使用。*
