<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
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
// [AI_START TIMESTAMP=2025-06-17 11:00:00]
import { ShieldCheckIcon, CubeIcon, Cog6ToothIcon, DocumentTextIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon, CheckIcon, LockClosedIcon, KeyIcon, FingerPrintIcon, CloudIcon, BoltIcon, LifebuoyIcon, ChartBarIcon, DocumentMagnifyingGlassIcon, ClipboardDocumentCheckIcon, ArrowRightIcon, ArrowLeftOnRectangleIcon, ChevronDownIcon, SparklesIcon, ArrowTrendingUpIcon, UsersIcon, CpuChipIcon, ClockIcon, BuildingOffice2Icon, BuildingOfficeIcon, BookOpenIcon, BuildingLibraryIcon, UserPlusIcon } from '@heroicons/vue/24/outline'

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

// Mouse parallax for hero banner
const mouseX = ref(0)
const mouseY = ref(0)
const heroRef = ref<HTMLElement | null>(null)

// Hero background video fade control
const videoRef = ref<HTMLVideoElement | null>(null)
const videoOpacity = ref(1)
const FADE_DURATION = 1.5

watch(videoRef, (el) => {
  if (el) el.playbackRate = 0.6
}, { immediate: true })

function handleVideoTimeUpdate() {
  const v = videoRef.value
  if (!v || !v.duration || !isFinite(v.duration)) return
  const t = v.currentTime
  const d = v.duration
  if (t < FADE_DURATION) {
    videoOpacity.value = t / FADE_DURATION
  } else if (t > d - FADE_DURATION) {
    videoOpacity.value = (d - t) / FADE_DURATION
  } else {
    videoOpacity.value = 1
  }
}

function handleMouseMove(e: MouseEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left - rect.width / 2) / rect.width
  mouseY.value = (e.clientY - rect.top - rect.height / 2) / rect.height
}

onMounted(() => {
  heroRef.value = document.querySelector('.hero-parallax-container')
  if (heroRef.value) {
    heroRef.value.addEventListener('mousemove', handleMouseMove, { passive: true })
  }
})

onUnmounted(() => {
  if (heroRef.value) {
    heroRef.value.removeEventListener('mousemove', handleMouseMove)
  }
})

