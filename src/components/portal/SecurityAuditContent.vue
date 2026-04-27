<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Tabs from '@/components/ui/Tabs.vue'
import TabsList from '@/components/ui/TabsList.vue'
import TabsTrigger from '@/components/ui/TabsTrigger.vue'
import TabsContent from '@/components/ui/TabsContent.vue'
import {
  RefreshCw, ShieldCheck, ShieldAlert, Info, CheckCircle2,
  Brain, Shield, Server,
} from 'lucide-vue-next'

const updateTime = ref(new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }))

function refreshData() {
  updateTime.value = new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const riskItems = [
  { label: '沙箱异常连接', value: 3, desc: '监控沙箱环境中异常的网络连接尝试，包括未经授权的外部通信和可疑端口访问。' },
  { label: '沙箱异常文件访问', value: 7, desc: '检测沙箱内模型对文件系统的异常访问行为，如越权读写敏感文件。' },
  { label: '沙箱容器逃逸', value: 0, desc: '监控沙箱容器是否存在逃逸行为，防止恶意程序突破隔离环境获取宿主机权限。' },
]

const protectionItems = [
  { label: '已拦截风险', value: 128, isNumber: true, desc: '统计当前周期内成功拦截的安全风险事件总数，包括注入攻击、越权访问等。' },
  { label: '应用层会话加密', active: true, desc: '在应用层对用户会话数据进行端到端加密，防止会话数据在传输过程中被窃取或篡改。' },
  { label: '网络层传输加密', active: true, desc: '采用 TLS 等协议对网络层数据传输进行加密，确保通信链路的数据安全性。' },
]

const modelSecuritySections = [
  {
    title: '模型防泄露与知识产权保护',
    icon: Brain,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    enabled: true,
    items: [
      { text: '防止通过 prompt 注入、成员推断等方式窃取模型参数、权重或训练数据，避免模型被逆向工程或盗用。' },
      { text: '模型水印、溯源技术：为模型添加隐形标识，追踪模型的非法分发与滥用。' },
    ],
  },
  {
    title: '模型防攻击与鲁棒性防护',
    icon: ShieldAlert,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    enabled: true,
    items: [
      { text: '对抗样本防御：防止恶意构造的输入（如带微小扰动的图片 / 文本）误导模型输出错误结果。' },
      { text: '数据投毒防护：防止训练数据被污染，避免模型在特定场景下出现安全漏洞或偏见。' },
    ],
  },
  {
    title: '模型行为安全与合规管控',
    icon: ShieldCheck,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    enabled: false,
    items: [
      { text: '内置安全护栏（Safety Guardrails）：防止模型生成违法违规、有害或敏感内容（如暴力、歧视、诈骗信息）。' },
      { text: '权限与访问控制：限制模型的调用范围、用户权限，防止被用于恶意用途（如批量生成钓鱼邮件、恶意代码）。' },
    ],
  },
  {
    title: '模型运行环境安全',
    icon: Server,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    enabled: true,
    items: [
      { text: '与「可信安全沙箱」联动，确保模型在隔离、不可篡改的安全环境中运行，防止模型被篡改、替换或被非法调用。' },
    ],
  },
]
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-1 xl:grid-cols-3">
    <!-- Left Panel -->
    <div class="space-y-4 lg:col-span-1 xl:col-span-1">
      <!-- Risk Monitoring Card -->
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <ShieldAlert class="h-5 w-5 text-orange-500" />
            <CardTitle class="text-base">风险监控中</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="item in riskItems" :key="item.label" class="flex flex-col items-left text-left bg-gray-50 rounded-lg px-3 py-2">
              <div class="flex items-center gap-1 mb-2 ">
                <span class="text-xs text-muted-foreground">{{ item.label }}</span>
                <div class="group relative inline-flex">
                  <Info class="h-3 w-3 cursor-help text-muted-foreground hover:text-foreground transition-colors" />
                  <div class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
                    {{ item.desc }}
                    <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
                  </div>
                </div>
              </div>
              <span class="text-3xl font-bold" :class="item.value > 0 ? 'text-orange-600' : 'text-green-600'">{{ item.value }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Protection Card -->
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <ShieldCheck class="h-5 w-5 text-green-500" />
            <CardTitle class="text-base">全方位安全防护</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="item in protectionItems" :key="item.label" class="flex flex-col items-left text-left bg-gray-50 rounded-lg px-3 py-2">
              <div class="flex items-center gap-1 mb-2">
                <span class="text-xs text-muted-foreground">{{ item.label }}</span>
                <div class="group relative inline-flex">
                  <Info class="h-3 w-3 cursor-help text-muted-foreground hover:text-foreground transition-colors" />
                  <div class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
                    {{ item.desc }}
                    <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
                  </div>
                </div>
              </div>
              <span v-if="item.isNumber" class="text-3xl font-bold text-green-600">{{ item.value }}</span>
              <Badge v-else variant="outline" class="w-fit gap-1 text-green-600 border-green-200 bg-green-50 mt-3">
                <CheckCircle2 class="h-3 w-3" />已启用
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Data update time -->
      <div class="flex items-center justify-between">
        <span class="text-xs text-muted-foreground">数据更新时间：{{ updateTime }}</span>
        <Button variant="ghost" size="icon" class="h-7 w-7" @click="refreshData">
          <RefreshCw class="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="lg:col-span-2 xl:col-span-2">
      <Tabs default-value="model" class="w-full">
        <TabsList class="mb-4">
          <TabsTrigger value="model">模型安全</TabsTrigger>
          <TabsTrigger value="architecture">数据安全架构示意图</TabsTrigger>
        </TabsList>

        <!-- Model Security Tab -->
        <TabsContent value="model">
          <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-4  gap-4">
            <Card v-for="section in modelSecuritySections" :key="section.title" class="flex flex-col overflow-hidden">
              <CardHeader class="pb-3">
                <div class="flex items-start gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" :class="section.iconBg">
                    <component :is="section.icon" class="h-5 w-5" :class="section.iconColor" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <CardTitle class="text-sm leading-tight">{{ section.title }}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="flex-1 flex flex-col">
                <ul class="space-y-2.5 flex-1">
                  <li v-for="(item, idx) in section.items" :key="idx" class="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <div class="mt-1 h-1 w-1 shrink-0 rounded-full" :class="section.iconColor.replace('text-', 'bg-')" />
                    <span>{{ item.text }}</span>
                  </li>
                </ul>
                <div class="mt-4 pt-3 ">
                  <Badge v-if="section.enabled" variant="outline" class=" py-2 gap-1 text-green-600 border-green-200 bg-green-50 w-full justify-center">
                    <ShieldCheck class="h-3 w-3" />保护已开启
                  </Badge>
                  <div v-else class="grid grid-cols-2 gap-2">
                    <Badge  variant="outline" class="py-1 gap-1 text-muted-foreground w-full justify-center">
                      <ShieldAlert class="h-3 w-3" />未开启
                    </Badge>
                    <Button size="sm">去开启</Button>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- Architecture Diagram Tab -->
        <TabsContent value="architecture">
          <Card class="overflow-hidden">
            <CardContent class="p-0">
              <!-- // [AI_START TIMESTAMP=2025-06-28 12:00:00] -->
              <svg viewBox="0 0 880 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" role="img" aria-label="数据安全架构示意图：客户私域通过加密通道与可信安全沙箱进行数据交互">
                <defs>
                  <!-- Background -->
                  <linearGradient id="archBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#F8FAFC" />
                    <stop offset="100%" stop-color="#EEF2F7" />
                  </linearGradient>

                  <!-- Dot grid pattern -->
                  <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#CBD5E1" opacity="0.35" />
                  </pattern>

                  <!-- Card inner gradient for depth -->
                  <linearGradient id="cardInner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="100%" stop-color="#FAFBFD" />
                  </linearGradient>

                  <!-- Icon circle gradients -->
                  <radialGradient id="blueIconGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#EFF6FF" />
                    <stop offset="100%" stop-color="#DBEAFE" />
                  </radialGradient>
                  <radialGradient id="greenIconGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ECFDF5" />
                    <stop offset="100%" stop-color="#D1FAE5" />
                  </radialGradient>
                  <radialGradient id="amberIconGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#FFFBEB" />
                    <stop offset="100%" stop-color="#FEF3C7" />
                  </radialGradient>

                  <!-- Soft card shadow (elevation 1) -->
                  <filter id="shadowSm" x="-10%" y="-10%" width="120%" height="125%">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#0F172A" flood-opacity="0.05" />
                  </filter>
                  <!-- Medium card shadow (elevation 2) -->
                  <filter id="shadowMd" x="-12%" y="-12%" width="124%" height="128%">
                    <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.07" />
                  </filter>
                  <!-- Glow filters -->
                  <filter id="glowBlue" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glowGreen" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  <!-- Arrow markers -->
                  <marker id="mBlue" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                    <path d="M0,1.5 L10,5 L0,8.5 Z" fill="#2563EB" />
                  </marker>
                  <marker id="mGreen" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                    <path d="M0,1.5 L10,5 L0,8.5 Z" fill="#059669" />
                  </marker>
                  <marker id="mOrange" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                    <path d="M0,1.5 L10,5 L0,8.5 Z" fill="#D97706" />
                  </marker>

                  <!-- Clip path for top accent bar -->
                  <clipPath id="clipCardBlue"><rect x="48" y="84" width="228" height="296" rx="16" /></clipPath>
                  <clipPath id="clipCardGreen"><rect x="326" y="84" width="228" height="296" rx="16" /></clipPath>
                  <clipPath id="clipCardAmber"><rect x="604" y="84" width="228" height="296" rx="16" /></clipPath>
                </defs>

                <!-- Background base -->
                <rect width="880" height="480" rx="12" fill="url(#archBg)" />
                <!-- Dot grid overlay -->
                <rect width="880" height="480" rx="12" fill="url(#dotGrid)" />

                <!-- ====== LEFT CARD: Customer Private Domain ====== -->
                <g filter="url(#shadowMd)">
                  <rect x="48" y="84" width="228" height="296" rx="16" fill="url(#cardInner)" />
                  <!-- Top accent bar clipped to card -->
                  <rect x="48" y="84" width="228" height="6" fill="#2563EB" clip-path="url(#clipCardBlue)" />
                  <!-- Icon circle with gradient -->
                  <circle cx="162" cy="124" r="24" fill="url(#blueIconGrad)" />
                  <!-- User icon (more refined) -->
                  <path d="M162,112 a7,7 0 1,1 0,0.01 M148,134 a14,14 0 0,1 28,0" stroke="#2563EB" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="162" cy="126" r="2.5" fill="#2563EB" opacity="0.15" />
                  <!-- Title -->
                  <text x="162" y="172" text-anchor="middle" font-size="15" font-weight="700" fill="#1E3A8A" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="0.02em">客户私域</text>
                  <!-- Subtitle label -->
                  <text x="162" y="188" text-anchor="middle" font-size="10" font-weight="500" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="0.04em">PRIVATE DOMAIN</text>
                  <!-- Divider -->
                  <line x1="68" y1="204" x2="256" y2="204" stroke="#E2E8F0" stroke-width="1" />
                  <!-- Content item 1 -->
                  <rect x="68" y="220" width="188" height="52" rx="10" fill="#F8FAFC" stroke="#F1F5F9" stroke-width="1" />
                  <text x="162" y="242" text-anchor="middle" font-size="12" font-weight="600" fill="#334155" font-family="system-ui, -apple-system, Segoe UI, sans-serif">输入 Prompt</text>
                  <text x="162" y="258" text-anchor="middle" font-size="11" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif">（提示词）</text>
                  <!-- Internal arrow -->
                  <path d="M162,282 L162,298 M157,292 L162,298 L167,292" stroke="#CBD5E1" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                  <!-- Content item 2 -->
                  <rect x="68" y="308" width="188" height="52" rx="10" fill="#F8FAFC" stroke="#F1F5F9" stroke-width="1" />
                  <text x="162" y="330" text-anchor="middle" font-size="12" font-weight="600" fill="#334155" font-family="system-ui, -apple-system, Segoe UI, sans-serif">接收 Response</text>
                  <text x="162" y="346" text-anchor="middle" font-size="11" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif">（模型响应）</text>
                </g>

                <!-- ====== CENTER CARD: Access Layer ====== -->
                <g filter="url(#shadowMd)">
                  <rect x="326" y="84" width="228" height="296" rx="16" fill="url(#cardInner)" />
                  <rect x="326" y="84" width="228" height="6" fill="#059669" clip-path="url(#clipCardGreen)" />
                  <!-- Lock icon circle -->
                  <circle cx="440" cy="124" r="24" fill="url(#greenIconGrad)" />
                  <!-- Lock icon (refined) -->
                  <rect x="433" y="118" width="14" height="12" rx="3" stroke="#059669" stroke-width="2" fill="none" />
                  <path d="M436,118 v-4 a4,4 0 0,1 8,0 v4" stroke="#059669" stroke-width="2" fill="none" stroke-linecap="round" />
                  <circle cx="440" cy="124" r="2" fill="#059669" />
                  <!-- Title -->
                  <text x="440" y="172" text-anchor="middle" font-size="15" font-weight="700" fill="#065F46" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="0.02em">接入层</text>
                  <text x="440" y="188" text-anchor="middle" font-size="10" font-weight="500" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="0.04em">ACCESS LAYER</text>
                  <!-- Divider -->
                  <line x1="346" y1="204" x2="534" y2="204" stroke="#E2E8F0" stroke-width="1" />
                  <!-- Content item 1 -->
                  <rect x="346" y="220" width="188" height="48" rx="10" fill="#F8FAFC" stroke="#F1F5F9" stroke-width="1" />
                  <text x="440" y="240" text-anchor="middle" font-size="12" font-weight="600" fill="#334155" font-family="system-ui, -apple-system, Segoe UI, sans-serif">接入点登录</text>
                  <text x="440" y="256" text-anchor="middle" font-size="10" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif">身份鉴权 / 权限校验</text>
                  <!-- Content item 2 (encryption highlight) -->
                  <rect x="346" y="280" width="188" height="72" rx="10" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="1.5" />
                  <text x="440" y="302" text-anchor="middle" font-size="12" font-weight="600" fill="#334155" font-family="system-ui, -apple-system, Segoe UI, sans-serif">全链路加密通道</text>
                  <text x="440" y="320" text-anchor="middle" font-size="11" font-weight="700" fill="#059669" font-family="system-ui, -apple-system, Segoe UI, sans-serif">TLS / mTLS</text>
                  <text x="440" y="338" text-anchor="middle" font-size="10" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif">端到端加密传输</text>
                  <!-- Subtle lock indicator -->
                  <circle cx="524" cy="296" r="10" fill="#D1FAE5" opacity="0.6" />
                  <path d="M520,296 L524,300 L530,292" stroke="#059669" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                </g>

                <!-- ====== RIGHT CARD: Sandbox ====== -->
                <g filter="url(#shadowMd)">
                  <rect x="604" y="84" width="228" height="296" rx="16" fill="url(#cardInner)" />
                  <rect x="604" y="84" width="228" height="6" fill="#D97706" clip-path="url(#clipCardAmber)" />
                  <!-- Shield icon circle -->
                  <circle cx="718" cy="124" r="24" fill="url(#amberIconGrad)" />
                  <!-- Shield icon (refined) -->
                  <path d="M718,106 L732,114 v12 a14,14 0 0,1 -14,14 a14,14 0 0,1 -14,-14 v-12 Z" stroke="#D97706" stroke-width="2" fill="none" stroke-linejoin="round" />
                  <path d="M714,124 l3.5,3.5 l7.5,-7.5" stroke="#D97706" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                  <!-- Title -->
                  <text x="718" y="172" text-anchor="middle" font-size="15" font-weight="700" fill="#92400E" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="0.02em">可信安全沙箱</text>
                  <text x="718" y="188" text-anchor="middle" font-size="10" font-weight="500" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="0.04em">TRUSTED SANDBOX</text>
                  <!-- Divider -->
                  <line x1="624" y1="204" x2="812" y2="204" stroke="#E2E8F0" stroke-width="1" />
                  <!-- Content item 1 -->
                  <rect x="624" y="220" width="188" height="52" rx="10" fill="#F8FAFC" stroke="#F1F5F9" stroke-width="1" />
                  <text x="718" y="242" text-anchor="middle" font-size="12" font-weight="600" fill="#334155" font-family="system-ui, -apple-system, Segoe UI, sans-serif">模型推理中</text>
                  <text x="718" y="258" text-anchor="middle" font-size="11" fill="#64748B" font-family="system-ui, -apple-system, Segoe UI, sans-serif">隔离 / 不可篡改环境</text>
                  <!-- Highlight badge -->
                  <rect x="624" y="286" width="188" height="52" rx="10" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5" />
                  <text x="718" y="308" text-anchor="middle" font-size="12" font-weight="700" fill="#B45309" font-family="system-ui, -apple-system, Segoe UI, sans-serif">数据「可用不可见」</text>
                  <text x="718" y="326" text-anchor="middle" font-size="10" font-weight="600" fill="#D97706" font-family="system-ui, -apple-system, Segoe UI, sans-serif">Prompt 不出域</text>
                  <!-- Small shield badge -->
                  <circle cx="636" cy="312" r="8" fill="#FDE68A" opacity="0.5" />
                  <path d="M634,310 l2,2 l4,-4" stroke="#B45309" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                </g>

                <!-- ====== DATA FLOW ARROWS (upper: left→center→right) ====== -->
                <!-- Prompt: Left -> Center -->
                <g>
                  <!-- Animated dashed flow line -->
                  <path d="M280,198 C300,198 306,198 326,198" stroke="#2563EB" stroke-width="2.5" fill="none" marker-end="url(#mBlue)" stroke-dasharray="6,4" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  <!-- Flow label badge -->
                  <rect x="278" y="178" width="48" height="22" rx="6" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1" filter="url(#shadowSm)" />
                  <text x="302" y="193" text-anchor="middle" font-size="10" font-weight="700" fill="#2563EB" font-family="system-ui, -apple-system, Segoe UI, sans-serif">Prompt</text>
                  <!-- Glowing dot -->
                  <circle cx="300" cy="198" r="3" fill="#3B82F6" filter="url(#glowBlue)">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                <!-- Encrypted Prompt: Center -> Right -->
                <g>
                  <path d="M558,198 C578,198 584,198 604,198" stroke="#059669" stroke-width="2.5" fill="none" marker-end="url(#mGreen)" stroke-dasharray="6,4" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  <rect x="556" y="178" width="48" height="22" rx="6" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1" filter="url(#shadowSm)" />
                  <text x="580" y="193" text-anchor="middle" font-size="10" font-weight="700" fill="#059669" font-family="system-ui, -apple-system, Segoe UI, sans-serif">加密</text>
                  <circle cx="578" cy="198" r="3" fill="#10B981" filter="url(#glowGreen)">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                <!-- ====== DATA FLOW ARROWS (lower: right→center→left) ====== -->
                <!-- Encrypted Response: Right -> Center -->
                <g>
                  <path d="M604,264 C584,264 578,264 558,264" stroke="#D97706" stroke-width="2.5" fill="none" marker-end="url(#mOrange)" stroke-dasharray="6,4" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.6s" repeatCount="indefinite" />
                  </path>
                  <rect x="556" y="268" width="48" height="22" rx="6" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1" filter="url(#shadowSm)" />
                  <text x="580" y="283" text-anchor="middle" font-size="10" font-weight="700" fill="#B45309" font-family="system-ui, -apple-system, Segoe UI, sans-serif">加密</text>
                </g>

                <!-- Response: Center -> Left -->
                <g>
                  <path d="M326,264 C306,264 300,264 280,264" stroke="#059669" stroke-width="2.5" fill="none" marker-end="url(#mGreen)" stroke-dasharray="6,4" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.6s" repeatCount="indefinite" />
                  </path>
                  <rect x="278" y="268" width="48" height="22" rx="6" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1" filter="url(#shadowSm)" />
                  <text x="302" y="283" text-anchor="middle" font-size="10" font-weight="700" fill="#059669" font-family="system-ui, -apple-system, Segoe UI, sans-serif">Response</text>
                </g>

                <!-- ====== CONNECTION STATUS DOTS (on card edges) ====== -->
                <!-- Left card right-edge dots -->
                <circle cx="276" cy="198" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2" />
                <circle cx="276" cy="264" r="4" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
                <!-- Center card dots -->
                <circle cx="326" cy="198" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2" />
                <circle cx="326" cy="264" r="4" fill="#FFFFFF" stroke="#D97706" stroke-width="2" />
                <circle cx="554" cy="198" r="4" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
                <circle cx="554" cy="264" r="4" fill="#FFFFFF" stroke="#D97706" stroke-width="2" />
                <!-- Right card dots -->
                <circle cx="604" cy="198" r="4" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
                <circle cx="604" cy="264" r="4" fill="#FFFFFF" stroke="#D97706" stroke-width="2" />

                <!-- ====== BOTTOM ANNOTATION BAR ====== -->
                <g filter="url(#shadowMd)">
                  <rect x="90" y="412" width="700" height="48" rx="12" fill="white" />
                  <!-- Left accent strip -->
                  <rect x="90" y="412" width="4" height="48" rx="2" fill="#2563EB" />
                  <!-- Info icon -->
                  <circle cx="118" cy="436" r="12" fill="#EFF6FF" />
                  <text x="118" y="440" text-anchor="middle" font-size="12" font-weight="700" fill="#2563EB" font-family="system-ui, -apple-system, Segoe UI, sans-serif">i</text>
                  <!-- Main text -->
                  <text x="144" y="432" font-size="13" font-weight="500" fill="#475569" font-family="system-ui, -apple-system, Segoe UI, sans-serif">
                    用户 Prompt 数据仅在沙箱内进行推理计算，响应结果再通过加密通道返回客户私域
                  </text>
                  <!-- Highlight text -->
                  <text x="144" y="450" font-size="12" font-weight="700" fill="#1E40AF" font-family="system-ui, -apple-system, Segoe UI, sans-serif">
                    实现数据「可用不可见」
                  </text>
                  <!-- Decorative lock icon on right -->
                  <circle cx="758" cy="436" r="14" fill="#F0FDF4" />
                  <rect x="752" y="432" width="12" height="10" rx="2" stroke="#059669" stroke-width="1.6" fill="none" />
                  <path d="M754,432 v-3 a3,3 0 0,1 6,0 v3" stroke="#059669" stroke-width="1.6" fill="none" stroke-linecap="round" />
                </g>
              </svg>
              <!-- // [AI_END LINES=160 TIMESTAMP=2025-06-28 12:00:00] -->
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
<!-- [AI_END LINES=393 TIMESTAMP=2025-06-15 12:00:00] -->

