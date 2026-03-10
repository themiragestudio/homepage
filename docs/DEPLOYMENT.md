# Homepage — 部署指南

**最后更新:** 2026-03-10
**维护者:** Mirage Engineer

---

## 环境要求

| 工具 | 版本要求 |
|------|----------|
| Node.js | >= 18 |
| npm | >= 9 |

## 环境变量

本项目当前无需环境变量配置。如后续添加，请创建 `.env` 文件：

```bash
# .env.example
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Mirage Studio
```

> ⚠️ **注意:** 不要把 `.env` 提交到 Git。

---

## 部署步骤

### 方式 1: 本地开发

```bash
cd "code/homepage-react"
npm install
npm run dev
# 访问: http://localhost:8080
```

### 方式 2: 生产构建 + 静态服务器

```bash
cd "code/homepage-react"
npm run build

# 使用 serve 托管
npm install -g serve
serve -s dist -l 8080
# 访问: http://localhost:8080
```

### 方式 3: Nginx 配置

```nginx
server {
    listen 80;
    server_name 42.192.51.42;
    root /path/to/homepage-react/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 方式 4: PM2 进程管理（推荐生产环境）

```bash
npm install -g pm2
cd "code/homepage-react"
npm run build
pm2 serve dist 8080 --name homepage --spa

# 管理命令
pm2 list              # 查看进程
pm2 logs homepage     # 查看日志
pm2 restart homepage  # 重启
pm2 stop homepage     # 停止
```

---

## 当前生产部署

| 环境 | 地址 | 状态 |
|------|------|------|
| 生产服务器 | http://42.192.51.42/ | ✅ 运行中 |
| 本地开发 | http://localhost:8080 | 手动启动 |

---

## 验证清单

部署完成后，逐项确认：

- [ ] 首页正常加载（HTTP 200）
- [ ] 静态资源加载无 404
- [ ] Hero 区域文字显示正常
- [ ] Features 3 个卡片全部显示
- [ ] 移动端布局正常（375px 宽度）
- [ ] 桌面端布局正常（1280px 宽度）
- [ ] 浏览器控制台无错误

---

## 回滚方案

```bash
# 保留当前构建作为备份
mv dist dist.backup.$(date +%Y%m%d)

# 出现问题时恢复
mv dist dist.broken
mv dist.backup.YYYYMMDD dist
```

---

## 故障排查

| 症状 | 排查步骤 |
|------|----------|
| 端口 8080 被占用 | `lsof -ti:8080 \| xargs kill -9` |
| 页面空白/白屏 | 检查浏览器控制台；确认 `dist/index.html` 存在 |
| 构建失败 | `rm -rf node_modules && npm install && npm run build` |
| Node 版本不对 | `node --version`；需要 >= 18 |
| 样式不生效 | 检查 Tailwind `content` 路径配置 |

---

**关联文档:** [技术文档](TECHNICAL.md) | [变更日志](../CHANGELOG.md)
