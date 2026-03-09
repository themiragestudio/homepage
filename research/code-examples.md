# Tailwind + Svelte 代码示例集

**作者：** Researcher (mirage.researcher)  
**日期：** 2026-03-09  
**项目：** Mirage Studio 首页

---

## 一、常见 CSS 模式 → Tailwind 等价写法

### 1.1 水平居中容器

```svelte
<!-- 传统 CSS -->
<div style="max-width:1280px; margin:0 auto; padding:0 2rem">

<!-- Tailwind：推荐加响应式 padding -->
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

### 1.2 垂直水平居中

```svelte
<!-- Flexbox 居中 -->
<div class="flex min-h-screen items-center justify-center">

<!-- Grid 居中 -->
<div class="grid min-h-screen place-items-center">
```

### 1.3 卡片

```svelte
<!-- 基础卡片 -->
<div class="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5
            dark:bg-gray-800 dark:ring-white/10">

<!-- 悬浮卡片（hover 上浮） -->
<div class="rounded-2xl bg-white p-6 shadow-md transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl cursor-pointer">
```

### 1.4 毛玻璃导航

```svelte
<!-- 透明毛玻璃 -->
<nav class="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
            border-b border-black/5 dark:border-white/10">
```

### 1.5 渐变文字

```css
/* app.css 中添加一次 */
@layer utilities {
  .text-gradient {
    background: linear-gradient(135deg, var(--color-brand-500), #a855f7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
```

```svelte
<h1 class="text-gradient text-5xl font-bold">Mirage Studio</h1>
```

### 1.6 响应式文字大小（流体排版）

```svelte
<!-- 用 clamp 实现流体文字，任意值语法 -->
<h1 class="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-tight">
  大标题文字
</h1>

<!-- 或用响应式断点 -->
<h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
  大标题文字
</h1>
```

### 1.7 文字截断

```svelte
<p class="truncate max-w-xs">单行截断...</p>
<p class="line-clamp-3">多行截断，超过3行显示省略号...</p>
```

### 1.8 宽高比

```svelte
<div class="aspect-video overflow-hidden rounded-xl">  <!-- 16:9 -->
<div class="aspect-square overflow-hidden rounded-full">  <!-- 1:1 圆形 -->
```

---

## 二、首页核心组件

### 2.1 导航栏（Header.svelte）

```svelte
<script>
  import { page } from '$app/stores';
  import { isDark, toggleTheme } from '$lib/stores/theme.svelte.js';

  let scrolled = $state(false);

  $effect(() => {
    const onScroll = () => { scrolled = window.scrollY > 10; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const navLinks = [
    { href: '#features', label: '功能' },
    { href: '#works',    label: '作品' },
    { href: '#about',   label: '关于' },
    { href: '#contact', label: '联系' },
  ];
</script>

<header class="fixed top-0 z-50 w-full transition-all duration-300
               {scrolled
                 ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-black/5 dark:border-white/5'
                 : 'bg-transparent'}">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="text-xl font-bold text-gradient">Mirage Studio</a>

      <!-- Nav Links（桌面端） -->
      <ul class="hidden md:flex items-center gap-8">
        {#each navLinks as link}
          <li>
            <a href={link.href}
               class="text-sm font-medium text-gray-600 hover:text-gray-900
                      dark:text-gray-300 dark:hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        {/each}
      </ul>

      <!-- 右侧按钮 -->
      <div class="flex items-center gap-3">
        <!-- 暗色模式切换 -->
        <button
          onclick={toggleTheme}
          class="rounded-full p-2 text-gray-500 hover:bg-gray-100
                 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          aria-label="切换主题"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <!-- CTA 按钮 -->
        <a href="#contact"
           class="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white
                  hover:bg-brand-600 transition-colors focus:outline-none
                  focus:ring-2 focus:ring-brand-500/50">
          联系我们
        </a>
      </div>
    </div>
  </nav>
</header>
```

### 2.2 Hero Section（Hero.svelte）

```svelte
<script>
  import { fly, fade } from 'svelte/transition';
</script>

<section class="relative min-h-screen flex items-center overflow-hidden bg-gray-50 dark:bg-gray-950">
  <!-- 背景装饰 -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full
                bg-brand-500/10 blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full
                bg-purple-500/10 blur-3xl"></div>
  </div>

  <!-- 内容 -->
  <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
    <div class="max-w-3xl" in:fly={{ y: 30, duration: 600, delay: 100 }}>
      <!-- Badge -->
      <span class="inline-flex items-center gap-2 rounded-full border border-brand-200
                   bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700
                   dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300 mb-6">
        <span class="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse"></span>
        现已开放合作
      </span>

      <!-- 主标题 -->
      <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight
                 text-gray-900 dark:text-white mb-6">
        创意设计<br>
        <span class="text-gradient">赋能数字未来</span>
      </h1>

      <!-- 副标题 -->
      <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
        Mirage Studio 专注于品牌设计、网站开发与数字体验创作，
        将创意与技术完美融合。
      </p>

      <!-- CTA 按钮组 -->
      <div class="flex flex-wrap gap-4">
        <a href="#works"
           class="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3
                  text-base font-semibold text-white hover:bg-brand-600
                  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
                  hover:shadow-brand-500/25 focus:outline-none focus:ring-2 focus:ring-brand-500/50">
          查看作品
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
        <a href="#contact"
           class="inline-flex items-center gap-2 rounded-xl border border-gray-200
                  px-6 py-3 text-base font-semibold text-gray-700
                  hover:border-gray-300 hover:bg-gray-50
                  dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800
                  transition-colors focus:outline-none">
          开始合作
        </a>
      </div>
    </div>
  </div>
</section>
```

### 2.3 Features Section（Features.svelte）

```svelte
<script>
  const features = [
    {
      icon: '🎨',
      title: '品牌设计',
      desc: '从 Logo 到品牌规范，打造独特的视觉识别系统。',
    },
    {
      icon: '💻',
      title: '网站开发',
      desc: '高性能、响应式网站，兼顾用户体验与 SEO。',
    },
    {
      icon: '✨',
      title: '数字体验',
      desc: '交互动效与创意体验，让品牌在数字世界发光。',
    },
  ];
</script>

<section id="features" class="py-24 bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- 标题 -->
    <div class="text-center mb-16">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        我们的服务
      </h2>
      <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
        专业团队，全方位数字创意服务
      </p>
    </div>

    <!-- 卡片网格 -->
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <div class="group rounded-2xl border border-gray-100 bg-white p-8
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                    hover:border-brand-100 hover:shadow-brand-500/5
                    dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-brand-800">
          <!-- 图标 -->
          <div class="mb-6 inline-flex h-12 w-12 items-center justify-center
                      rounded-xl bg-brand-50 text-2xl
                      dark:bg-brand-900/30 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <!-- 标题 -->
          <h3 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {feature.title}
          </h3>
          <!-- 描述 -->
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
```

### 2.4 通用 Button 组件（Button.svelte）

```svelte
<script>
  let {
    variant = 'primary',  // primary | outline | ghost | danger
    size = 'md',          // sm | md | lg
    disabled = false,
    loading = false,
    onclick,
    children,
  } = $props();

  const variantClasses = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-brand-500/25',
    outline: 'border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20',
    ghost:   'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    danger:  'bg-red-500 text-white hover:bg-red-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-xl gap-2',
  };
</script>

<button
  class="inline-flex items-center justify-center font-medium transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-brand-500/50
         disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
         hover:-translate-y-px active:translate-y-0
         {variantClasses[variant]} {sizeClasses[size]}"
  {disabled}
  {onclick}
>
  {#if loading}
    <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  {/if}
  {@render children?.()}
</button>
```

---

## 三、响应式设计实现模式

### 3.1 响应式网格

```svelte
<!-- 1 列 → 2 列 → 3 列 → 4 列 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

<!-- 不规则网格（首图大） -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="md:col-span-2 lg:col-span-2">大卡片</div>
  <div>小卡片</div>
  <div>小卡片</div>
  <div>小卡片</div>
</div>
```

### 3.2 移动端汉堡菜单

```svelte
<script>
  let menuOpen = $state(false);
</script>

<!-- 汉堡按钮（仅移动端显示） -->
<button
  class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300"
  onclick={() => menuOpen = !menuOpen}
  aria-label="菜单"
>
  <div class="space-y-1.5 transition-all">
    <span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? 'translate-y-2 rotate-45' : ''}"></span>
    <span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? 'opacity-0' : ''}"></span>
    <span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
  </div>
</button>

<!-- 移动端菜单（抽屉） -->
{#if menuOpen}
  <div class="md:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900
              border-b border-gray-100 dark:border-gray-800 px-4 py-6">
    <!-- 菜单项 -->
  </div>
{/if}
```

### 3.3 响应式字体大小参考

```
text-xs    → 12px
text-sm    → 14px
text-base  → 16px（正文基准）
text-lg    → 18px
text-xl    → 20px
text-2xl   → 24px
text-3xl   → 30px
text-4xl   → 36px
text-5xl   → 48px
text-6xl   → 60px
text-7xl   → 72px（大标题）
```

### 3.4 间距速查

```
p-1  →  4px     p-2  →  8px     p-3  → 12px
p-4  → 16px     p-5  → 20px     p-6  → 24px
p-8  → 32px     p-10 → 40px     p-12 → 48px
p-16 → 64px     p-20 → 80px     p-24 → 96px
```

---

## 四、动画与过渡

### 4.1 Tailwind 内置过渡

```svelte
<!-- 颜色过渡 -->
<button class="bg-brand-500 hover:bg-brand-600 transition-colors duration-200">

<!-- 变换过渡（上浮效果） -->
<div class="hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

<!-- 透明度过渡 -->
<div class="opacity-0 hover:opacity-100 transition-opacity duration-300">

<!-- group-hover 联动 -->
<div class="group">
  <div class="group-hover:scale-105 transition-transform duration-300">
    <img src="..." alt="" />
  </div>
  <p class="opacity-0 group-hover:opacity-100 transition-opacity">描述</p>
</div>
```

### 4.2 Svelte transition + Tailwind 混用

```svelte
<script>
  import { fly, fade, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  let visible = $state(false);
</script>

<!-- Svelte 控制进出动画，Tailwind 控制静态样式 -->
{#if visible}
  <div
    class="rounded-2xl bg-white p-8 shadow-xl"
    in:fly={{ y: 20, duration: 400, easing: cubicOut }}
    out:fade={{ duration: 200 }}
  >
    内容
  </div>
{/if}
```

### 4.3 滚动触发动画（Intersection Observer）

```svelte
<script>
  import { onMount } from 'svelte';

  let sections = [];
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<!-- app.css 中定义动画 -->
```
```css
@layer utilities {
  .animate-target {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animate-target.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}
```
```svelte
<div class="animate-target" bind:this={sections[0]}>
  滚动时出现的内容
</div>
```

---

*代码示例均基于 Svelte 5 + SvelteKit + Tailwind CSS v4，直接可用。*
