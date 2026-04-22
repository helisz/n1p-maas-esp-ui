# Change: Redesign Login/Register into Marketing Landing Page with Modal Dialogs

## Rationale
The current LoginView and RegisterView are standalone form pages. The requirement is to replace them with a unified marketing landing page that showcases the MaaS platform's features, with login and register functionality accessed through Dialog modal popups.

## Changes

### 1. Auth Store — Update Demo User Email
- Change demo user email from `admin@example.com` to `admin@sample.com` to match new requirement
- **Target**: `src/stores/auth.ts`

### 2. Router — Simplify Routes
- Remove `/register` route (registration now happens via modal on landing page)
- Keep `/login` route but it now renders the landing page
- Update navigation guard: logged-in users accessing `/login` redirect to `/` (dashboard)

### 3. LoginView — Complete Redesign as Landing Page
Replace the current two-panel login form with a full marketing landing page containing:

**Top Navigation Bar** (fixed, full-width):
- Logo "企业统一服务门户"
- Right side: 帮助中心 | 联系我们 | 登录 (highlighted button) | 注册

**Hero Banner** (centered, ~1/3 viewport height):
- Large bold title: "智慧无界，信以致远"
- Subtitle: "一站式企业 MaaS API 服务平台，以安全为基，以高效为纲，赋能企业数字化升级"

**Feature Section** (4 panels in grid):
1. 安全认证・筑牢企业防线 — Key authentication, dual-factor, encryption
2. MaaS 服务・一站式采购开通 — API packages, online purchase, auto-provisioning
3. 全流程管理・高效便捷 — Order/API/billing management lifecycle
4. 安全审计・可溯可查 — Full audit logging, compliance support

**Service Advantages Bar**:
- "安全可靠・高效便捷・合规可控・无缝对接——覆盖企业 MaaS 服务从订购到运维的全流程需求"

**Footer**:
- © 2026 企业统一服务门户 版权所有
- 服务热线：400-XXXX-XXXX | 工作时间：9:00-18:00（工作日）
- 隐私政策 | 服务条款 | 常见问题 | 资质公示

**Login Modal** (triggered by "登录" button):
- Title: "用您的智信ID登入"
- Pre-filled email: `admin@sample.com`
- Pre-filled password: `admin123`
- "记住我" switch
- Submit button → calls auth.login() → redirect to `/` (dashboard)
- Link to switch to register modal

**Register Modal** (triggered by "注册" button):
- Title: "创建你的智信ID"
- Required fields: company, name, email, phone, password, confirmPassword
- Submit → calls auth.register() → redirect to `/` (dashboard)
- Link to switch to login modal

### 4. Remove RegisterView (Optional)
- `RegisterView.vue` is no longer directly routed; registration logic is in the landing page modal

## Impact
- **Affected Code**:
  - `src/stores/auth.ts`: Update DEMO_USERS email to `admin@sample.com`
  - `src/views/LoginView.vue`: Complete rewrite as landing page with modal dialogs
  - `src/router/index.ts`: Remove `/register` route, update guards
  - `src/views/RegisterView.vue`: No longer used as a route (can be kept as reference or deleted)
- **Reusable Components**: Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button, Input, Label, Switch, Card, Lucide icons