// [AI_START TIMESTAMP=2025-06-17 10:05:00]
watch(() => [auth.isLoading, auth.isLoggedIn], ([loading, loggedIn]) => {
  if (!loading && loggedIn) {
    router.replace('/dashboard')
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
    router.push('/dashboard')
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
    router.push('/dashboard')
  } else {
    registerErrors.value = { general: result.error }
  }
}

// [AI_START TIMESTAMP=2025-06-18 12:00:00]
// FAQ accordion state
const openFaqIndex = ref<number | null>(null)
function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const faqItems = [
  { q: '平台支持哪些大模型？', a: '智信 MaaS 平台已接入 GPT-4、Claude 3、Qwen2.5、DeepSeek-V3 等国内外主流大模型，并持续扩展中。' },
  { q: '如何保障数据安全与隔离？', a: '我们采用 TLS 1.3 全链路加密、独立租户隔离、网银 Key 硬件双因子认证，确保企业数据安全可控。' },
  { q: '是否支持私有化部署？', a: '支持。针对金融、政务等高合规要求行业，提供私有化部署与混合云方案，满足等保三级要求。' },
  { q: '计费模式是怎样的？', a: '按实际 API 调用 Token 量计费，提供预付费套餐与后付费按量两种模式，费用透明可查。' },
  { q: '如何获取技术支持？', a: '提供 7×24 小时在线技术支持，企业客户配备专属客户经理与解决方案架构师一对一服务。' },
]

// Scroll reveal observer
onMounted(() => {
  const revealElements = document.querySelectorAll('.reveal-on-scroll')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  revealElements.forEach(el => observer.observe(el))
})
// [AI_END LINES=29 TIMESTAMP=2025-06-18 12:00:00]
</script>

<template>
  <!-- Loading state -->
  <div v-if="auth.isLoading" class="flex h-screen items-center justify-center bg-background">
    <ArrowPathIcon class="h-6 w-6 animate-spin text-muted-foreground" />
  </div>

  <!-- Main landing page -->
  <div v-else class="min-h-screen bg-background">
    <!-- Top Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- [AI_START TIMESTAMP=2025-06-18 08:01:00] -->
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 rounded-lg">
            <rect width="32" height="32" rx="8" fill="#18181B" />
            <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#fff" opacity="0.95" />
            <path d="M7 16.5l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.55"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7 20l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.3"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text-base font-semibold text-foreground">智信 MaaS</span>
        </div>
        <!-- [AI_END LINES=17 TIMESTAMP=2025-06-18 08:01:00] -->
        <div class="flex items-center gap-4">
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">帮助中心</span>
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">联系我们</span>
          <Button size="sm" @click="openLogin" class="gap-1.5">
            <ArrowLeftOnRectangleIcon class="h-4 w-4" />登录
          </Button>
          <!-- <Button variant="outline" size="sm" @click="openRegister">注册</Button> -->
        </div>
      </div>
    </nav>
    <!-- [AI_START TIMESTAMP=2025-06-18 10:00:00] -->
    <!-- Hero Banner with Dark Tech Animation -->
    <section class="pt-16 relative overflow-hidden bg-black">
      <!-- Background Video -->
      <!-- [AI_START TIMESTAMP=2025-06-18 15:00:00] -->
      <video
        ref="videoRef"
        class="absolute inset-0 w-full h-full object-cover z-0"
        :style="{ opacity: videoOpacity * 0.5, transition: 'opacity 0.1s linear' }"
        src="@/files/hero-bg.mp4"
        autoplay
        muted
        loop
        playsinline
        @timeupdate="handleVideoTimeUpdate"
      />
      <!-- [AI_END LINES=12 TIMESTAMP=2025-06-18 15:00:00] -->

      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-18 sm:py-24 lg:py-24">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mb-8">
          <BoltIcon class="h-3.5 w-3.5 text-white" />
          <span class="text-sm font-medium text-white">智信 MaaS 服务平台</span>
        </div>
        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-center text-white leading-tight tracking-tight">
          智慧无界 · 信以致远
        </h1>
        <!-- Subtitle -->
        <p class="text-lg sm:text-xl text-center text-gray-300 mt-6 max-w-3xl leading-relaxed">
          一站式企业 MaaS API 服务平台，以安全为基，以高效为纲，赋能企业数字化升级
        </p>
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Button size="lg" @click="openLogin" class="gap-2 bg-white text-gray-900 hover:bg-gray-100">
            
            <ArrowRightIcon class="h-4 w-4" />立即体验
          </Button>

        </div>
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 sm:gap-16 mt-16 pt-8 border-t border-white/20">
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-white">99.9%</p>
            <p class="text-xs sm:text-sm text-gray-400 mt-1">服务可用性</p>
          </div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-white">50+</p>
            <p class="text-xs sm:text-sm text-gray-400 mt-1">API 接口</p>
          </div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-white">7×24</p>
            <p class="text-xs sm:text-sm text-gray-400 mt-1">技术支持</p>
          </div>
        </div>
      </div>
    </section>
    <!-- [AI_END LINES=52 TIMESTAMP=2025-06-17 10:10:00] -->

    <!-- Live Platform Stats Bar -->
    <section class="py-12 bg-black text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <CpuChipIcon class="h-8 w-8 mx-auto mb-3 opacity-80" />
            <p class="text-3xl sm:text-4xl font-bold">50+</p>
            <p class="text-sm text-white/80 mt-1">大模型 API</p>
          </div>
          <div class="text-center">
            <ArrowTrendingUpIcon class="h-8 w-8 mx-auto mb-3 opacity-80" />
            <p class="text-3xl sm:text-4xl font-bold">12.8亿</p>
            <p class="text-sm text-white/80 mt-1">累计调用次数</p>
          </div>
          <div class="text-center">
            <UsersIcon class="h-8 w-8 mx-auto mb-3 opacity-80" />
            <p class="text-3xl sm:text-4xl font-bold">2,000+</p>
            <p class="text-sm text-white/80 mt-1">企业客户</p>
          </div>
          <div class="text-center">
            <ClockIcon class="h-8 w-8 mx-auto mb-3 opacity-80" />
            <p class="text-3xl sm:text-4xl font-bold">99.99%</p>
            <p class="text-sm text-white/80 mt-1">服务可用性</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted By Logo Cloud -->
    <section class="py-10 border-border bg-gray-100 reveal-on-scroll">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center font-medium text-gray-400 mb-8 tracking-wide">深受以下领先企业信赖</p>
        <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div
            class="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300 cursor-default">
            <BuildingOffice2Icon class="h-6 w-6" />
            <span>中信集团</span>
          </div>
          <div
            class="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-teal-600 transition-colors duration-300 cursor-default">
            <BuildingOffice2Icon class="h-6 w-6" />
            <span>平安科技</span>
          </div>
          <div
            class="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-amber-600 transition-colors duration-300 cursor-default">
            <BuildingOffice2Icon class="h-6 w-6" />
            <span>华为云</span>
          </div>
          <div
            class="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-rose-600 transition-colors duration-300 cursor-default">
            <BuildingOffice2Icon class="h-6 w-6" />
            <span>招商银行</span>
          </div>
          <div
            class="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-cyan-600 transition-colors duration-300 cursor-default">
            <BuildingOffice2Icon class="h-6 w-6" />
            <span>腾讯金融</span>
          </div>
          <div
            class="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-violet-600 transition-colors duration-300 cursor-default">
            <BuildingOffice2Icon class="h-6 w-6" />
            <span>阿里云</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section — 4 full-width rows -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0">

        <!-- Feature 1: Security Authentication -->
        <div class="py-12 sm:py-16 border-b border-border reveal-on-scroll">
          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <!-- Left: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100">
                  <ShieldCheckIcon class="h-7 w-7 text-teal-600" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">安全认证・筑牢企业防线</h2>
                  <p class="text-sm text-muted-foreground mt-1">Enterprise-Grade Security</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                对接中信网银 Key 认证体系，在登录、支付、服务开通、密钥变更等核心环节实施强制双因子认证，确保每一次关键操作都经过严格的身份核验，为企业数据资产构筑坚实的安全屏障。
              </p>
            </div>
            <!-- Right: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <LockClosedIcon class="h-4 w-4 text-teal-600" />
                    <span class="text-sm font-medium text-foreground">数据传输加密</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">全链路 TLS 1.3 加密传输，保障数据在客户端与服务器之间的安全通信</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <KeyIcon class="h-4 w-4 text-teal-600" />
                    <span class="text-sm font-medium text-foreground">网银 Key 认证</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">对接中信网银 Key 硬件证书，关键操作强制双因子身份核验</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FingerPrintIcon class="h-4 w-4 text-teal-600" />
                    <span class="text-sm font-medium text-foreground">实名校验</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">企业身份实名认证，操作全程签名留痕，责任可追溯到人</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <CheckIcon class="h-4 w-4 text-teal-600" />
                    <span class="text-sm font-medium text-foreground">全场景覆盖</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">覆盖登录、支付、服务开通、密钥变更等所有核心业务场景</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2: MaaS Services -->
        <div class="py-12 sm:py-16 border-b border-border reveal-on-scroll">
          <div class="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16">
            <!-- Right: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                  <CubeIcon class="h-7 w-7 text-indigo-600" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">MaaS 服务・一站式采购开通</h2>
                  <p class="text-sm text-muted-foreground mt-1">One-Stop MaaS Procurement</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                全品类 MaaS API 套餐集中展示，支持在线选购、自动开通，无需人工干预。从基础版到旗舰版灵活选择，公有云无缝对接，让企业以最快速度接入所需的大模型服务能力。
              </p>
            </div>
            <!-- Left: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <CubeIcon class="h-4 w-4 text-indigo-600" />
                    <span class="text-sm font-medium text-foreground">灵活套餐选择</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">基础版 / 企业版 / 旗舰版三档灵活选择，满足不同规模企业需求</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <CloudIcon class="h-4 w-4 text-indigo-600" />
                    <span class="text-sm font-medium text-foreground">公有云无缝对接</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">开通即用，无需人工干预，标准 API 接口快速对接企业现有系统</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ChartBarIcon class="h-4 w-4 text-indigo-600" />
                    <span class="text-sm font-medium text-foreground">用量实时监控</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">套餐用量可视化监控，API 调用统计一目了然，费用透明可控</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <LifebuoyIcon class="h-4 w-4 text-indigo-600" />
                    <span class="text-sm font-medium text-foreground">专属技术支持</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">API 在线调试工具，专属客户经理一对一服务，7×24 小时响应</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 3: Full-process Management -->
        <div class="py-12 sm:py-16 border-b border-border reveal-on-scroll">
          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <!-- Left: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                  <Cog6ToothIcon class="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">全流程管理・高效便捷</h2>
                  <p class="text-sm text-muted-foreground mt-1">Lifecycle Management</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                订单管理、服务管理、API 管理、账单管理四大模块一体化整合。从下单到开通、从监控到续费，实现服务全生命周期的可视化管理，大幅降低企业运营成本。
              </p>
            </div>
            <!-- Right: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <DocumentTextIcon class="h-4 w-4 text-amber-600" />
                    <span class="text-sm font-medium text-foreground">订单全流程跟踪</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">从下单、审批、支付到开通，订单状态实时追踪，进度透明可视</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <KeyIcon class="h-4 w-4 text-amber-600" />
                    <span class="text-sm font-medium text-foreground">API 密钥管控</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">密钥生成、权限配置、调用范围管控，精细化的 API 访问授权管理</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ChartBarIcon class="h-4 w-4 text-amber-600" />
                    <span class="text-sm font-medium text-foreground">调用量统计</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">多维度 API 调用统计分析，用量趋势、异常告警、配额管理一站搞定</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon class="h-4 w-4 text-amber-600" />
                    <span class="text-sm font-medium text-foreground">账单明细导出</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">透明账单明细，支持按月导出报表，对接企业财务系统，开票便捷</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 4: Security Audit -->
        <div class="py-12 sm:py-16 reveal-on-scroll">
          <div class="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16">
            <!-- Right: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
                  <DocumentMagnifyingGlassIcon class="h-7 w-7 text-rose-600" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">安全审计・可溯可查</h2>
                  <p class="text-sm text-muted-foreground mt-1">Comprehensive Audit Trail</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                全流程操作日志记录，满足企业合规审查要求。从登录日志到 API 调用日志，所有操作留痕不可篡改，支持多维度检索与导出审计报告，为企业合规检查提供坚实数据支撑。
              </p>
            </div>
            <!-- Left: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <DocumentTextIcon class="h-4 w-4 text-rose-600" />
                    <span class="text-sm font-medium text-foreground">全类型日志</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">覆盖登录日志、操作日志、网银 Key 认证日志、API 调用日志全类型</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <LockClosedIcon class="h-4 w-4 text-rose-600" />
                    <span class="text-sm font-medium text-foreground">日志不可篡改</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">采用区块链级存储技术，日志一旦写入不可修改或删除，确保审计真实性</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <DocumentMagnifyingGlassIcon class="h-4 w-4 text-rose-600" />
                    <span class="text-sm font-medium text-foreground">多维度检索</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">按时间、操作人、操作类型等多维度灵活检索，快速定位目标记录</p>
                </div>
                <div class="rounded-xl border border-border bg-transparent p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon class="h-4 w-4 text-rose-600" />
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

    <!-- Use Case Scenario Cards -->
    <section class="py-20 bg-slate-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 reveal-on-scroll">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground">行业解决方案</h2>
          <p class="text-muted-foreground mt-3">覆盖多场景，赋能企业智能化升级</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card 1: Finance -->
          <div
            class="rounded-2xl border border-border bg-white p-6 hover:shadow-lg transition-all duration-300 group reveal-on-scroll">
            <div
              class="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <BuildingLibraryIcon class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-foreground mb-2">智慧金融</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">智能风控建模、合规审查自动化、客户画像分析，助力金融机构降本增效。</p>
          </div>
          <!-- Card 2: Manufacturing -->
          <div
            class="rounded-2xl border border-border bg-white p-6 hover:shadow-lg transition-all duration-300 group reveal-on-scroll">
            <div
              class="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <BuildingOfficeIcon class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-foreground mb-2">智能制造</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">设备预测性维护、生产质量检测、供应链优化，推动制造业数字化转型。</p>
          </div>
          <!-- Card 3: Knowledge Base -->
          <div
            class="rounded-2xl border border-border bg-white p-6 hover:shadow-lg transition-all duration-300 group reveal-on-scroll">
            <div
              class="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <BookOpenIcon class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-foreground mb-2">企业知识库</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">RAG 检索增强生成、私有化文档问答、智能客服，释放企业知识资产价值。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Advantages Bar -->
    <section class="py-12 bg-gradient-to-r from-teal-50 via-indigo-50 to-rose-50 border-border reveal-on-scroll">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-xl font-bold  text-foreground">安全可靠・高效便捷・合规可控・无缝对接——覆盖企业 MaaS 服务从订购到运维的全流程需求</p>
      </div>
    </section>

    <!-- Pricing Teaser CTA -->
    <section class="py-20 reveal-on-scroll">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="rounded-3xl bg-gradient-to-br bg-gray-800 p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2">
          </div>
          <div class="relative z-10">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-6">
              <SparklesIcon class="h-4 w-4" />
              <span class="text-sm font-medium">新用户专享</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-bold mb-4">免费试用 100 万 Token</h2>
            <p class="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">无需信用卡，注册即享 100 万 API 调用额度，体验全品类大模型服务。
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" @click="openRegister" class="bg-black hover:bg-white/90 gap-2">
                免费注册
                <ArrowRightIcon class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="lg" @click="openLogin" class="bg-white bg-white text-gray-900 hover:bg-gray-100">
                查看价格方案
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="py-20 bg-slate-50/50 reveal-on-scroll">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground">常见问题</h2>
          <p class="text-muted-foreground mt-3">快速了解智信 MaaS 平台</p>
        </div>
        <div class="space-y-3">
          <div v-for="(item, idx) in faqItems" :key="idx"
            class="rounded-xl border border-border bg-white overflow-hidden">
            <button @click="toggleFaq(idx)"
              class="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
              <span class="font-medium text-foreground text-sm sm:text-base">{{ item.q }}</span>
              <ChevronDownIcon class="h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-3"
                :class="{ 'rotate-180': openFaqIndex === idx }" />
            </button>
            <div class="overflow-hidden transition-all duration-300"
              :style="{ maxHeight: openFaqIndex === idx ? '200px' : '0px', opacity: openFaqIndex === idx ? 1 : 0 }">
              <p class="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- [AI_END LINES=276 TIMESTAMP=2025-06-18 12:00:00] -->

    <!-- Footer -->
    <footer class="bg-foreground text-background">
      <div class="max-w-7xl mx-auto px-4 py-8 text-center space-y-2">
        <p class="text-sm">© 2026 中信国际电讯 版权所有</p>
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
        <DialogDescription>输入您的账号信息登录智信MaaS服务管理平台</DialogDescription>
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
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeSlashIcon v-if="showPassword" class="h-4 w-4" />
              <EyeIcon v-else class="h-4 w-4" />
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="remember" v-model="rememberMe" />
          <Label for="remember">记住我</Label>
        </div>
        <p v-if="loginError" class="text-sm text-destructive">{{ loginError }}</p>
        <Button type="submit" class="w-full" :disabled="loginSubmitting">
          <ArrowPathIcon v-if="loginSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ loginSubmitting ? '登录中...' : '登录' }}
        </Button>
      </form>
      <p class="mt-4 text-center text-sm text-muted-foreground">
        还没有账号？<button type="button" @click="openRegister"
          class="font-medium text-foreground underline-offset-4 hover:underline">立即注册</button>
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
          <Input id="reg-company" v-model="company" placeholder="请输入企业全称"
            :class="cn(registerErrors.company && 'border-destructive')" />
          <p v-if="registerErrors.company" class="text-xs text-destructive">{{ registerErrors.company }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-name">联系人姓名 <span class="text-destructive">*</span></Label>
          <Input id="reg-name" v-model="name" placeholder="请输入联系人姓名"
            :class="cn(registerErrors.name && 'border-destructive')" />
          <p v-if="registerErrors.name" class="text-xs text-destructive">{{ registerErrors.name }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-email">邮箱 <span class="text-destructive">*</span></Label>
          <Input id="reg-email" type="email" v-model="regEmail" placeholder="请输入邮箱"
            :class="cn(registerErrors.email && 'border-destructive')" />
          <p v-if="registerErrors.email" class="text-xs text-destructive">{{ registerErrors.email }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-phone">手机号 <span class="text-destructive">*</span></Label>
          <Input id="reg-phone" v-model="phone" placeholder="请输入手机号"
            :class="cn(registerErrors.phone && 'border-destructive')" />
          <p v-if="registerErrors.phone" class="text-xs text-destructive">{{ registerErrors.phone }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-password">密码 <span class="text-destructive">*</span></Label>
          <div class="relative">
            <Input id="reg-password" :type="showRegPassword ? 'text' : 'password'" v-model="regPassword"
              placeholder="请设置密码（至少6位）" :class="cn(registerErrors.password && 'border-destructive', 'pr-10')" />
            <button type="button" @click="showRegPassword = !showRegPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeSlashIcon v-if="showRegPassword" class="h-4 w-4" />
              <EyeIcon v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="registerErrors.password" class="text-xs text-destructive">{{ registerErrors.password }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-confirm">确认密码 <span class="text-destructive">*</span></Label>
          <div class="relative">
            <Input id="reg-confirm" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
              placeholder="请再次输入密码" :class="cn(registerErrors.confirmPassword && 'border-destructive', 'pr-10')" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeSlashIcon v-if="showConfirmPassword" class="h-4 w-4" />
              <EyeIcon v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="registerErrors.confirmPassword" class="text-xs text-destructive">{{ registerErrors.confirmPassword }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="reg-agreed" v-model="agreed" class="rounded" />
          <Label for="reg-agreed" class="text-sm">我已阅读并同意 <span class="text-primary cursor-pointer">服务协议</span></Label>
        </div>
        <p v-if="registerErrors.agreed" class="text-xs text-destructive">{{ registerErrors.agreed }}</p>
        <p v-if="registerErrors.general" class="text-sm text-destructive">{{ registerErrors.general }}</p>
        <Button type="submit" class="w-full" :disabled="registerSubmitting">
          <ArrowPathIcon v-if="registerSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ registerSubmitting ? '注册中...' : '注册' }}
        </Button>
      </form>
      <p class="mt-4 text-center text-sm text-muted-foreground">
        已有账号？<button type="button" @click="openLogin"
          class="font-medium text-foreground underline-offset-4 hover:underline">立即登录</button>
      </p>
    </DialogContent>
  </Dialog>
</template>
<style scoped>
/* [AI_START TIMESTAMP=2025-06-18 08:35:00] */
/* Wave curves flowing animation */
@keyframes wave-flow-1 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -4800;
  }
}

@keyframes wave-flow-2 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -4800;
  }
}

@keyframes wave-flow-3 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -3600;
  }
}

.animate-wave-flow-1 {
  stroke-dasharray: 1200 3600;
  animation: wave-flow-1 20s linear infinite;
}

.animate-wave-flow-2 {
  stroke-dasharray: 1200 3600;
  animation: wave-flow-2 25s linear infinite;
}

.animate-wave-flow-3 {
  stroke-dasharray: 900 2700;
  animation: wave-flow-3 18s linear infinite;
}

/* Diagonal data stream animation */
@keyframes stream-1 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -160;
  }
}

