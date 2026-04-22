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
import { ShieldCheck, Package, Settings, FileText, Eye, EyeOff, Loader2 } from 'lucide-vue-next'

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
          <span class="hidden sm:inline text-muted-foreground">|</span>
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">联系我们</span>
          <Button size="sm" @click="openLogin">登录</Button>
          <Button variant="outline" size="sm" @click="openRegister">注册</Button>
        </div>
      </div>
    </nav>

    <!-- Hero Banner -->
    <section class="pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-[33vh] justify-center py-16">
        <h1 class="text-4xl sm:text-5xl font-bold text-center text-foreground">智慧无界，信以致远</h1>
        <p class="text-lg text-center text-muted-foreground mt-4 max-w-2xl">一站式企业 MaaS API 服务平台，以安全为基，以高效为纲，赋能企业数字化升级</p>
      </div>
    </section>

    <!-- Feature Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card 1: Security -->
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">安全认证・筑牢企业防线</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="space-y-2 text-sm text-muted-foreground">
            <p><span class="font-medium text-foreground">核心：</span>对接中信网银 Key，关键操作强制双因子认证</p>
            <p><span class="font-medium text-foreground">保障：</span>企业身份实名校验、操作全程签名留痕、数据传输加密</p>
            <p><span class="font-medium text-foreground">场景：</span>登录、支付、服务开通、密钥变更等核心环节</p>
          </CardContent>
        </Card>

        <!-- Card 2: MaaS Services -->
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">MaaS 服务・一站式采购开通</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="space-y-2 text-sm text-muted-foreground">
            <p><span class="font-medium text-foreground">核心：</span>全品类 MaaS API 套餐展示、在线选购、自动开通</p>
            <p><span class="font-medium text-foreground">优势：</span>基础版/企业版/旗舰版灵活选择，公有云无缝对接，开通无需人工干预</p>
            <p><span class="font-medium text-foreground">服务：</span>套餐用量监控、API 在线调试、专属技术支持</p>
          </CardContent>
        </Card>

        <!-- Card 3: Full-process Management -->
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Settings class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">全流程管理・高效便捷</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="space-y-2 text-sm text-muted-foreground">
            <p><span class="font-medium text-foreground">核心：</span>订单管理、服务管理、API 管理、账单管理一体化</p>
            <p><span class="font-medium text-foreground">功能：</span>订单查询、API 密钥管控、调用量统计、账单明细导出</p>
            <p><span class="font-medium text-foreground">价值：</span>减少企业运营成本，实现服务全生命周期可视化管理</p>
          </CardContent>
        </Card>

        <!-- Card 4: Security Audit -->
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">安全审计・可溯可查</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="space-y-2 text-sm text-muted-foreground">
            <p><span class="font-medium text-foreground">核心：</span>全流程操作日志记录，满足企业合规要求</p>
            <p><span class="font-medium text-foreground">功能：</span>登录日志、操作日志、网银 Key 认证日志、API 调用日志</p>
            <p><span class="font-medium text-foreground">保障：</span>日志不可篡改，支持导出审计，适配企业合规检查</p>
          </CardContent>
        </Card>
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
