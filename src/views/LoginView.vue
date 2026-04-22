<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { cn } from '@/lib/utils'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Switch from '@/components/ui/Switch.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
// [AI_START TIMESTAMP=2025-06-15 14:00:00]
import { ShieldCheck, Package, Settings, FileText, Eye, EyeOff, Loader2, Check, Lock, KeyRound, Fingerprint, Cloud, Zap, Headphones, BarChart3, FileSearch, ClipboardCheck, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()

// Dialog visibility
const showLogin = ref(false)
const showRegister = ref(false)

// Login form state
const email = ref('admin@sample.com')
const password = ref('admin123')
const showPassword = ref(false)
const rememberMe = ref(false)
const loginError = ref('')
const loginSubmitting = ref(false)

// Register form state
const company = ref('')
const name = ref('')
const regEmail = ref('')
const phone = ref('')
const regPassword = ref('')
const showRegPassword = ref(false)
const confirmPassword = ref('')
const showConfirmPassword = ref(false)
const agreed = ref(false)
const registerErrors = ref<Record<string, string | undefined>>({})
const registerSubmitting = ref(false)

watch(() => [auth.isLoading, auth.isLoggedIn], ([loading, loggedIn]) => {
  if (!loading && loggedIn) {
    router.replace('/')
  }
}, { immediate: true })

function openLogin() {
  showRegister.value = false
  showLogin.value = true
  loginError.value = ''
}

function openRegister() {
  showLogin.value = false
  showRegister.value = true
  registerErrors.value = {}
}

async function handleLogin() {
  loginError.value = ''
  if (!email.value.trim()) { loginError.value = '请输入邮箱账号'; return }
  if (!password.value) { loginError.value = '请输入密码'; return }

  loginSubmitting.value = true
  const result = await auth.login(email.value.trim(), password.value)
  loginSubmitting.value = false

  if (result.success) {
    showLogin.value = false
    router.push('/')
  } else {
    loginError.value = result.error ?? '登录失败'
  }
}

function validateRegister(): boolean {
  const errs: Record<string, string> = {}
  if (!company.value.trim()) errs.company = '请输入企业名称'
  if (!name.value.trim()) errs.name = '请输入联系人姓名'
  if (!regEmail.value.trim()) errs.email = '请输入邮箱'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.value)) errs.email = '邮箱格式不正确'
  if (!phone.value.trim()) errs.phone = '请输入手机号'
  else if (!/^1[3-9]\d{9}$/.test(phone.value)) errs.phone = '手机号格式不正确'
  if (!regPassword.value) errs.password = '请设置密码'
  else if (regPassword.value.length < 6) errs.password = '密码至少 6 位'
  if (!confirmPassword.value) errs.confirmPassword = '请再次输入密码'
  else if (regPassword.value !== confirmPassword.value) errs.confirmPassword = '两次密码不一致'
  if (!agreed.value) errs.agreed = '请阅读并同意服务协议'
  registerErrors.value = errs
  return Object.keys(errs).length === 0
}

async function handleRegister() {
  if (!validateRegister()) return
  registerSubmitting.value = true
  const result = await auth.register({
    company: company.value,
    name: name.value,
    email: regEmail.value,
    phone: phone.value,
    password: regPassword.value,
  })
  registerSubmitting.value = false

  if (result.success) {
    showRegister.value = false
    router.push('/')
  } else {
    registerErrors.value = { general: result.error }
  }
}
</script>