@keyframes stream-2 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -240;
  }
}

@keyframes stream-3 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -180;
  }
}

.animate-stream-1 {
  animation: stream-1 4s linear infinite;
}

.animate-stream-2 {
  animation: stream-2 5s linear infinite;
}

.animate-stream-3 {
  animation: stream-3 3.5s linear infinite;
}

/* Network pulse animation */
@keyframes network-pulse {

  0%,
  100% {
    stroke-dashoffset: 300;
    opacity: 0.3;
  }

  50% {
    stroke-dashoffset: 0;
    opacity: 0.8;
  }
}

@keyframes network-pulse-delayed {

  0%,
  100% {
    stroke-dashoffset: 300;
    opacity: 0.2;
  }

  40%,
  60% {
    stroke-dashoffset: 0;
    opacity: 0.7;
  }
}

@keyframes network-pulse-slow {

  0%,
  100% {
    stroke-dashoffset: 300;
    opacity: 0.25;
  }

  45%,
  55% {
    stroke-dashoffset: 0;
    opacity: 0.6;
  }
}

.animate-network-pulse {
  stroke-dasharray: 300;
  animation: network-pulse 6s ease-in-out infinite;
}

.animate-network-pulse-delayed {
  stroke-dasharray: 300;
  animation: network-pulse-delayed 7s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-network-pulse-slow {
  stroke-dasharray: 300;
  animation: network-pulse-slow 8s ease-in-out infinite;
  animation-delay: 2s;
}

/* Node glow animation */
@keyframes node-glow {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes node-glow-delayed {

  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.3);
  }
}

