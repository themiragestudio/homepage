# CHANGELOG

本文件记录 Mirage Studio Homepage 所有值得关注的版本变更。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### Changed
- 文档格式对齐 Mirage Studio 文档标准 v1.0

---

## [1.1.0] - 2026-03-09

### Added
- React 18 + Vite 7 重构（替代 Svelte 5）
- Tailwind CSS 3 集成，完整样式系统
- 生产构建产物（`dist/` 目录）
- 生产服务器部署至 http://42.192.51.42/
- 技术调研文档：`research/react-migration-research.md`
- 迁移报告：`deliverables/MIGRATION_REPORT.md`

### Changed
- 全站技术栈从 Svelte 5 迁移至 React 18
- 样式方案从纯 CSS 迁移至 Tailwind CSS utility classes
- 代码目录从 `code/homepage-app/` 迁移至 `code/homepage-react/`
- 团队成员：Assistant → Adrian Monk (Mirage Quality)

### Fixed
- Svelte 5 运行时兼容性问题（根本原因：改用 React 解决）

---

## [1.0.0] - 2026-03-09

### Added
- Svelte 5 + Vite 7 项目初始搭建
- Hero 区域：品牌展示（标题 + 标语）
- Features 区域：3 个核心能力卡片（Strategic / Fast / AI-Powered）
- Footer：版权信息
- 渐变紫色背景主题 + 玻璃态卡片效果
- 响应式网格布局 + 悬停交互动画
- Tailwind CSS 集成（阶段一配置）
- 技术文档：`docs/TECHNICAL.md`
- 部署指南：`docs/DEPLOYMENT.md`
- 开发服务器运行于 http://localhost:8080

---

**项目:** Mirage Studio Homepage
**当前版本:** 1.1.0
