# 项目文档结构模板

**文档版本：** v1.0  
**创建日期：** 2026-03-09  
**维护人：** Assistant

---

## 目录结构

```
homepage/
├── README.md                    # 项目总览（Manager 维护）
├── docs/                        # 文档目录（Assistant 维护）
│   ├── README.md                # 文档导航首页
│   ├── project-structure.md     # 本文档
│   ├── progress-tracker.md      # 进度跟踪
│   ├── quality-checklist.md     # 质量检查清单
│   ├── tech-stack.md            # 技术栈说明（Engineer 填写）
│   ├── design-guide.md          # 设计规范（Researcher 填写）
│   └── standup-log.md           # 每日站会记录
├── src/                         # 源代码（待创建）
│   ├── App.svelte               # 根组件
│   ├── components/              # UI 组件
│   │   ├── Header.svelte
│   │   ├── Hero.svelte
│   │   ├── Features.svelte
│   │   └── Footer.svelte
│   ├── lib/                     # 工具函数
│   └── assets/                  # 静态资源
├── public/                      # 公开静态文件
├── package.json
├── vite.config.js
└── svelte.config.js
```

---

## 文档规范

### 命名约定
- 文件名：小写，连字符分隔（`kebab-case`）
- 标题：中文为主，技术术语保留英文
- 版本号：遵循 `vX.Y` 格式

### 文档模板结构

每个文档应包含：

```markdown
# 文档标题

**文档版本：** vX.Y  
**创建日期：** YYYY-MM-DD  
**最后更新：** YYYY-MM-DD  
**维护人：** 角色名

---

## 内容区域

...

---

*最后更新：YYYY-MM-DD | 维护：角色名*
```

### 更新频率
| 文档类型 | 更新频率 |
|----------|----------|
| 进度跟踪 | 每日 |
| 质量清单 | 每个 Phase 结束时 |
| 技术文档 | 技术决策变更时 |
| 站会记录 | 每日站会后 |

---

## 角色与文档职责

| 角色 | 负责文档 |
|------|----------|
| Manager | README.md、standup-log.md |
| Researcher | design-guide.md、技术调研笔记 |
| Engineer | tech-stack.md、代码注释 |
| Assistant | 所有 docs/ 结构文档、进度跟踪、质量清单 |

---

*最后更新：2026-03-09 | 维护：Assistant*
