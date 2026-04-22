## Implementation

- [x] 1.1 Update demo user email in auth store
     【Target Object】`src/stores/auth.ts`
     【Purpose】Change the demo user email from `admin@example.com` to `admin@sample.com` so that the login modal pre-fill matches the updated demo credentials; expected outcome is that login with `admin@sample.com` / `admin123` succeeds
     【Method】In the module-level `DEMO_USERS` constant (line 26), **modify** `DEMO_USERS[0].email` at line 28
     【Dependencies】None
     【Content】
        - Change `email: 'admin@example.com'` (line 28) to `email: 'admin@sample.com'`
        - Verify no other references to `admin@example.com` exist in this file (there are none)

- [x] 1.2 Update router configuration — remove /register route and simplify navigation guard
     【Target Object】`src/router/index.ts`
     【Purpose】Remove the `/register` route since registration is now handled via modal on the landing page; update the navigation guard so it no longer checks for a `'Register'` route name
     【Method】In the `routes` array (lines 5–66), **delete** the `/register` route block (lines 12–17). In the `router.beforeEach` guard (line 78), **modify** the `else if` condition to remove the `Register` check
     【Dependencies】None
     【Content】
        - Delete the entire route object at lines 12–17: `{ path: '/register', name: 'Register', component: () => import('@/views/RegisterView.vue'), meta: { requiresAuth: false } }`
        - Modify line 78 from `else if (!to.meta.requiresAuth && auth.isLoggedIn && (to.name === 'Login' || to.name === 'Register'))` to `else if (!to.meta.requiresAuth && auth.isLoggedIn && to.name === 'Login')`
        - Keep all other routes and the auth redirect to Login for protected routes unchanged

