# React 迁移技术调研报告

**作者：** Researcher (mirage.researcher)  
**日期：** 2026-03-09  
**任务：** Svelte 5 → React 迁移支持  
**优先级：** P0

---

## 一、项目现状

| 项目 | 现状 |
|------|------|
| Svelte 源码 | `code/homepage-app/src/App.svelte`，164 行，结构清晰 |
| React 骨架 | `code/homepage-react/` 已由 Engineer 创建，React 19 + Vite 7 |
| 缺失项 | Tailwind CSS 未安装、`App.jsx` 仍是默认模板、端口未配置 |

**注意**：项目已安装的是 **React 19**（`"react": "^19.2.0"`），不是 React 18。两者 API 基本一致，本文档统称"React 现代版"，迁移方式相同。

---

## 二、立即可执行：补全 React 项目配置

### 2.1 安装 Tailwind CSS

```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-react"
npm install tailwindcss @tailwindcss/vite
```

### 2.2 更新 `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 8080,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // 代码分割：vendor 单独打包
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
```

### 2.3 更新 `src/index.css`（入口 CSS）

```css
@import "tailwindcss";

@theme {
  --color-indigo-600: #4f46e5;
  --color-indigo-50:  #eef2ff;
  --color-indigo-200: #c7d2fe;
  --color-emerald-500: #10b981;
  --font-sans: system-ui, -apple-system, sans-serif;
}

@layer base {
  html { scroll-behavior: smooth; }
  * { box-sizing: border-box; }
}
```

### 2.4 更新 `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 三、Svelte → React 语法对照

### 3.1 响应式状态

```svelte
<!-- Svelte 5 -->
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
<button onclick={() => count++}>{count}</button>
```

```jsx
// React
import { useState, useMemo } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const doubled = useMemo(() => count * 2, [count]);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**对照关系：**

| Svelte 5 | React Hook | 说明 |
|----------|-----------|------|
| `$state(value)` | `useState(value)` | 基础响应式状态 |
| `$derived(expr)` | `useMemo(() => expr, [deps])` | 派生计算值 |
| `$effect(() => {...})` | `useEffect(() => {...}, [deps])` | 副作用 |
| `$props()` | 函数参数解构 `({ prop })` | 组件 Props |
| `setContext` / `getContext` | `React.createContext` + `useContext` | 跨层传值 |

### 3.2 模板语法

```svelte
<!-- Svelte：条件渲染 -->
{#if show}
  <div>可见</div>
{/if}

<!-- Svelte：列表渲染 -->
{#each items as item}
  <div>{item.name}</div>
{/each}
```

```jsx
// React：条件渲染
{show && <div>可见</div>}
// 或
{show ? <div>可见</div> : null}

// React：列表渲染
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### 3.3 样式绑定（关键差异）

```svelte
<!-- Svelte：动态 style 直接插值 -->
<div style="background: {member.color}">
```

```jsx
// React：style 是对象，驼峰命名
<div style={{ background: member.color }}>

// 类名：用 className（不是 class）
<div className="text-indigo-600 font-bold">
```

### 3.4 事件绑定

```svelte
<!-- Svelte 5 -->
<button onclick={() => doSomething()}>点击</button>
```

```jsx
// React：驼峰命名
<button onClick={() => doSomething()}>点击</button>
```

---

## 四、App.svelte → App.jsx 完整迁移参考

基于现有 `App.svelte`（164 行），以下是对应的 React 版本：

```jsx
// src/App.jsx
import { useMemo } from 'react';

const teamMembers = [
  {
    id: 'creator',
    name: 'Creator',
    role: 'Founder & Director',
    description: 'Visionary leader and project overseer.',
    expertise: ['Strategic Planning', 'Research Direction'],
    color: '#4F46E5',
  },
  {
    id: 'roy-batty',
    name: 'Roy Batty',
    role: 'Lead Researcher',
    description: 'Directs specialized research initiatives.',
    expertise: ['Behavioral Research', 'Data Analysis'],
    color: '#10B981',
  },
  {
    id: 'mirage-manager',
    name: 'Mirage Manager',
    role: 'Operations Director',
    description: 'Coordinates team workflows and timelines.',
    expertise: ['Team Coordination', 'Process Optimization'],
    color: '#F59E0B',
  },
];

const activeProjects = [
  {
    id: 'emma-training',
    name: 'Emma Training Project',
    status: 'Active',
    lead: 'Roy Batty',
    progress: 85,
  },
  {
    id: 'mirage-homepage',
    name: 'Mirage Studio Website',
    status: 'Active',
    lead: 'Mirage Manager',
    progress: 90,
  },
];

// 子组件：团队成员卡片
function MemberCard({ member }) {
  const initials = member.name.split(' ').map(n => n[0]).join('');
  return (
    <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4"
        style={{ background: member.color }}
      >
        {initials}
      </div>
      <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
      <div className="text-indigo-600 font-medium mb-4">{member.role}</div>
      <p className="text-gray-500 mb-4">{member.description}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {member.expertise.map(skill => (
          <span
            key={skill}
            className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs text-indigo-600"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// 子组件：项目卡片
function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
          {project.status}
        </span>
        <span className="text-sm text-gray-500">Lead: {project.lead}</span>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">{project.name}</h3>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-700"
          style={{ width: `${project.progress}%` }}
        />
      </div>
      <div className="text-sm text-gray-500 text-right">{project.progress}% Complete</div>
    </div>
  );
}

// 主组件
export default function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="max-w-6xl mx-auto px-8">
      {/* 导航栏 */}
      <nav className="py-6 bg-white border-b border-gray-200 -mx-8 px-8 mb-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">Mirage Studio</span>
            <span className="text-xs text-gray-500">Research Collective</span>
          </div>
          <div className="hidden md:flex gap-8">
            {['About', 'Team', 'Projects', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-500 font-medium no-underline hover:text-indigo-600 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 主标题区域 */}
      <section className="py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Intelligent Research Through{' '}
            <span className="text-indigo-600">Collaborative Expertise</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            A specialized research collective combining methodological rigor with structured teamwork.
          </p>
          <div className="flex justify-center gap-12 mt-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">{teamMembers.length}</div>
              <div className="text-sm text-gray-500">Team Members</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">{activeProjects.length}</div>
              <div className="text-sm text-gray-500">Active Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* 团队架构 */}
      <section className="py-16 bg-white -mx-8 px-8" id="team">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Team Structure</h2>
          <p className="text-center text-gray-500 mb-12">A carefully organized collective of specialists</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="py-16" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Active Projects</h2>
          <p className="text-center text-gray-500 mb-12">Current research initiatives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200 -mx-8 px-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-xl font-bold text-gray-900">Mirage Studio</div>
              <p className="text-gray-500 text-sm">Research · Collaboration · Excellence</p>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} Mirage Studio Research Collective
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
```

---

## 五、性能优化策略

### 5.1 代码分割（当前项目规模无需过度设计）

当前 App 是单页面、无路由，React 本身已通过 Vite 做了 vendor 分割。
以下方案在项目规模增大时使用：

```jsx
// 懒加载重型组件（如有图表、地图）
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./components/Chart'));

function App() {
  return (
    <Suspense fallback={<div className="animate-pulse h-40 bg-gray-100 rounded-xl" />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### 5.2 避免不必要的重渲染

```jsx
import { memo, useCallback } from 'react';

// memo：props 未变时跳过重渲染
const MemberCard = memo(function MemberCard({ member }) {
  // ...
});

// useCallback：稳定化事件处理函数引用
const handleClick = useCallback(() => {
  setSelected(id);
}, [id]);
```

### 5.3 构建产物优化（`vite.config.js`）

```js
build: {
  // 移除 console.log（生产环境）
  minify: 'esbuild',
  esbuildOptions: {
    drop: ['console', 'debugger'],
  },
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
      },
      // 资源文件分类
      assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
    },
  },
},
```

### 5.4 图片优化（如有）

```jsx
// 懒加载图片
<img
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
  className="w-full h-auto"
