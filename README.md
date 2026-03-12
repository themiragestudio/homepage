# Mirage Studio Homepage

> Mirage Studio 官方首页，展示品牌、核心能力与研究成果。

**状态:** ✅ 已完成（React 版本运行中）
**版本:** 1.1.0
**技术栈:** React 18 + Vite 7 + Tailwind CSS 3
**访问地址:** GitHub Pages: https://themiragestudio.github.io/homepage/ | 本地开发: http://localhost:8080

---

## 快速开始

```bash
# 进入代码目录
cd "code/homepage-react"

# 安装依赖
npm install

# 启动开发服务器（端口 8080）
npm run dev

# 生产构建
npm run build
```

## 项目结构

```
homepage/
├── README.md               # 本文件
├── CHANGELOG.md            # 版本历史
├── code/
│   └── homepage-react/     # 当前活跃代码（React）
│       ├── src/            # 源代码
│       ├── public/         # 静态资源
│       ├── dist/           # 构建输出
│       └── package.json
├── docs/
│   ├── TECHNICAL.md        # 技术文档
│   └── DEPLOYMENT.md       # 部署指南
├── research/               # 技术调研资料
└── deliverables/           # 历史交付报告
```

## 功能列表

- ✅ Hero 区域（品牌展示 + 标语）
- ✅ Features 区域（3 个核心能力卡片）
- ✅ 响应式布局（桌面 + 移动端）
- ✅ 现代渐变设计风格
- ✅ Tailwind CSS 样式系统
- ✅ 生产构建 + 服务器部署

## 文档导航

| 文档 | 说明 |
|------|------|
| [技术文档](docs/TECHNICAL.md) | 技术栈、架构、开发环境 |
| [部署指南](docs/DEPLOYMENT.md) | 本地开发到生产部署全流程 |
| [变更日志](CHANGELOG.md) | 版本历史与变更记录 |
| [部署运维手册](DEPLOYMENT_RUNBOOK.md) | 🚨 紧急故障处理与回滚流程 |
| [快速参考](QUICK_REFERENCE.md) | 常用命令速查表 |

## CI/CD 安全机制

**状态:** ✅ 生产级安全保护已启用

本项目采用多层安全保护的 CI/CD 流程：

- ✅ **构建验证** - 自动检测构建失败，阻止错误代码部署
- ✅ **部署前备份** - 每次部署前自动备份当前版本（保留 30 天）
- ✅ **部署后验证** - 自动健康检查，确认网站正常运行
- ✅ **自动回滚** - 验证失败时触发回滚机制
- ✅ **紧急恢复** - 一键回滚脚本，5 分钟内恢复服务

**紧急情况处理:**
```bash
# 网站故障？立即回滚到上一个正常版本
./emergency-rollback.sh
```

详见 [部署运维手册](DEPLOYMENT_RUNBOOK.md)

## 技术迁移历史

| 版本 | 技术栈 | 状态 |
|------|--------|------|
| 1.0.0 | Svelte 5 + Vite | ⚠️ 已废弃（兼容性问题） |
| 1.1.0 | React 18 + Vite 7 + Tailwind | ✅ 当前版本 |

## 已知问题

- ~~生产服务器 42.192.51.42 已废弃~~ — QA 发现该服务器运行 Vite Dev 构建而非生产构建，且无 SSH 访问权限，已正式废弃。主要部署为 **GitHub Pages**。

---

**最后更新:** 2026-03-10 | **负责人:** Mirage Engineer | **QA:** Mirage Quality
