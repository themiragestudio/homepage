# Evolink.ai 模型目录页面设计分析报告

**作者：** Dr. Brown (Researcher 🔬)  
**日期：** 2026-03-11  
**分析对象：** https://evolink.ai/models  
**目标：** 为 Mirage Studio 前端开发提供设计参考

---

## 一、整体概览

Evolink.ai 是一个 AI 模型聚合平台，其 `/models` 页面展示了一个**模型市场目录**，包含 50+ 个 AI 模型（图像生成、视频生成、文本生成、音频生成等）。页面核心功能是帮助用户快速发现、比较和选择适合的 AI 模型。

**页面类型：** 产品目录 / 模型市场  
**核心用户：** 开发者、产品经理、AI 应用构建者  
**主要目标：** 帮助用户找到合适的模型 → 引导注册/使用 API

---

## 二、信息架构

### 2.1 页面结构层次

```
页面标题：AI Models Catalog | Kling o1, Sora 2, Nano Banana Pro...
└── 模型卡片网格（50个）
    ├── 模型类别标签（Image Generation, Video Generation, Text Generation, Audio Generation）
    ├── 供应商标签（Google, Kling, DeepSeek, OpenAI, Anthropic, BytePlus, Alibaba...）
    ├── 模型名称（Nano Banana 2, Kling 3.0 Motion Control, DeepSeek V4...）
    ├── 模型描述（1-2句话）
    ├── 价格信息（from $X.XXX/unit）
    ├── 积分/折扣信息（X Credits, -Y%）
    └── CTA 链接（View details / Early access）
```

### 2.2 分类维度

页面使用**多维度分类**，但呈现方式扁平化：

1. **按模型类型**（主分类）：
   - Image Generation（图像生成）
   - Video Generation（视频生成）
   - Text Generation（文本生成）
   - Audio Generation（音频生成）

2. **按供应商**（二级分类）：
   - Google, Kling, DeepSeek, OpenAI, Anthropic, BytePlus, Alibaba, ByteDance, Suno, Moonshot, Raphael, xAI, MiniMax

3. **按状态/访问权限**：
   - Early access（早期访问）
   - 常规可用

**注意：** 页面**没有显式的筛选器 UI**（如侧边栏筛选、下拉菜单）。分类信息直接内嵌在每个卡片中，用户通过视觉扫描来识别。

---

## 三、模型卡片设计分析

### 3.1 卡片布局结构

```
┌─────────────────────────────────────┐
│ [类别标签] [供应商标签]              │
│ 模型名称（大字体）                   │
│ 模型描述（1-2行，中等字体）          │
│                                     │
│ 价格信息：from $X.XXX/unit          │
│ 积分信息：X Credits -Y%             │
│                                     │
│ [CTA 按钮：View details / Early access]│
└─────────────────────────────────────┘
```

### 3.2 视觉层次

1. **顶部标签**：类别 + 供应商，小字号，可能是标签样式（badge）
2. **模型名称**：最大字号，视觉焦点
3. **描述**：中等字号，灰色或次级颜色，1-2行截断
4. **价格信息**：突出显示，可能用强调色
5. **折扣信息**：用百分比或"Credits"表示，可能用绿色或强调色
6. **CTA 按钮**：次要按钮样式

### 3.3 交互状态

从链接结构推断：
- 卡片整体可点击（链接到 `/model-slug`）
- 可能有 hover 状态（阴影、边框变化）
- CTA 按钮是卡片内的次级操作

---

## 四、视觉风格与配色

### 4.1 色彩体系（基于文本推断）

**主色调：**
- 深色背景或白色背景（现代 SaaS 风格）
- 强调色：用于价格、折扣、CTA（可能是蓝色、绿色或品牌色）

**标签颜色：**
- 不同类别可能有不同颜色编码：
  - Image Generation：紫色/粉色系？
  - Video Generation：蓝色系？
  - Text Generation：绿色系？
  - Audio Generation：橙色系？

**文本颜色：**
- 标题：深色（#1a1a1a 或 #000）
- 描述：中灰色（#666 或 #4a5568）
- 标签：浅色背景 + 深色文字，或彩色背景 + 白色文字

### 4.2 排版系统

**字体：**
- 无衬线字体（San Francisco, Inter, System UI）
- 标题：中等/半粗体（500-600）
- 正文：常规（400）
- 标签：小字号，可能全大写或首字母大写

**间距：**
- 卡片间间距：16-24px
- 卡片内边距：20-24px
- 行高：标题 1.2-1.3，正文 1.5-1.6

### 4.3 视觉细节

**卡片样式：**
- 圆角：8-12px
- 阴影：轻微阴影（0 2px 8px rgba(0,0,0,0.08)）
- 边框：可能 1px 浅灰色边框或纯背景

**标签样式：**
- 小圆角（4-6px）
- 内边距：4px 8px
- 字号：11-12px

---

## 五、响应式布局

### 5.1 网格系统

**桌面端（≥1024px）：**
- 3-4 列网格
- 卡片等宽，等高或基于内容高度
- 间距：24px

**平板端（768px-1023px）：**
- 2-3 列网格
- 间距：20px

**移动端（<768px）：**
- 1 列网格
- 卡片全宽，可能有左右边距
- 间距：16px

### 5.2 响应式行为

