# HomePage Project - Deployment Guide

## 快速部署

### 当前状态

✅ **开发服务器已运行**
- URL: http://localhost:8080
- 进程: 后台运行
- 热更新: 已启用

## 部署选项

### 选项 1: 开发服务器（当前）

**优点:**
- 即时热更新
- 开发工具集成
- 快速迭代

**缺点:**
- 不适合生产环境
- 需要保持终端运行

**命令:**
```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-app"
npm run dev
```

### 选项 2: 生产构建 + 静态服务器

**步骤:**

1. **构建项目**
```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-app"
npm run build
```

2. **安装静态服务器**
```bash
npm install -g serve
```

3. **启动服务器**
```bash
serve -s dist -l 8080
```

**优点:**
- 优化的生产代码
- 更快的加载速度
- 稳定可靠

### 选项 3: PM2 进程管理

**安装 PM2:**
```bash
npm install -g pm2
```

**启动开发服务器:**
```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage/code/homepage-app"
pm2 start "npm run dev" --name homepage-dev
```

**或启动生产服务器:**
```bash
npm run build
pm2 serve dist 8080 --name homepage-prod --spa
```

**管理命令:**
```bash
pm2 list              # 查看进程
pm2 logs homepage     # 查看日志
pm2 restart homepage  # 重启
pm2 stop homepage     # 停止
pm2 delete homepage   # 删除
```

**优点:**
- 自动重启
- 日志管理
- 后台运行
- 开机自启

### 选项 4: Docker 容器化

**Dockerfile:**
```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
```

**构建和运行:**
```bash
docker build -t mirage-homepage .
docker run -d -p 8080:8080 --name homepage mirage-homepage
```

## 访问方式

### 本地访问
```
http://localhost:8080
```

### 局域网访问
```
http://[本机IP]:8080
```

查看本机 IP:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 公网访问（需要配置）

1. **使用 ngrok:**
```bash
ngrok http 8080
```

2. **使用 Cloudflare Tunnel:**
```bash
cloudflared tunnel --url http://localhost:8080
```

## 监控和维护

### 检查服务状态

**开发服务器:**
```bash
curl http://localhost:8080
```

**查看进程:**
```bash
lsof -i :8080
```

### 日志查看

**开发服务器日志:**
查看启动终端输出

**PM2 日志:**
```bash
pm2 logs homepage
```

### 重启服务

**开发服务器:**
1. 找到进程: `lsof -ti:8080`
2. 终止进程: `kill [PID]`
3. 重新启动: `npm run dev`

**PM2:**
```bash
pm2 restart homepage
```

## 故障排查

### 端口被占用

```bash
# 查找占用进程
lsof -ti:8080

# 终止进程
lsof -ti:8080 | xargs kill -9

# 或使用其他端口
npm run dev -- --port 8081
```

### 页面无法访问

1. 检查服务器是否运行
2. 检查防火墙设置
3. 检查端口配置
4. 查看错误日志

### 构建失败

```bash
# 清理缓存
rm -rf node_modules package-lock.json dist

# 重新安装
npm install

# 重新构建
npm run build
```

## 性能优化

### 生产构建优化

已包含在 Vite 默认配置中:
- 代码压缩
- Tree shaking
- 资源优化
- 懒加载

### CDN 加速

将 `dist/` 目录部署到 CDN:
- Cloudflare Pages
- Vercel
- Netlify
- AWS S3 + CloudFront

### 缓存策略

在 Nginx 或 CDN 配置中添加:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 安全建议

1. **HTTPS**: 使用 SSL 证书
2. **防火墙**: 限制访问来源
3. **更新依赖**: 定期运行 `npm audit`
4. **环境变量**: 敏感信息不要硬编码

## 备份和恢复

### 备份代码
```bash
cd "/Users/sysadmin/.openclaw/Mirage Studio/Projects/homepage"
tar -czf homepage-backup-$(date +%Y%m%d).tar.gz code/
```

### 恢复代码
```bash
tar -xzf homepage-backup-YYYYMMDD.tar.gz
cd code/homepage-app
npm install
npm run dev
```

## 下一步

1. ✅ 开发服务器已运行
2. ⏭️ 测试页面功能
3. ⏭️ 选择部署方式
4. ⏭️ 配置域名（可选）
5. ⏭️ 设置监控（可选）

---

**当前部署状态:** 开发服务器运行中  
**访问地址:** http://localhost:8080  
**最后更新:** 2026-03-09
