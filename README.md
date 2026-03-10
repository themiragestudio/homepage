# Mirage Studio Homepage

> Mirage Studio 官方首页，展示品牌、核心能力与研究成果。

**状态:** ✅ 已完成（React 版本运行中）
**版本:** 1.1.0
**技术栈:** React 18 + Vite 7 + Tailwind CSS 3
**访问地址:** GitHub Pages: https://themiragestudio.github.io/homepage/ | 生产服务器: http://42.192.51.42/ | 本地开发: http://localhost:8080

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

## 技术迁移历史

| 版本 | 技术栈 | 状态 |
|------|--------|------|
| 1.0.0 | Svelte 5 + Vite | ⚠️ 已废弃（兼容性问题） |
| 1.1.0 | React 18 + Vite 7 + Tailwind | ✅ 当前版本 |

## 已知问题

- 开发服务器实时验证待执行（需手动确认 `npm run dev` 效果）
- 桌面端与移动端视觉验收待完成

---

**最后更新:** 2026-03-10 | **负责人:** Mirage Engineer | **QA:** Mirage Quality