- [x] 1.3 Rewrite LoginView.vue as full marketing landing page with login/register modals
     【Target Object】`src/views/LoginView.vue`
     【Purpose】Replace the current two-panel login form with a complete marketing landing page that showcases the MaaS platform's features, with login and register functionality accessed through Dialog modal popups; expected outcome is a fully functional landing page with two switchable modal dialogs
     【Method】Complete **rewrite** of the entire file (currently 118 lines)
     【Dependencies】`src/stores/auth.ts` (`useAuthStore`), `src/components/ui/Dialog.vue`, `src/components/ui/DialogContent.vue`, `src/components/ui/DialogHeader.vue`, `src/components/ui/DialogTitle.vue`, `src/components/ui/DialogDescription.vue`, `src/components/ui/DialogFooter.vue`, `src/components/ui/Button.vue`, `src/components/ui/Input.vue`, `src/components/ui/Label.vue`, `src/components/ui/Switch.vue`, `src/components/ui/Card.vue`, `src/components/ui/CardHeader.vue`, `src/components/ui/CardTitle.vue`, `src/components/ui/CardContent.vue`, `src/components/ui/CardDescription.vue`, `src/lib/utils.ts` (`cn`), `lucide-vue-next` (`ShieldCheck`, `Package`, `Settings`, `FileText`, `Eye`, `EyeOff`, `Loader2`, `ChevronRight`), `vue-router` (`useRouter`)
     【Content】
        - **Script section (`<script setup lang="ts">`)**:
          - Import `ref`, `watch` from `vue`; `useRouter` from `vue-router`; `useAuthStore` from `@/stores/auth`
          - Import all UI components: Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button, Input, Label, Switch, Card, CardHeader, CardTitle, CardContent, CardDescription
          - Import icons: `ShieldCheck`, `Package`, `Settings`, `FileText`, `Eye`, `EyeOff`, `Loader2`, `ChevronRight` from `lucide-vue-next`
          - Import `cn` from `@/lib/utils`
          - Define reactive state: `showLogin` (ref<boolean>), `showRegister` (ref<boolean>)
          - Define login form state: `email` pre-filled `'admin@sample.com'`, `password` pre-filled `'admin123'`, `showPassword`, `rememberMe`, `loginError`, `loginSubmitting`
          - Define register form state: `company`, `name`, `regEmail`, `phone`, `regPassword`, `showRegPassword`, `confirmPassword`, `showConfirmPassword`, `agreed`, `registerError`, `registerSubmitting`
          - Implement `handleLogin()`: validate non-empty fields, call `auth.login(email, password)`, on success close dialog and redirect to `/`, on failure display error
          - Implement `handleRegister()`: validate all fields including password match and `agreed` checkbox, call `auth.register(...)`, on success close dialog and redirect to `/`, on failure display error
          - Implement `openLogin()`: set `showRegister = false`, then `showLogin = true`
          - Implement `openRegister()`: set `showLogin = false`, then `showRegister = true`
          - Add `watch` on `auth.isLoggedIn` to redirect to `/` when user becomes logged in (matching existing pattern)
        - **Template — Top Navigation Bar**: Fixed `<header>` with flex row, logo text "企业统一服务门户" on left, right side with text links "帮助中心" and "联系我们" separated by `|`, "登录" `<Button>` (variant="default") triggering `openLogin()`, "注册" `<Button>` (variant="outline") triggering `openRegister()`
        - **Template — Hero Banner**: Centered section with `min-h-[33vh]`, large bold `<h1>` "智慧无界，信以致远", `<p>` subtitle "一站式企业 MaaS API 服务平台，以安全为基，以高效为纲，赋能企业数字化升级"
        - **Template — Feature Section**: 4-card responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) using Card/CardHeader/CardTitle/CardContent/CardDescription with lucide icons:
          - Card 1: `ShieldCheck` icon, title "安全认证・筑牢企业防线", description covering dual-factor auth, encryption, identity verification
          - Card 2: `Package` icon, title "MaaS 服务・一站式采购开通", description covering API packages, auto-provisioning, flexible tiers
          - Card 3: `Settings` icon, title "全流程管理・高效便捷", description covering order/API/billing management, lifecycle visibility
          - Card 4: `FileText` icon, title "安全审计・可溯可查", description covering audit logging, compliance, immutable logs
        - **Template — Service Advantages Bar**: Full-width section with centered text "安全可靠・高效便捷・合规可控・无缝对接——覆盖企业 MaaS 服务从订购到运维的全流程需求"
        - **Template — Footer**: Dark background `<footer>` with:
          - "© 2026 企业统一服务门户 版权所有"
          - "服务热线：400-XXXX-XXXX | 工作时间：9:00-18:00（工作日）"
          - Links: "隐私政策 | 服务条款 | 常见问题 | 资质公示"
        - **Login Dialog Modal**: `<Dialog>` with `open` bound to `showLogin`:
          - `<DialogHeader>` with `<DialogTitle>` "用您的智信ID登入"
          - Email `<Input>` pre-filled `admin@sample.com`
          - Password `<Input>` pre-filled `admin123` with Eye/EyeOff toggle
          - "记住我" `<Switch>` row
          - Error display `<p>` when `loginError` is truthy
          - Submit `<Button>` with `Loader2` spinner when `loginSubmitting`
          - Bottom link "还没有账号？立即注册" calling `openRegister()`
        - **Register Dialog Modal**: `<Dialog>` with `open` bound to `showRegister`:
          - `<DialogHeader>` with `<DialogTitle>` "创建你的智信ID"
          - Form fields: company `<Input>`, name `<Input>`, email `<Input>`, phone `<Input>`, password `<Input>` with Eye/EyeOff toggle, confirmPassword `<Input>` with Eye/EyeOff toggle
          - Error display `<p>` when `registerError` is truthy
          - Submit `<Button>` with `Loader2` spinner when `registerSubmitting`
          - Bottom link "已有账号？立即登录" calling `openLogin()`
        - **Styles**: Use Tailwind CSS utility classes throughout; responsive design (mobile-first); consistent with existing design tokens and dark/light theme support
        - **Boundary handling**: Guard against double-submit by checking `loginSubmitting`/`registerSubmitting` before calling submit handlers; clear error messages when switching between modals; handle case where auth store is still loading

- [x] 1.4 Remove unused RegisterView file (optional cleanup)
     【Target Object】`src/views/RegisterView.vue`
     【Purpose】Remove the now-unused `RegisterView.vue` file since registration is handled entirely by the modal in the redesigned `LoginView.vue`; this prevents orphaned code and avoids confusion
     【Method】**Delete** the entire file
     【Dependencies】Task 1.2 (router must no longer reference RegisterView before deletion)
     【Content】
        - Delete the file `src/views/RegisterView.vue`
        - Verify no remaining imports or references to `RegisterView` exist in the codebase (router reference was removed in Task 1.2)
