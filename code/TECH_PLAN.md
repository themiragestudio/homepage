# Mirage Studio Homepage — 技术方案

**负责人：** Engineer (mirage-engineer)  
**日期：** 2026-03-09  
**阶段：** Phase 2 — Planning & Design

---

## 1. 环境评估结果

| 工具 | 版本 | 状态 |
|------|------|------|
| Node.js | v24.14.0 | ✅ 可用 |
| npm | 11.9.0 | ✅ 可用 |
| pnpm | 10.30.3 | ✅ 推荐使用 |
| Vite | 7.3.1 | ✅ 可用 |
| create-svelte | 7.0.1 | ✅ 可用 |
| bun | — | ❌ 未安装（不影响） |
| 操作系统 | macOS 26.2 arm64 | ✅ Apple Silicon |

**结论：** 开发环境就绪，无需额外安装。推荐用 `pnpm` 作为包管理器（速度快、磁盘占用低）。

---

## 2. 技术栈选型

### 核心框架
- **Svelte 5** — 使用最新的 Runes 响应式系统（`$state`, `$derived`, `$effect`）
- **SvelteKit** — 基于 Vite，SSR/SSG/SPA 均支持；首页场景用 **SPA 模式**（adapter-static）

### 构建工具
- **Vite 7** — 已确认可用，HMR 极快，开发体验优秀

### 样式方案
- **Tailwind CSS v4** — 与 SvelteKit 官方集成良好，原子类减少命名心智负担
- 配合 `@tailwindcss/vite` 插件（v4 新方式，无需 postcss 配置）

### 语言
- **TypeScript** — 增加代码可维护性，SvelteKit 模板默认支持

### 包管理
- **pnpm 10** — monorepo-friendly，lock 文件稳定

### 目标端口
- **8080**（开发服务器 `--port 8080`，已在 vite.config 中固定）

---

## 3. 项目架构设计

```
homepage/
├── src/
│   ├── app.html              # HTML 壳
│   ├── app.css               # 全局样式（Tailwind entry）
│   ├── lib/
│   │   ├── components/       # 可复用 UI 组件
│   │   │   ├── Hero.svelte
│   │   │   ├── Nav.svelte
│   │   │   ├── Features.svelte
│   │   │   └── Footer.svelte
│   │   └── utils/            # 工具函数
│   └── routes/
│       └── +page.svelte      # 首页（唯一路由）
├── static/                   # 静态资源（图片、favicon）
├── vite.config.ts
├── svelte.config.js
├── tailwind.config.js        # (可选，v4 大部分配置内联)
├── tsconfig.json
└── package.json
```

### 组件划分（首页）

| 组件 | 职责 |
|------|------|
| `Nav.svelte` | 顶部导航栏，Logo + 菜单 |
| `Hero.svelte` | 首屏大图/标语，CTA 按钮 |
| `Features.svelte` | 功能/特性卡片区块 |
| `Footer.svelte` | 页脚，版权 + 链接 |

---

## 4. 初始化命令（可直接执行）

```bash
# 进入项目目录
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code"

# 创建 SvelteKit 项目（交互式 → 选 Skeleton + TypeScript + ESLint）
pnpm create svelte@latest app

cd app

# 安装依赖
pnpm install

# 安装 Tailwind CSS v4（Vite 插件方式）
pnpm add -D tailwindcss @tailwindcss/vite

# 启动开发服务器（端口 8080）
pnpm dev --port 8080
```

> **注意：** `create svelte` 会交互式询问选项，建议选：
> - Template: **Skeleton project**
> - Type checking: **TypeScript**
> - Additional: **ESLint** + **Prettier**

---

## 5. vite.config.ts 配置方案

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    port: 8080,
    strictPort: true,   // 端口被占用时直接报错，不自动换端口
  },
  preview: {
    port: 8080,
  },
});
```

---

## 6. svelte.config.js 配置方案

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: 'index.html',   // SPA 模式
    }),
  },
};

export default config;
```

---

## 7. 开发规范

- **组件文件名：** PascalCase（`Hero.svelte`）
- **路由文件：** SvelteKit 约定（`+page.svelte`, `+layout.svelte`）
- **样式：** 优先 Tailwind 原子类，组件内 `<style>` 仅用于复杂动画/特殊情况
- **响应式：** Mobile-first，断点使用 Tailwind 标准（`sm/md/lg/xl`）
- **Git：** 每个功能模块一个 commit，message 格式 `feat: add Hero component`

---

## 8. 里程碑计划

| 步骤 | 任务 | 预估时间 |
|------|------|---------|
| M1 | 脚手架初始化 + 端口配置 | 10 min |
| M2 | Tailwind 集成验证 | 10 min |
| M3 | Nav + Hero 组件实现 | 30 min |
| M4 | Features + Footer 组件 | 20 min |
| M5 | 样式打磨 + 响应式适配 | 30 min |
| M6 | 构建验证 + 端口 8080 确认 | 10 min |

**总计：** ~2 小时可完成 Phase 3 核心开发

---

## 9. 待确认事项（需 Manager/Researcher 输入）

- [ ] **品牌信息：** Mirage Studio 的 Logo、配色方案、Slogan
- [ ] **页面内容：** Hero 区域文案、Features 列表内容
- [ ] **设计参考：** 是否有 Figma 稿或参考网站
- [ ] **Researcher 输出：** 是否有 Svelte 最佳实践文档可参考

---

*方案由 Engineer 评估后输出，待 Manager 审核后进入 Phase 3 实施阶段。*