/>
```

---

## 六、生产部署配置

### 6.1 构建命令

```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-react"
npm run build
# 产物在 dist/ 目录
```

### 6.2 静态文件服务（当前服务器方案）

```bash
# 用 serve（已在项目中使用）
npx serve -s dist -l 8080

# 或用 Python（无需安装）
cd dist && python3 -m http.server 8080
```

### 6.3 Nginx 配置（如服务器使用 Nginx）

```nginx
server {
    listen 80;
    server_name 42.192.51.42;

    root /var/www/homepage/dist;
    index index.html;

    # SPA 路由支持（所有路径回退到 index.html）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源长缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
```

### 6.4 `index.html` 检查（SEO / 性能）

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO -->
    <title>Mirage Studio - Research Collective</title>
    <meta name="description" content="A specialized research collective combining methodological rigor with structured teamwork." />
    
    <!-- 性能：预连接 -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 七、关键注意事项

### ⚠️ Tailwind 动态 class 陷阱（React 同样适用）

```jsx
// ❌ Tailwind 扫描不到动态拼接
<div className={`text-${color}-600`}>

// ✅ 完整类名 + 条件逻辑
<div className={color === 'indigo' ? 'text-indigo-600' : 'text-emerald-600'}>

// ✅ 用 inline style 处理真正的动态值（如 member.color）
<div style={{ background: member.color }}>
```

### ⚠️ JSX 中 `class` → `className`

Svelte / HTML 用 `class`，React JSX 必须用 `className`。这是最常见的迁移错误。

### ⚠️ 自闭合标签

```jsx
// React JSX 要求所有标签显式关闭
<input />   // ✅
<input>     // ❌ 会报错
<img src="..." alt="" />  // ✅
```

### ⚠️ React 19 vs React 18

本项目安装的是 React 19，与 React 18 的主要区别：
- `useTransition` / `useDeferredValue` 性能改进
- Actions：支持 async 函数直接传给 `<form action>`
- 对当前首页项目**无影响**，Hooks 用法完全一致

---

## 八、Engineer 执行清单

按顺序执行，预计 30-45 分钟完成：

```bash
# 1. 进入 React 项目目录
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-react"

# 2. 安装 Tailwind
npm install tailwindcss @tailwindcss/vite

# 3. 替换 vite.config.js（见第二节）

# 4. 替换 src/index.css（见第二节）

# 5. 替换 src/App.jsx（见第四节完整代码）

# 6. 开发验证
npm run dev
# 访问 http://localhost:8080 确认页面正常

# 7. 生产构建
npm run build

# 8. 本地验证构建产物
npx serve -s dist -l 8080

# 9. 部署
# 参考 deploy-to-server.sh，dist/ 目录上传至服务器
```

---

## 九、依赖版本锁定

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.x",
    "@vitejs/plugin-react": "^5.1.1",
    "tailwindcss": "^4.x",
    "vite": "^7.3.1"
  }
}
```

无需安装 `clsx` / `react-router-dom` / 状态管理库——当前项目是静态展示页，复杂度不需要这些。

---

*报告完成时间：2026-03-09 23:xx | 覆盖：配置 + 语法转换 + 完整 App.jsx + 部署方案*