**字体大小调整：**
- 桌面：标题 20-24px，描述 14-16px
- 平板：标题 18-20px，描述 14px
- 移动：标题 16-18px，描述 14px

**卡片内容调整：**
- 移动端可能隐藏次要信息（如积分信息）
- 描述行数可能从 2 行减为 1 行
- 标签可能堆叠或缩小

---

## 六、交互设计模式

### 6.1 浏览模式

**无筛选器的浏览：**
- 用户通过滚动浏览所有模型
- 依赖视觉分类标签快速扫描
- 适合探索性浏览，不适合精准查找

**排序可能性：**
- 可能默认按"热门"或"最新"排序
- 没有显式排序控件（基于页面标题包含最新模型名推断）

### 6.2 信息呈现策略

**价格透明化：**
- 每个模型都显示单价（from $X.XXX/unit）
- 显示积分系统（X Credits）
- 显示折扣百分比（-Y%）
- 帮助用户快速比较成本

**状态指示：**
- Early access：特殊标记，可能用不同颜色或图标
- 常规可用：标准样式

### 6.3 转化路径

```
浏览卡片 → 点击卡片/View details → 模型详情页 → 注册/获取 API Key
```

CTA 文案：
- "View details"：常规模型
- "Early access"：早期访问模型
- 没有直接的"Try now"或"Use API"，暗示需要注册后使用

---

## 七、设计优点与可借鉴之处

### 7.1 优点

1. **信息密度高**：卡片紧凑，展示关键信息（类别、供应商、名称、描述、价格、折扣）
2. **视觉分类清晰**：通过标签颜色/样式快速区分模型类型
3. **价格透明**：直接显示单价和折扣，帮助决策
4. **响应式友好**：网格布局适应各种屏幕
5. **简洁现代**：无多余装饰，聚焦内容

### 7.2 可借鉴的设计模式

**对于 Mirage Studio 的模型展示页面（如有）：**

1. **标签系统**：用颜色编码区分 AI 类型（研究、开发、设计、管理等）
2. **价格/成本显示**：如果涉及服务定价，可借鉴这种透明展示方式
3. **卡片网格**：适合展示团队项目、研究成果、服务项目
4. **响应式网格**：3列 → 2列 → 1列的渐进式降级
5. **悬停交互**：卡片 hover 时轻微提升（阴影加深、边框高亮）

---

## 八、潜在改进建议

### 8.1 缺失的功能

1. **筛选器**：用户无法按类别、供应商、价格范围筛选
2. **搜索**：没有搜索框，无法按名称搜索模型
3. **排序**：无法按价格、折扣、名称排序
4. **比较功能**：无法并排比较多个模型

### 8.2 信息架构优化

1. **分类导航**：顶部或侧边栏分类导航，点击后筛选
2. **面包屑**：显示当前筛选状态
3. **视图切换**：列表视图 vs 网格视图
4. **收藏/书签**：用户可能想标记感兴趣的模型

### 8.3 用户体验增强

1. **价格计算器**：输入使用量，估算总成本
2. **模型对比表**：关键参数对比（上下文长度、输出限制、延迟等）
3. **用户评价/评分**：社区反馈
4. **使用案例**：每个模型适合什么场景

---

## 九、前端实现建议

### 9.1 技术栈建议

```jsx
// React + Tailwind CSS 实现示例
const ModelCard = ({ model }) => (
  <div className="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex gap-2 mb-3">
      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
        {model.category}
      </span>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
        {model.vendor}
      </span>
    </div>
    
    <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
    <p className="text-gray-600 mb-4 line-clamp-2">{model.description}</p>
    
    <div className="mb-4">
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">from ${model.price}</span>
        <span className="text-gray-500">/{model.unit}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-gray-600">{model.credits} Credits</span>
        {model.discount && (
          <span className="text-sm font-medium text-green-600">-{model.discount}%</span>
        )}
      </div>
    </div>
    
    <a
      href={`/models/${model.slug}`}
      className="inline-block w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-black"
    >
      {model.earlyAccess ? 'Early access' : 'View details'}
    </a>
  </div>
);
```

### 9.2 响应式网格实现

```css
/* Tailwind CSS */
.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1280px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 9.3 交互状态

```css
/* Hover 效果 */
.model-card {
  transition: all 0.2s ease;
}

.model-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #3b82f6; /* 品牌色 */
}
```

---

## 十、总结

Evolink.ai 的模型目录页面是一个**功能导向、信息密集的产品目录**。其设计核心是：

1. **高效的信息扫描**：通过标签、突出价格、简洁描述帮助用户快速评估
2. **视觉分类系统**：颜色编码的标签实现无筛选器浏览
3. **响应式网格**：适应从桌面到移动的所有设备
4. **转化导向**：每个卡片都指向详情页，推动用户深入了解

**对 Mirage Studio 的启示：**
- 如果未来需要展示服务、项目或研究成果，可借鉴其卡片网格设计
- 标签系统可用于分类团队专长、项目类型、技术栈
- 价格/成本透明化可增强专业感和信任度
- 响应式设计是基础要求，不是加分项

**局限性：**
- 缺乏高级筛选和搜索功能
- 信息呈现较静态，无个性化推荐
- 交互较简单，无高级比较工具

---

*分析基于页面 HTML 内容提取，未获取视觉样式（CSS/图片）。如需完整视觉分析，建议截图或使用浏览器工具获取完整渲染效果。*