@keyframes node-glow-slow {

  0%,
  100% {
    opacity: 0.25;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.4);
  }
}

.animate-node-glow {
  animation: node-glow 3s ease-in-out infinite;
  transform-origin: center;
}

.animate-node-glow-delayed {
  animation: node-glow-delayed 4s ease-in-out infinite;
  animation-delay: 0.5s;
  transform-origin: center;
}

.animate-node-glow-slow {
  animation: node-glow-slow 5s ease-in-out infinite;
  animation-delay: 1s;
  transform-origin: center;
}

/* Energy flow animation */
@keyframes energy-flow-1 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -1400;
  }
}

@keyframes energy-flow-2 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -1400;
  }
}

@keyframes energy-flow-3 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -1400;
  }
}

.animate-energy-flow-1 {
  stroke-dasharray: 100 1300;
  animation: energy-flow-1 12s linear infinite;
}

.animate-energy-flow-2 {
  stroke-dasharray: 150 1250;
  animation: energy-flow-2 15s linear infinite;
}

.animate-energy-flow-3 {
  stroke-dasharray: 80 1320;
  animation: energy-flow-3 10s linear infinite;
}

/* Vortex spin animation */
@keyframes vortex-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes vortex-spin-reverse {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@keyframes vortex-spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes vortex-spin-reverse-slow {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.animate-vortex-spin {
  animation: vortex-spin 40s linear infinite;
  transform-origin: center;
}

.animate-vortex-spin-reverse {
  animation: vortex-spin-reverse 35s linear infinite;
  transform-origin: center;
}

.animate-vortex-spin-slow {
  animation: vortex-spin-slow 50s linear infinite;
  transform-origin: center;
}

.animate-vortex-spin-reverse-slow {
  animation: vortex-spin-reverse-slow 45s linear infinite;
  transform-origin: center;
}

/* Particle float animation */
@keyframes particle-float-1 {

  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }

  25% {
    transform: translate(30px, -20px);
    opacity: 0.8;
  }

  50% {
    transform: translate(60px, 0);
    opacity: 0.5;
  }

  75% {
    transform: translate(30px, 20px);
    opacity: 0.9;
  }
}

@keyframes particle-float-2 {

  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0.2;
  }

  33% {
    transform: translate(-40px, 30px);
    opacity: 0.7;
  }

  66% {
    transform: translate(-20px, -30px);
    opacity: 0.4;
  }
}

