# 开发环境配置说明

**Engineer:** mirage-engineer  
**日期:** 2026-03-09

---

## 系统环境（已验证）

- macOS 26.2 (arm64 / Apple Silicon)
- Node.js v24.14.0
- pnpm 10.30.3
- Vite 7.3.1（npx 可用）

## 一键初始化脚本

将以下内容保存为 `setup.sh`，在 `code/` 目录下执行：

```bash
#!/bin/bash
set -e

PROJECT_DIR="/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code"
cd "$PROJECT_DIR"

echo "🚀 初始化 Mirage Studio Homepage..."

# 创建 SvelteKit 项目（非交互式，使用 skeleton + TypeScript）
pnpm create svelte@latest app -- --template skeleton --types typescript --no-prettier --no-eslint

cd app

# 安装核心依赖
pnpm install

# 安装 Tailwind CSS v4
pnpm add -D tailwindcss @tailwindcss/vite

echo "✅ 初始化完成！"
echo "👉 下一步: cd app && pnpm dev --port 8080"
```

## 手动步骤（推荐，可控制选项）

```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code"
pnpm create svelte@latest app
# 选择: Skeleton / TypeScript / ESLint+Prettier
cd app
pnpm install
pnpm add -D tailwindcss @tailwindcss/vite
pnpm dev --port 8080
```

## 验证清单

- [ ] `pnpm dev --port 8080` 启动无报错
- [ ] 浏览器访问 http://localhost:8080 显示 Svelte 默认页
- [ ] Tailwind 样式生效（测试 `class="text-red-500"`）
- [ ] TypeScript 类型检查通过（`pnpm check`）

## 常见问题

**端口被占用？**
```bash
lsof -i :8080 | grep LISTEN
kill -9 <PID>
```

**pnpm 权限问题？**
```bash
pnpm config set store-dir ~/.pnpm-store
```
