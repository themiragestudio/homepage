# Homepage — 技术文档

**版本:** 1.1.0
**最后更新:** 2026-03-10
**维护者:** Mirage Engineer | **QA:** Mirage Quality (Adrian Monk)

---

## 1. 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI 框架 |
| Vite | 7.x | 构建工具 |
| Tailwind CSS | 3.4.x | 样式框架 |
| PostCSS | 8.5.x | CSS 处理 |
| Autoprefixer | 10.4.x | 浏览器前缀 |
| Node.js | 24.14.0 | 运行环境 |
| npm | 11.9.0 | 包管理器 |

## 2. 架构概览

单页面应用（SPA），React 渲染，Vite 构建，Tailwind 负责全部样式。

```
code/homepage-react/
├── src/
│   ├── App.jsx             # 主页面组件（Hero + Features + Footer）
│   ├── main.jsx            # 应用入口
│   └── index.css           # Tailwind 指令 + 全局样式
├── public/                 # 静态资源（favicon 等）
├── dist/                   # 生产构建输出
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind 配置
├── postcss.config.js       # PostCSS 配置
└── package.json
```

**页面结构:**

```
App.jsx
├── <header>        导航栏
├── <section>       Hero 区域（主标题 + 副标语 + CTA）
├── <section>       Features 区域（3 个卡片）
└── <footer>        版权信息
```

## 3. 关键技术决策

### 决策 1: 从 Svelte 5 迁移至 React 18

**原因:**
- Svelte 5 存在运行时兼容性问题，影响生产部署
- React 18 生态更成熟，长期维护成本更低
- 团队对 React 更熟悉

**权衡:**
- 优点: 稳定可靠，丰富的社区资源，组件生态完善
- 缺点: 运行时体积略大于 Svelte 编译产物

### 决策 2: 保留 Vite + Tailwind CSS

**原因:**
- Vite 与 React 官方兼容良好
- Tailwind 样式类可直接复用，降低迁移工作量
- 整体构建链成熟稳定

## 4. 开发环境设置

**环境要求:**

| 工具 | 版本要求 |
|------|----------|
| Node.js | >= 18 |
| npm | >= 9 |

```bash
# 进入代码目录
cd "code/homepage-react"

# 安装依赖
npm install

# 启动开发服务器（默认端口 8080）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 5. 配置说明

| 配置文件 | 关键配置 |
|----------|----------|
| `vite.config.js` | 端口: 8080，React 插件 |
| `tailwind.config.js` | content 扫描: `./src/**/*.{js,jsx,ts,tsx}` |
| `postcss.config.js` | 插件: tailwindcss + autoprefixer |

## 6. 性能指标（生产构建）

| 指标 | 当前值 |
|------|--------|
| JS 体积 | ~27 KB (gzip: ~10.6 KB) |
| CSS 体积 | ~9 KB (gzip: ~2.5 KB) |
| 构建时间 | < 1s |
| 构建错误 | 0 |
| 构建警告 | 0 |

## 7. 已知技术债

- [ ] 缺少单元测试（P2）
- [ ] 缺少 SEO meta 标签（P2）
- [ ] 无 favicon（P2）
- [ ] 未配置 ESLint 规则（P2）

## 8. 扩展指南

### 添加新页面

1. 在 `src/` 创建新组件文件（如 `About.jsx`）
2. 安装 React Router：`npm install react-router-dom`
3. 在 `main.jsx` 配置路由
4. 在导航栏添加链接

### 添加新 Tailwind 颜色

在 `tailwind.config.js` 的 `theme.extend.colors` 中添加自定义颜色。

---

**关联文档:** [部署指南](DEPLOYMENT.md) | [变更日志](../CHANGELOG.md)
