<!-- [AI_START TIMESTAMP=2025-07-14 12:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  KeyIcon, ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon,
  GlobeAltIcon, ComputerDesktopIcon, ArrowPathIcon,
  LockClosedIcon, ExclamationTriangleIcon, BoltIcon,
  ArrowRightIcon, InformationCircleIcon, PlayIcon,
  Cog6ToothIcon, CheckIcon, DocumentCheckIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()

// Steps for the UKey binding flow
const steps = [
  { id: 1, title: '安装浏览器插件', description: '下载并安装中信网银安全插件' },
  { id: 2, title: '插入U盾设备', description: '将中信网银Key插入电脑USB接口' },
  { id: 3, title: '信息匹配验证', description: '系统自动读取Key信息并匹配企业资料' },
  { id: 4, title: '完成验证', description: '企业资质验证通过，解锁全部服务' },
]

const currentStep = ref(1)
const pluginInstalled = ref(false)
const keyInserted = ref(false)
const isVerifying = ref(false)
const verificationComplete = ref(false)
const verificationError = ref('')

function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/enterprise')
  }
}

function installPlugin() {
  pluginInstalled.value = true
}

function simulateKeyInsert() {
  keyInserted.value = true
}

function startVerification() {
  if (!pluginInstalled.value) {
    verificationError.value = '请先安装浏览器插件'
    return
  }
  if (!keyInserted.value) {
    verificationError.value = '请先插入U盾设备'
    return
  }

  isVerifying.value = true
  verificationError.value = ''

  // Simulate verification process
  setTimeout(() => {
    isVerifying.value = false
    verificationComplete.value = true
    currentStep.value = 4
  }, 2000)
}

function finishVerification() {
  router.push('/enterprise')
}

