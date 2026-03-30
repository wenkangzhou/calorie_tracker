# 部署指南

## 本地开发

1. 安装依赖：
```bash
cd calorie_tracker
yarn install
```

2. 启动开发服务器：
```bash
yarn dev
```

3. 访问 http://localhost:3000

## 构建生产版本

```bash
yarn build
```

构建后的文件将位于 `dist/` 目录中。

## Vercel 部署

### 通过 Vercel Dashboard 部署

1. 将代码推送到 GitHub 仓库

2. 登录 [Vercel Dashboard](https://vercel.com/dashboard)

3. 点击 "Add New Project"

4. 选择你的 GitHub 仓库

5. 配置项目：
   - **Framework Preset**: Next.js
   - **Build Command**: `yarn build`
   - **Output Directory**: `dist`
   - **Install Command**: `yarn install`

6. 点击 "Deploy"

### 项目设置注意事项

- 本项目使用静态导出（`output: 'export'`），因此不需要服务器端功能
- 所有数据存储在浏览器的 localStorage 中
- 无需配置环境变量

## Hydration 错误修复说明

React Error #418 是服务端渲染（SSR）和客户端渲染（CSR）之间的不匹配导致的。以下组件已修复：

1. **BottomNav** - 添加了 `mounted` 状态检查
2. **ProgressRing** - 添加了 `mounted` 状态检查
3. **I18nProvider** - 延迟渲染直到客户端挂载
4. **ThemeProvider** - 添加了 `forcedTheme` 避免闪烁
5. **page.tsx** (仪表板) - 添加了骨架屏加载状态
6. **search/page.tsx** - 添加了骨架屏加载状态
7. **progress/page.tsx** - 添加了骨架屏加载状态
8. **profile/page.tsx** - 添加了骨架屏加载状态
9. **FoodCard** - 添加了 `mounted` 状态检查

所有页面现在都会在客户端挂载后才渲染动态内容，避免了 SSR 和 CSR 之间的不一致。

## GitHub 部署

1. 在 GitHub 上创建新仓库

2. 将代码推送到仓库：
```bash
cd calorie_tracker
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/calorie-tracker.git
git push -u origin main
```

3. 按照上述 Vercel 部署步骤操作

## 功能说明

### 已实现的完整功能

1. **仪表板页面**
   - 圆形热量进度指示器（默认目标 1200 卡路里）
   - 用户头像和个性化问候语
   - 日期选择器（前后切换日期）
   - 宏量营养素卡片（碳水、蛋白质、脂肪）
   - 饮水记录
   - 餐食分类记录（早餐、午餐、晚餐、零食）

2. **食物数据库**
   - 50+ 常见食物
   - 详细营养信息（热量、碳水、蛋白质、脂肪）
   - 分类：谷物、蔬菜、水果、肉类、海鲜、乳制品、蛋类、零食、饮品、其他

3. **食物搜索功能**
   - 实时搜索，支持模糊匹配
   - 分类筛选
   - 最近使用
   - 收藏功能

4. **食物详情页**
   - 详细营养成分
   - 份量选择
   - 添加到指定餐食

5. **进度追踪页面**
   - 连续打卡天数
   - 本周概览图表
   - 统计数据（目标达成天数、平均热量、最佳记录）
   - 成就系统

6. **个人资料页面**
   - 目标设置（热量、蛋白质、碳水、脂肪）
   - 语言切换（中文/英文）
   - 主题切换（浅色/深色/跟随系统）

7. **底部导航栏**
   - 首页、搜索、进度、个人资料

### 技术特性

- **响应式设计**: 移动端优先，最大宽度 768px
- **深色模式**: 支持浅色/深色主题切换
- **多语言**: 支持中文和英文
- **数据持久化**: 使用 localStorage 存储用户数据
- **PWA 支持**: 可安装为桌面应用
