# Calorie Tracker - 卡路里追踪器

一个功能完整、设计精美的饮食热量追踪应用。

## 功能特性

### 核心功能
- **仪表板** - 显示每日热量摄入/消耗的圆形进度指示器，包含用户头像、个性化问候语、日期选择器和宏量营养素卡片
- **食物数据库** - 内置丰富的食物数据库，包含常见食物的详细营养信息
- **食物搜索** - 实时搜索食物，支持模糊匹配和分类筛选
- **食物详情** - 显示食物图片、营养成分、份量选择和添加到餐食的功能
- **餐食记录** - 支持早餐、午餐、晚餐和零食的分类记录
- **进度追踪** - 显示整体进度百分比、连续打卡天数、营养和健身指标
- **底部导航** - 在仪表板、搜索、进度和个人资料之间切换

### 设计特点
- **颜色方案** - 以健康的绿色为主色调（`#22c55e`, `#16a34a`），配合中性色
- **界面风格** - 现代简洁的移动端设计，圆角卡片布局，清晰的视觉层次
- **交互元素** - 圆形进度条、可点击的食物卡片、平滑的页面切换动画
- **图标系统** - 使用 Lucide React 图标库，保持一致的视觉风格

### 用户体验
- 直观的热量追踪界面
- 快速添加常用食物
- 清晰的营养成分展示
- 激励性的进度反馈
- 流畅的导航体验

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS, shadcn/ui
- **状态管理**: Zustand
- **国际化**: i18next
- **主题**: next-themes（支持深色模式）
- **图标**: Lucide React

## 部署说明

### 本地开发

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn dev

# 构建生产版本
yarn build
```

### Vercel 部署

1. 将代码推送到 GitHub 仓库
2. 在 Vercel Dashboard 中导入 GitHub 项目
3. 选择项目并配置构建设置：
   - Framework Preset: Next.js
   - Build Command: `yarn build`
   - Output Directory: `dist`
4. 点击 Deploy

### 环境变量

此项目不需要特殊的环境变量即可运行。

## 项目结构

```
calorie_tracker/
├── app/                    # Next.js 页面
│   ├── page.tsx           # 仪表板页面
│   ├── search/            # 搜索页面
│   ├── progress/          # 进度追踪页面
│   ├── profile/           # 个人资料页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── food/             # 食物相关组件
│   └── layout/           # 布局组件
├── lib/                   # 工具函数
│   ├── utils.ts          # 通用工具
│   ├── i18n.ts           # i18n 配置
│   └── foodDatabase.ts   # 食物数据库
├── store/                 # Zustand 状态管理
├── types/                 # TypeScript 类型定义
├── public/               # 静态资源
│   └── locales/          # 多语言文件
└── package.json
```

## 多语言支持

支持中文和英文两种语言，可通过个人资料页面切换。

## 主题支持

支持浅色、深色和跟随系统三种主题模式。

## 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome for Android 90+

## License

MIT