<template>
  <!-- Loading state -->
  <div v-if="auth.isLoading" class="flex h-screen items-center justify-center bg-background">
    <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
  </div>

  <!-- Main landing page -->
  <div v-else class="min-h-screen bg-background">
    <!-- Top Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <span class="text-sm font-bold text-background">M</span>
          </div>
          <span class="text-base font-semibold text-foreground">企业统一服务门户</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">帮助中心</span>
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">联系我们</span>
          <Button size="sm" @click="openLogin">登录</Button>
          <Button variant="outline" size="sm" @click="openRegister">注册</Button>
        </div>
      </div>
    </nav>

    <!-- Hero Banner -->
    <section class="pt-16 relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-20 w-96 h-96 bg-primary/60 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-24 sm:py-32 lg:py-40">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-1.5 mb-8">
          <Zap class="h-3.5 w-3.5 text-primary" />
          <span class="text-xs font-medium text-background/80">企业级 MaaS API 服务平台</span>
        </div>
        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-background leading-tight tracking-tight">
          智慧无界，信以致远
        </h1>
        <!-- Subtitle -->
        <p class="text-lg sm:text-xl text-center text-background/60 mt-6 max-w-3xl leading-relaxed">
          一站式企业 MaaS API 服务平台，以安全为基，以高效为纲，赋能企业数字化升级
        </p>
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Button size="lg" @click="openLogin" class="gap-2">
            立即体验
            <ArrowRight class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" @click="openRegister" class="border-background/20 text-background hover:bg-background/10  text-black">
            免费注册
          </Button>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 sm:gap-16 mt-16 pt-8 border-t border-background/10">
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-background">99.9%</p>
            <p class="text-xs sm:text-sm text-background/50 mt-1">服务可用性</p>
          </div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-background">50+</p>
            <p class="text-xs sm:text-sm text-background/50 mt-1">API 接口</p>
          </div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-background">7×24</p>
            <p class="text-xs sm:text-sm text-background/50 mt-1">技术支持</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section — 4 full-width rows -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0">

        <!-- Feature 1: Security Authentication -->
        <div class="py-12 sm:py-16 border-b border-border">
          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <!-- Left: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">安全认证・筑牢企业防线</h2>
                  <p class="text-sm text-muted-foreground mt-0.5">Enterprise-Grade Security</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                对接中信网银 Key 认证体系，在登录、支付、服务开通、密钥变更等核心环节实施强制双因子认证，确保每一次关键操作都经过严格的身份核验，为企业数据资产构筑坚实的安全屏障。
              </p>
            </div>
            <!-- Right: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Lock class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">数据传输加密</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">全链路 TLS 1.3 加密传输，保障数据在客户端与服务器之间的安全通信</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <KeyRound class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">网银 Key 认证</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">对接中信网银 Key 硬件证书，关键操作强制双因子身份核验</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Fingerprint class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">实名校验</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">企业身份实名认证，操作全程签名留痕，责任可追溯到人</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Check class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">全场景覆盖</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">覆盖登录、支付、服务开通、密钥变更等所有核心业务场景</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2: MaaS Services -->
        <div class="py-12 sm:py-16 border-b border-border">
          <div class="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16">
            <!-- Right: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Package class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">MaaS 服务・一站式采购开通</h2>
                  <p class="text-sm text-muted-foreground mt-0.5">One-Stop MaaS Procurement</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                全品类 MaaS API 套餐集中展示，支持在线选购、自动开通，无需人工干预。从基础版到旗舰版灵活选择，公有云无缝对接，让企业以最快速度接入所需的大模型服务能力。
              </p>
            </div>
            <!-- Left: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Package class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">灵活套餐选择</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">基础版 / 企业版 / 旗舰版三档灵活选择，满足不同规模企业需求</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Cloud class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">公有云无缝对接</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">开通即用，无需人工干预，标准 API 接口快速对接企业现有系统</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <BarChart3 class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">用量实时监控</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">套餐用量可视化监控，API 调用统计一目了然，费用透明可控</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Headphones class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">专属技术支持</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">API 在线调试工具，专属客户经理一对一服务，7×24 小时响应</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 3: Full-process Management -->
        <div class="py-12 sm:py-16 border-b border-border">
          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <!-- Left: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Settings class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">全流程管理・高效便捷</h2>
                  <p class="text-sm text-muted-foreground mt-0.5">Lifecycle Management</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                订单管理、服务管理、API 管理、账单管理四大模块一体化整合。从下单到开通、从监控到续费，实现服务全生命周期的可视化管理，大幅降低企业运营成本。
              </p>
            </div>
            <!-- Right: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FileText class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">订单全流程跟踪</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">从下单、审批、支付到开通，订单状态实时追踪，进度透明可视</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <KeyRound class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">API 密钥管控</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">密钥生成、权限配置、调用范围管控，精细化的 API 访问授权管理</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <BarChart3 class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">调用量统计</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">多维度 API 调用统计分析，用量趋势、异常告警、配额管理一站搞定</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ClipboardCheck class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">账单明细导出</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">透明账单明细，支持按月导出报表，对接企业财务系统，开票便捷</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 4: Security Audit -->
        <div class="py-12 sm:py-16">
          <div class="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16">
            <!-- Right: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <FileSearch class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">安全审计・可溯可查</h2>
                  <p class="text-sm text-muted-foreground mt-0.5">Comprehensive Audit Trail</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                全流程操作日志记录，满足企业合规审查要求。从登录日志到 API 调用日志，所有操作留痕不可篡改，支持多维度检索与导出审计报告，为企业合规检查提供坚实数据支撑。
              </p>
            </div>
            <!-- Left: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FileText class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">全类型日志</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">覆盖登录日志、操作日志、网银 Key 认证日志、API 调用日志全类型</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Lock class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">日志不可篡改</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">采用区块链级存储技术，日志一旦写入不可修改或删除，确保审计真实性</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FileSearch class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">多维度检索</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">按时间、操作人、操作类型等多维度灵活检索，快速定位目标记录</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ClipboardCheck class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">导出审计报告</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">一键导出标准化审计报告，适配企业内控合规检查与外部审计需求</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Service Advantages Bar -->
    <section class="bg-primary/5 py-12">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-lg font-medium text-foreground">安全可靠・高效便捷・合规可控・无缝对接——覆盖企业 MaaS 服务从订购到运维的全流程需求</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-foreground text-background">
      <div class="max-w-7xl mx-auto px-4 py-8 text-center space-y-2">
        <p class="text-sm">© 2026 企业统一服务门户 版权所有</p>
        <p class="text-sm text-background/60">服务热线：400-XXXX-XXXX | 工作时间：9:00-18:00（工作日）</p>
        <p class="text-sm text-background/60">
          <span class="cursor-pointer hover:text-background">隐私政策</span>
          <span> | </span>
          <span class="cursor-pointer hover:text-background">服务条款</span>
          <span> | </span>
          <span class="cursor-pointer hover:text-background">常见问题</span>
          <span> | </span>
          <span class="cursor-pointer hover:text-background">资质公示</span>
        </p>
      </div>
    </footer>
  </div>

  <!-- Login Dialog -->
  <Dialog :open="showLogin" @update:open="showLogin = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>用您的智信ID登入</DialogTitle>
        <DialogDescription>输入您的账号信息登录企业服务门户</DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1.5">
          <Label for="login-email">邮箱账号</Label>
          <Input id="login-email" type="email" v-model="email" />
        </div>
        <div class="space-y-1.5">
          <Label for="login-password">密码</Label>
          <div class="relative">
            <Input id="login-password" :type="showPassword ? 'text' : 'password'" v-model="password" class="pr-10" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeOff v-if="showPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="remember" v-model="rememberMe" />
          <Label for="remember">记住我</Label>
        </div>
        <p v-if="loginError" class="text-sm text-destructive">{{ loginError }}</p>
        <Button type="submit" class="w-full" :disabled="loginSubmitting">
          <Loader2 v-if="loginSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ loginSubmitting ? '登录中...' : '登录' }}
        </Button>
      </form>
      <p class="mt-4 text-center text-sm text-muted-foreground">
        还没有账号？<button type="button" @click="openRegister" class="font-medium text-foreground underline-offset-4 hover:underline">立即注册</button>
      </p>
    </DialogContent>
  </Dialog>

  <!-- Register Dialog -->
  <Dialog :open="showRegister" @update:open="showRegister = $event">
    <DialogContent class="max-h-[85vh] overflow-y-auto sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>创建你的智信ID</DialogTitle>
        <DialogDescription>填写以下信息完成企业账号注册</DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleRegister" class="space-y-3.5">
        <div class="space-y-1.5">
          <Label for="reg-company">企业名称 <span class="text-destructive">*</span></Label>
          <Input id="reg-company" v-model="company" placeholder="请输入企业全称" :class="cn(registerErrors.company && 'border-destructive')" />
          <p v-if="registerErrors.company" class="text-xs text-destructive">{{ registerErrors.company }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-name">联系人姓名 <span class="text-destructive">*</span></Label>
          <Input id="reg-name" v-model="name" placeholder="请输入联系人姓名" :class="cn(registerErrors.name && 'border-destructive')" />
          <p v-if="registerErrors.name" class="text-xs text-destructive">{{ registerErrors.name }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-email">邮箱 <span class="text-destructive">*</span></Label>
          <Input id="reg-email" type="email" v-model="regEmail" placeholder="请输入邮箱" :class="cn(registerErrors.email && 'border-destructive')" />
          <p v-if="registerErrors.email" class="text-xs text-destructive">{{ registerErrors.email }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-phone">手机号 <span class="text-destructive">*</span></Label>
          <Input id="reg-phone" v-model="phone" placeholder="请输入手机号" :class="cn(registerErrors.phone && 'border-destructive')" />
          <p v-if="registerErrors.phone" class="text-xs text-destructive">{{ registerErrors.phone }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-password">密码 <span class="text-destructive">*</span></Label>
          <div class="relative">
            <Input id="reg-password" :type="showRegPassword ? 'text' : 'password'" v-model="regPassword" placeholder="请设置密码（至少6位）" :class="cn(registerErrors.password && 'border-destructive', 'pr-10')" />
            <button type="button" @click="showRegPassword = !showRegPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeOff v-if="showRegPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="registerErrors.password" class="text-xs text-destructive">{{ registerErrors.password }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-confirm">确认密码 <span class="text-destructive">*</span></Label>
          <div class="relative">
            <Input id="reg-confirm" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="请再次输入密码" :class="cn(registerErrors.confirmPassword && 'border-destructive', 'pr-10')" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeOff v-if="showConfirmPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="registerErrors.confirmPassword" class="text-xs text-destructive">{{ registerErrors.confirmPassword }}</p>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="reg-agreed" v-model="agreed" class="rounded" />
          <Label for="reg-agreed" class="text-sm">我已阅读并同意 <span class="text-primary cursor-pointer">服务协议</span></Label>
        </div>
        <p v-if="registerErrors.agreed" class="text-xs text-destructive">{{ registerErrors.agreed }}</p>
        <p v-if="registerErrors.general" class="text-sm text-destructive">{{ registerErrors.general }}</p>
        <Button type="submit" class="w-full" :disabled="registerSubmitting">
          <Loader2 v-if="registerSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ registerSubmitting ? '注册中...' : '注册' }}
        </Button>
      </form>
      <p class="mt-4 text-center text-sm text-muted-foreground">
        已有账号？<button type="button" @click="openLogin" class="font-medium text-foreground underline-offset-4 hover:underline">立即登录</button>
      </p>
    </DialogContent>
  </Dialog>
</template>