@keyframes particle-float-3 {

  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0.25;
  }

  20% {
    transform: translate(20px, 40px);
    opacity: 0.6;
  }

  40% {
    transform: translate(-20px, 20px);
    opacity: 0.9;
  }

  60% {
    transform: translate(-40px, -10px);
    opacity: 0.5;
  }

  80% {
    transform: translate(10px, -30px);
    opacity: 0.8;
  }
}

.animate-particle-float-1 {
  animation: particle-float-1 15s ease-in-out infinite;
}

.animate-particle-float-2 {
  animation: particle-float-2 18s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-particle-float-3 {
  animation: particle-float-3 20s ease-in-out infinite;
  animation-delay: 4s;
}

/* [AI_START TIMESTAMP=2025-06-18 10:05:00] */
/* Gradient glow orb animations */
@keyframes glow-orb-1 {

  0%,
  100% {
    transform: translate(-20%, -20%) scale(1);
    opacity: 0.6;
  }

  25% {
    transform: translate(10%, 5%) scale(1.1);
    opacity: 0.8;
  }

  50% {
    transform: translate(30%, 20%) scale(0.95);
    opacity: 0.7;
  }

  75% {
    transform: translate(15%, -10%) scale(1.05);
    opacity: 0.9;
  }
}

@keyframes glow-orb-2 {

  0%,
  100% {
    transform: translate(60%, 40%) scale(1);
    opacity: 0.5;
  }

  33% {
    transform: translate(40%, 60%) scale(1.15);
    opacity: 0.7;
  }

  66% {
    transform: translate(70%, 30%) scale(0.9);
    opacity: 0.6;
  }
}

@keyframes glow-orb-3 {

  0%,
  100% {
    transform: translate(20%, 80%) scale(1);
    opacity: 0.5;
  }

  50% {
    transform: translate(40%, 50%) scale(1.2);
    opacity: 0.8;
  }
}

.animate-glow-orb-1 {
  animation: glow-orb-1 25s ease-in-out infinite;
}

.animate-glow-orb-2 {
  animation: glow-orb-2 30s ease-in-out infinite;
  animation-delay: 5s;
}

.animate-glow-orb-3 {
  animation: glow-orb-3 35s ease-in-out infinite;
  animation-delay: 10s;
}

/* Radar pulse scan animation */
@keyframes radar-pulse-1 {
  0% {
    r: 20;
    opacity: 0.8;
    stroke-width: 1;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    r: 200;
    opacity: 0;
    stroke-width: 0.1;
  }
}

@keyframes radar-pulse-2 {
  0% {
    r: 30;
    opacity: 0.6;
    stroke-width: 0.8;
  }

  50% {
    opacity: 0.2;
  }

  100% {
    r: 250;
    opacity: 0;
    stroke-width: 0.1;
  }
}

@keyframes radar-pulse-3 {
  0% {
    r: 40;
    opacity: 0.4;
    stroke-width: 0.6;
  }

  50% {
    opacity: 0.15;
  }

  100% {
    r: 300;
    opacity: 0;
    stroke-width: 0.1;
  }
}

.animate-radar-pulse-1 {
  animation: radar-pulse-1 4s ease-out infinite;
  transform-origin: center;
}

.animate-radar-pulse-2 {
  animation: radar-pulse-2 4s ease-out infinite;
  animation-delay: 1.3s;
  transform-origin: center;
}

.animate-radar-pulse-3 {
  animation: radar-pulse-3 4s ease-out infinite;
  animation-delay: 2.6s;
  transform-origin: center;
}

/* Binary code rain animation */
@keyframes binary-rain-1 {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    opacity: 0.6;
  }

  90% {
    opacity: 0.6;
  }

  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes binary-rain-2 {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    opacity: 0.5;
  }

  90% {
    opacity: 0.5;
  }

  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes binary-rain-3 {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    opacity: 0.4;
  }

  90% {
    opacity: 0.4;
  }

  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.animate-binary-rain-1 {
  animation: binary-rain-1 12s linear infinite;
}

.animate-binary-rain-2 {
  animation: binary-rain-2 15s linear infinite;
  animation-delay: 3s;
}

.animate-binary-rain-3 {
  animation: binary-rain-3 18s linear infinite;
  animation-delay: 6s;
}

/* Audio waveform animation */
@keyframes waveform-1 {

  0%,
  100% {
    d: path('M0,64 Q30,40 60,64 T120,64 T180,64 T240,64 T300,64 T360,64 T420,64 T480,64 T540,64 T600,64 T660,64 T720,64 T780,64 T840,64 T900,64 T960,64 T1020,64 T1080,64 T1140,64 T1200,64');
  }

  25% {
    d: path('M0,64 Q30,80 60,64 T120,50 T180,78 T240,45 T300,70 T360,55 T420,75 T480,40 T540,65 T600,50 T660,80 T720,45 T780,70 T840,55 T900,75 T960,40 T1020,65 T1080,50 T1140,78 T1200,64');
  }

  50% {
    d: path('M0,64 Q30,30 60,64 T120,70 T180,40 T240,80 T300,35 T360,75 T420,45 T480,70 T540,40 T600,80 T660,35 T720,75 T780,45 T840,70 T900,40 T960,80 T1020,35 T1080,75 T1140,45 T1200,64');
  }

  75% {
    d: path('M0,64 Q30,75 60,64 T120,45 T180,70 T240,50 T300,80 T360,40 T420,65 T480,55 T540,75 T600,40 T660,70 T720,50 T780,80 T840,40 T900,65 T960,55 T1020,75 T1080,40 T1140,70 T1200,64');
  }
}

@keyframes waveform-2 {

  0%,
  100% {
    d: path('M0,64 Q30,80 60,64 T120,64 T180,64 T240,64 T300,64 T360,64 T420,64 T480,64 T540,64 T600,64 T660,64 T720,64 T780,64 T840,64 T900,64 T960,64 T1020,64 T1080,64 T1140,64 T1200,64');
  }

  33% {
    d: path('M0,64 Q30,45 60,64 T120,75 T180,35 T240,85 T300,30 T360,80 T420,35 T480,75 T540,45 T600,85 T660,30 T720,80 T780,35 T840,75 T900,45 T960,85 T1020,30 T1080,80 T1140,35 T1200,64');
  }

  66% {
    d: path('M0,64 Q30,70 60,64 T120,40 T180,80 T240,35 T300,75 T360,50 T420,85 T480,30 T540,80 T600,35 T660,75 T720,50 T780,85 T840,30 T900,80 T960,35 T1020,75 T1080,50 T1140,85 T1200,64');
  }
}

.animate-waveform-1 {
  animation: waveform-1 4s ease-in-out infinite;
}

.animate-waveform-2 {
  animation: waveform-2 5s ease-in-out infinite;
  animation-delay: 1s;
}

/* Polygon morph animation */
@keyframes polygon-morph-1 {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 0.4;
  }

  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 0.7;
  }
}

