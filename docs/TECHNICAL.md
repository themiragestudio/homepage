# HomePage Project - Technical Documentation

## 项目概览

**项目名称:** Mirage Studio HomePage  
**技术栈:** Svelte + Vite  
**端口:** 8080  
**状态:** ✅ 开发服务器运行中

## 技术决策

### 为什么选择 Svelte？

1. **轻量级**: 编译时框架，无运行时开销
2. **简单**: 语法直观，学习曲线平缓
3. **快速**: 性能优异，适合简单首页
4. **现代化**: 支持响应式设计和组件化

### 为什么选择 Vite？

1. **快速启动**: 基于 ESM 的开发服务器
2. **热更新**: 即时反馈开发体验
3. **简单配置**: 开箱即用
4. **官方支持**: Svelte 官方推荐

## 项目结构

```
homepage-app/
├── src/
│   ├── App.svelte          # 主页面组件
│   ├── main.js             # 入口文件
│   └── assets/             # 静态资源
├── public/                 # 公共文件
├── vite.config.js          # Vite 配置（端口 8080）
└── package.json            # 依赖管理
```

## 首页设计

### 布局结构

1. **Hero Section**: 品牌展示区
   - 标题: "🌟 Mirage Studio"
   - 标语: "Building the Future with AI"

2. **Features Section**: 特性展示（3列网格）
   - 🎯 Strategic: 战略规划
   - ⚡ Fast: 快速交付
   - 🤖 AI-Powered: AI 驱动

3. **Footer**: 版权信息

### 设计特点

- **渐变背景**: 紫色渐变（#667eea → #764ba2）
- **玻璃态效果**: 半透明卡片 + 模糊背景
- **响应式设计**: 自适应网格布局
- **交互动画**: 悬停效果和阴影

## 开发环境

### 依赖版本

- Node.js: v24.14.0
- npm: 11.9.0
- Vite: 最新版本
- Svelte: 最新版本

### 启动命令

```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-app"
npm run dev
```

服务器将在 http://localhost:8080 启动

### 构建命令

```bash
npm run build
```

生产构建输出到 `dist/` 目录

## 部署说明

### 开发环境部署

当前已运行在 8080 端口，可通过以下方式访问：
- 本地: http://localhost:8080
- 局域网: http://[本机IP]:8080

### 生产环境部署

1. **构建项目**:
   ```bash
   npm run build
   ```

2. **使用静态服务器**:
   ```bash
   npm install -g serve
   serve -s dist -l 8080
   ```

3. **或使用 Nginx**:
   ```nginx
   server {
       listen 8080;
       root /path/to/dist;
       index index.html;
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## 最佳实践

### 代码组织

- ✅ 单文件组件（SFC）
- ✅ 响应式变量使用 `let`
- ✅ 样式封装在组件内
- ✅ 全局样式使用 `:global()`

### 性能优化

- ✅ 编译时优化（Svelte 特性）
- ✅ 按需加载资源
- ✅ CSS 作用域隔离
- ✅ 最小化运行时代码

### 可维护性

- ✅ 清晰的文件结构
- ✅ 语义化的 HTML
- ✅ 可读的 CSS 类名
- ✅ 注释关键逻辑

## 扩展建议

### 短期优化

1. 添加页面标题和 favicon
2. 添加 SEO meta 标签
3. 添加 Google Analytics
4. 优化移动端体验

### 长期规划

1. 添加路由（SvelteKit）
2. 添加更多页面（关于、联系等）
3. 集成 CMS 系统
4. 添加多语言支持

## 问题排查

### 端口被占用

```bash
lsof -ti:8080 | xargs kill -9
```

### 依赖问题

```bash
rm -rf node_modules package-lock.json
npm install
```

### 构建失败

检查 Node.js 版本是否 >= 18

## 团队协作

### 研究员贡献

- Svelte 框架研究
- 设计模式建议
- 最佳实践文档

### 工程师贡献

- 项目搭建
- 代码实现
- 配置优化

### 助理贡献

- 文档编写
- 进度跟踪
- 质量保证

---

**文档版本:** 1.0  
**最后更新:** 2026-03-09  
**维护者:** Mirage Manager