const canProceed = computed(() => {
  if (currentStep.value === 1) return pluginInstalled.value
  if (currentStep.value === 2) return keyInserted.value
  if (currentStep.value === 3) return pluginInstalled.value && keyInserted.value
  return true
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Button variant="outline" size="sm" @click="goBack">
        <ArrowLeftIcon class="mr-1 h-4 w-4" />返回
      </Button>
      <div>
        <h2 class="text-2xl font-semibold text-foreground">在线绑定中信网银 Key</h2>
        <p class="text-muted-foreground">通过网银Key硬件认证，即时完成企业资质验证</p>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Left: Step Indicator -->
      <Card class="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle>验证步骤</CardTitle>
          <CardDescription>按顺序完成以下步骤</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div
              v-for="(step, idx) in steps"
              :key="step.id"
              class="relative flex items-start gap-3"
            >
              <!-- Vertical line -->
              <div
                v-if="idx < steps.length - 1"
                :class="[
                  'absolute left-[15px] top-9 w-0.5 h-full -translate-x-1/2',
                  currentStep > step.id ? 'bg-indigo-500' : 'bg-border',
                ]"
              />
              <!-- Step circle -->
              <div
                :class="[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold z-10',
                  currentStep > step.id
                    ? 'bg-indigo-500 text-white'
                    : currentStep === step.id
                    ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300'
                    : 'bg-muted text-muted-foreground',
                ]"
              >
                <CheckIcon v-if="currentStep > step.id" class="h-4 w-4" />
                <span v-else>{{ step.id }}</span>
              </div>
              <div class="pb-6">
                <p
                  :class="[
                    'text-sm font-medium',
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground',
                  ]"
                >
                  {{ step.title }}
                </p>
                <p class="text-xs text-muted-foreground">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Right: Step Content -->
      <Card class="lg:col-span-2">
        <CardContent class="pt-6 space-y-6">

          <!-- Step 1: Install Plugin -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Cog6ToothIcon class="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">安装浏览器插件</h3>
                <p class="text-sm text-muted-foreground">使用中信网银Key前需要安装安全插件</p>
              </div>
            </div>

            <div class="rounded-lg bg-muted/50 p-5 space-y-3">
              <div class="flex items-start gap-2">
                <InformationCircleIcon class="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <p class="text-sm text-muted-foreground">
                  该插件由中信银行官方提供，用于读取网银Key中的企业证书信息，并通过加密通道完成身份验证。所有数据仅在本地处理，不会上传至第三方。
                </p>
              </div>
              <div class="flex items-start gap-2">
                <LockClosedIcon class="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <p class="text-sm text-muted-foreground">
                  插件已通过国家信息安全等级保护三级认证，确保您的企业数据安全。
                </p>
              </div>
            </div>

            <div v-if="!pluginInstalled" class="space-y-3">
              <div class="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p class="font-medium">中信网银安全插件 v3.2.1</p>
                  <p class="text-xs text-muted-foreground">支持 Chrome / Edge / Firefox | 2.8 MB</p>
                </div>
                <Button @click="installPlugin" class="gap-2">
                  <ArrowPathIcon class="h-4 w-4" />下载安装
                </Button>
              </div>
              <p class="text-xs text-muted-foreground text-center">
                安装完成后请刷新浏览器以确保插件正常加载
              </p>
            </div>

            <div v-else class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
              <CheckCircleIcon class="h-5 w-5 text-emerald-500" />
              <div>
                <p class="font-medium text-emerald-800">插件已安装</p>
                <p class="text-sm text-emerald-600">中信网银安全插件运行正常</p>
              </div>
            </div>

            <div class="flex justify-end">
              <Button @click="currentStep = 2" :disabled="!pluginInstalled" class="gap-2">
                下一步<ArrowRightIcon class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Step 2: Insert UKey -->
          <div v-if="currentStep === 2" class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <KeyIcon class="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">插入U盾设备</h3>
                <p class="text-sm text-muted-foreground">请将中信网银Key插入电脑USB接口</p>
              </div>
            </div>

            <div class="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
              <ExclamationTriangleIcon class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-amber-800">注意事项</p>
                <ul class="mt-1 space-y-1 text-sm text-amber-700">
                  <li>• 确保U盾驱动已正确安装（通常随插件自动安装）</li>
                  <li>• 请勿在验证过程中拔出U盾</li>
                  <li>• 如指示灯不亮，请检查USB接口或更换接口重试</li>
                </ul>
              </div>
            </div>

            <div class="flex flex-col items-center gap-4 py-6">
              <!-- USB Key visual -->
              <div
                :class="[
                  'flex h-32 w-20 items-center justify-center rounded-xl border-2 border-dashed transition-all',
                  keyInserted
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-border bg-muted/30',
                ]"
              >
                <div v-if="!keyInserted" class="flex flex-col items-center gap-2 text-muted-foreground">
                  <KeyIcon class="h-8 w-8" />
                  <span class="text-xs">等待插入</span>
                </div>
                <div v-else class="flex flex-col items-center gap-2 text-emerald-600">
                  <KeyIcon class="h-8 w-8" />
                  <span class="text-xs font-medium">已连接</span>
                </div>
              </div>

              <div v-if="!keyInserted">
                <Button variant="outline" @click="simulateKeyInsert" class="gap-2">
                  <PlayIcon class="h-4 w-4" />模拟插入U盾
                </Button>
                <p class="text-xs text-muted-foreground mt-1 text-center">（演示模式）</p>
              </div>

              <div v-else class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 w-full max-w-sm">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500" />
                <div>
                  <p class="font-medium text-emerald-800">U盾已识别</p>
                  <p class="text-sm text-emerald-600">设备序列号：CITIC2024XXXXXXXX</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between">
              <Button variant="outline" @click="goBack"><ArrowLeftIcon class="mr-1 h-4 w-4" />上一步</Button>
              <Button @click="currentStep = 3" :disabled="!keyInserted" class="gap-2">
                下一步<ArrowRightIcon class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Step 3: Verify -->
          <div v-if="currentStep === 3" class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <ShieldCheckIcon class="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 class="text-lg font-semibold">信息匹配验证</h3>
                <p class="text-sm text-muted-foreground">系统将自动匹配U盾信息与企业注册信息</p>
              </div>
            </div>

            <!-- Match info preview -->
            <div class="rounded-lg border border-border p-4 space-y-3">
              <p class="text-sm font-semibold">匹配信息预览</p>
              <div class="grid gap-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">企业名称</span>
                  <span class="font-medium">中科云数科技有限公司</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">统一社会信用代码</span>
                  <span class="font-mono">91110108MA01XXXXXX</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Key 证书编号</span>
                  <span class="font-mono">CN-CITIC-2024-XXXXXX</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">证书有效期</span>
                  <span>2024-01-16 至 2025-01-16</span>
                </div>
              </div>
            </div>

            <div v-if="verificationError" class="rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2">
              <ExclamationTriangleIcon class="h-4 w-4 text-red-500 shrink-0" />
              <p class="text-sm text-red-700">{{ verificationError }}</p>
            </div>

            <div v-if="isVerifying" class="flex flex-col items-center gap-3 py-4">
              <ArrowPathIcon class="h-8 w-8 animate-spin text-indigo-500" />
              <p class="text-sm text-muted-foreground">正在验证企业信息，请稍候…</p>
            </div>

            <div class="flex justify-between">
              <Button variant="outline" @click="goBack"><ArrowLeftIcon class="mr-1 h-4 w-4" />上一步</Button>
              <Button @click="startVerification" :disabled="isVerifying" class="gap-2">
                <ShieldCheckIcon class="h-4 w-4" />开始验证
              </Button>
            </div>
          </div>

          <!-- Step 4: Complete -->
          <div v-if="currentStep === 4" class="space-y-4">
            <div class="flex flex-col items-center gap-4 py-6 text-center">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckBadgeIcon v-if="verificationComplete" class="h-10 w-10 text-emerald-500" />
                <DocumentCheckIcon v-else class="h-10 w-10 text-emerald-500" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-foreground">企业资质验证通过！</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  您的中信网银Key已成功绑定，企业资质验证已完成
                </p>
              </div>

              <div class="rounded-lg bg-emerald-50 border border-emerald-200 p-4 w-full max-w-md space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">验证时间</span>
                  <span class="font-medium">{{ new Date().toLocaleString('zh-CN') }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Key 序列号</span>
                  <span class="font-mono">CITIC2024XXXXXXXX</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">验证状态</span>
                  <span class="font-medium text-emerald-700">已通过</span>
                </div>
              </div>
            </div>

            <div class="flex justify-center">
              <Button @click="finishVerification" size="lg" class="gap-2 px-8">
                <CheckCircleIcon class="h-5 w-5" />返回企业信息
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  </div>
</template>
<!-- [AI_END LINES=247 TIMESTAMP=2025-07-14 12:00:00] -->