@keyframes polygon-morph-2 {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 0.3;
  }

  50% {
    transform: rotate(-180deg) scale(0.8);
    opacity: 0.6;
  }
}

@keyframes polygon-morph-3 {

  0%,
  100% {
    transform: rotate(45deg) scale(0.9);
    opacity: 0.35;
  }

  50% {
    transform: rotate(225deg) scale(1.1);
    opacity: 0.65;
  }
}

.animate-polygon-morph-1 {
  animation: polygon-morph-1 20s ease-in-out infinite;
  transform-origin: center;
}

.animate-polygon-morph-2 {
  animation: polygon-morph-2 25s ease-in-out infinite;
  transform-origin: center;
}

.animate-polygon-morph-3 {
  animation: polygon-morph-3 22s ease-in-out infinite;
  transform-origin: center;
}

/* Gradient radial background utility */
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* Mouse parallax effects */
.hero-parallax-container [class*="animate-glow-orb"] {
  transition: transform 0.3s ease-out;
  transform: translate(var(--parallax-x, 0), var(--parallax-y, 0));
}

.hero-parallax-container [class*="animate-polygon-morph"] {
  transition: transform 0.4s ease-out;
  transform: translate(var(--parallax-x-reverse, 0), var(--parallax-y-reverse, 0)) rotate(var(--rotation, 0deg));
}

.hero-parallax-container .animate-waveform-1,
.hero-parallax-container .animate-waveform-2 {
  transition: transform 0.2s ease-out;
  transform: translateX(calc(var(--parallax-x, 0) * 0.5));
}

/* Spotlight cursor glow effect */
.hero-parallax-container::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(calc(var(--parallax-x, 0) * 10 - 50%), calc(var(--parallax-y, 0) * 10 - 50%));
  transition: transform 0.15s ease-out;
  z-index: 1;
}

/* [AI_START TIMESTAMP=2025-06-18 12:00:00] */
/* Scroll reveal animations */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays for grid children */
.reveal-on-scroll:nth-child(1) {
  transition-delay: 0ms;
}

.reveal-on-scroll:nth-child(2) {
  transition-delay: 80ms;
}

.reveal-on-scroll:nth-child(3) {
  transition-delay: 160ms;
}

.reveal-on-scroll:nth-child(4) {
  transition-delay: 240ms;
}

/* [AI_END LINES=18 TIMESTAMP=2025-06-18 12:00:00] */
/* [AI_END LINES=130 TIMESTAMP=2025-06-18 08:35:00] */
</style>
