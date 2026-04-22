<!-- [AI_START TIMESTAMP=2025-06-15 12:30:00] -->
# MaaS Portal Vue — 企业统一服务门户

## 项目简介

**MaaS Portal Vue** 是一个基于 Vue 3 的企业级 **MaaS（Model-as-a-Service）** 服务管理门户前端应用。提供从套餐浏览、订单管理、服务监控到账单结算的全流程操作界面，同时支持企业信息管理和子账号权限控制。

### 核心功能模块

| 模块 | 路由 | 说明 |
|------|------|------|
| 📊 控制台首页 | `/` | 仪表盘概览，展示关键运营指标 |
| 📦 订购服务 | `/packages` | 浏览和选择 MaaS 服务套餐 |
| 🛒 我的订单 | `/orders` | 查看与管理已提交的订单 |
| 🖥️ 服务管理 | `/services` | 管理已开通的 MaaS 服务实例 |
| 💰 账单与计费 | `/billing` | 账单查看、费用统计与支付管理 |
| 📝 操作审计 | `/audit` | 系统操作日志与安全审计 |
| 🏢 企业信息管理 | `/enterprise` | 企业资质与联系信息维护 |
| 👥 子账号与权限 | `/accounts` | 子账号创建、角色与权限管理 |

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue](https://vuejs.org/) | ^3.5 | 前端框架（Composition API + `<script setup>`） |
| [TypeScript](https://www.typescriptlang.org/) | ~5.7 | 类型安全 |
| [Vite](https://vitejs.dev/) | ^6.3 | 构建工具与开发服务器 |
| [Vue Router](https://router.vuejs.org/) | ^4.5 | 客户端路由（HTML5 History 模式） |
| [Pinia](https://pinia.vuejs.org/) | ^3.0 | 状态管理 |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.1 | 原子化 CSS 框架 |
| [Radix Vue](https://www.radix-vue.com/) | ^1.9 | 无障碍 UI 原语组件 |
| [Lucide Icons](https://lucide.dev/) | ^0.564 | 图标库 |
| [class-variance-authority](https://cva.style/) | ^0.7 | 组件样式变体管理 |

---

## 项目结构

```
maas-portal-vue/
├── public/                     # 静态资源（图标、占位图等）
├── src/
│   ├── main.ts                 # 应用入口，初始化 Pinia / Router / Auth
│   ├── App.vue                 # 根组件（<router-view>）
│   ├── style.css               # 全局样式（Tailwind 引入）
│   ├── components/
│   │   ├── portal/             # 业务组件
│   │   │   ├── PortalLayout.vue    # 主布局（Sidebar + Header + Content）
│   │   │   ├── Sidebar.vue         # 可折叠侧边栏导航
│   │   │   ├── Header.vue          # 顶部导航栏
│   │   │   ├── DashboardContent.vue
│   │   │   ├── PackagesContent.vue
│   │   │   ├── OrdersContent.vue
│   │   │   ├── ServicesContent.vue
│   │   │   ├── BillingContent.vue
│   │   │   ├── AuditContent.vue
│   │   │   ├── EnterpriseContent.vue
│   │   │   └── AccountsContent.vue
│   │   └── ui/                 # 通用 UI 组件（基于 Radix Vue 封装）
│   │       ├── Avatar.vue / Badge / Button / Card / Dialog /
│   │       ├── DropdownMenu / Input / Label / Progress / Select /
│   │       ├── Separator / Switch / Table / Tabs …
│   ├── lib/
│   │   └── utils.ts            # 工具函数（cn 类名合并）
│   ├── router/
│   │   └── index.ts            # 路由配置 + 导航守卫
│   ├── stores/
│   │   └── auth.ts             # 认证状态管理（Pinia Store）
│   └── views/                  # 页面级视图组件
│       ├── LoginView.vue
│       ├── RegisterView.vue
│       ├── DashboardView.vue
│       ├── PackagesView.vue
│       ├── OrdersView.vue
│       ├── ServicesView.vue
│       ├── BillingView.vue
│       ├── AuditView.vue
│       ├── EnterpriseView.vue
│       └── AccountsView.vue
├── index.html                  # HTML 入口
├── vite.config.ts              # Vite 配置（Vue 插件 + Tailwind + 路径别名）
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖与脚本
```

---

## 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0（或 pnpm / yarn）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用默认运行在 `http://localhost:5173`。

### Demo 账号

项目内置了演示账号，可直接登录体验：

| 邮箱 | 密码 | 角色 |
|------|------|------|
| `admin@example.com` | `admin123` | 超级管理员 |

> **注意**：认证状态通过 `sessionStorage` 维持，关闭浏览器后需重新登录。

---

## 构建与部署

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。执行流程：
1. `vue-tsc -b` — TypeScript 类型检查
2. `vite build` — 打包优化并输出静态文件

### 本地预览构建产物

```bash
npm run preview
```

### 部署方式

#### 方式一：静态文件托管（Nginx / CDN）

将 `dist/` 目录部署至任意静态文件服务器即可。以 Nginx 为例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /usr/share/nginx/html;
    index index.html;

    # SPA 路由 fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 方式二：Docker 容器部署

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建并运行：

```bash
docker build -t maas-portal .
docker run -d -p 80:80 maas-portal
```

#### 方式三：Vercel / Netlify 一键部署

**Vercel**：

```bash
npx vercel --prod
```

**Netlify**：在控制台中连接 Git 仓库，设置构建命令为 `npm run build`，发布目录为 `dist`，并添加 `_redirects` 文件：

```
/*    /index.html    200
```

---

## 开发指南

### 路径别名

项目配置了 `@` 指向 `src/` 目录，可在任意文件中直接使用：

```ts
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'
```

### 新增页面

1. 在 `src/views/` 下创建视图组件
2. 在 `src/router/index.ts` 中注册路由
3. 在 `src/components/portal/Sidebar.vue` 中添加菜单项
4. 在 `src/components/portal/` 下创建对应的 Content 组件

### UI 组件

通用 UI 组件位于 `src/components/ui/`，基于 [Radix Vue](https://www.radix-vue.com/) 头部组件封装，遵循一致的设计规范。新增 UI 组件时请保持相同的命名和结构风格。

### 样式规范

- 使用 **Tailwind CSS v4** 原子类进行样式编写
- 使用 `cn()` 工具函数（基于 `clsx` + `tailwind-merge`）合并类名
- 全局样式变量定义在 `src/style.css` 中

---

## 许可证

Private — 仅供内部使用。
<!-- [AI_END LINES=172 TIMESTAMP=2025-06-15 12:30:00] -->
