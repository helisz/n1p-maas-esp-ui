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
    enabled: true,
    items: [
      { text: '防止通过 prompt 注入、成员推断等方式窃取模型参数、权重或训练数据，避免模型被逆向工程或盗用。' },
      { text: '模型水印、溯源技术：为模型添加隐形标识，追踪模型的非法分发与滥用。' },
    ],
  },
  {
    title: '模型防攻击与鲁棒性防护',
    enabled: true,
    items: [
      { text: '对抗样本防御：防止恶意构造的输入（如带微小扰动的图片 / 文本）误导模型输出错误结果。' },
      { text: '数据投毒防护：防止训练数据被污染，避免模型在特定场景下出现安全漏洞或偏见。' },
    ],
  },
  {
    title: '模型行为安全与合规管控',
    enabled: true,
    items: [
      { text: '内置安全护栏（Safety Guardrails）：防止模型生成违法违规、有害或敏感内容（如暴力、歧视、诈骗信息）。' },
      { text: '权限与访问控制：限制模型的调用范围、用户权限，防止被用于恶意用途（如批量生成钓鱼邮件、恶意代码）。' },
    ],
  },
  {
    title: '模型运行环境安全',
    enabled: true,
    items: [
      { text: '与「可信安全沙箱」联动，确保模型在隔离、不可篡改的安全环境中运行，防止模型被篡改、替换或被非法调用。' },
    ],
  },
]
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-3">
    <!-- Left Panel -->
    <div class="space-y-4 lg:col-span-1">
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
    <div class="lg:col-span-2">
      <Tabs default-value="model" class="w-full">
        <TabsList class="mb-4">
          <TabsTrigger value="model">模型安全</TabsTrigger>
          <TabsTrigger value="architecture">数据安全架构示意图</TabsTrigger>
        </TabsList>

        <!-- Model Security Tab -->
        <TabsContent value="model" class="space-y-4">
          <Card v-for="section in modelSecuritySections" :key="section.title" class="overflow-hidden">
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <CardTitle class="text-base">{{ section.title }}</CardTitle>
                <Badge v-if="section.enabled" variant="outline" class="gap-1 text-green-600 border-green-200 bg-green-50">
                  <ShieldCheck class="h-3 w-3" />保护已开启
                </Badge>
                <Badge v-else variant="outline" class="gap-1 text-muted-foreground">
                  <ShieldAlert class="h-3 w-3" />未开启
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li v-for="(item, idx) in section.items" :key="idx" class="flex items-start gap-2 text-sm text-muted-foreground">
                  <div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {{ item.text }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Architecture Diagram Tab -->
        <TabsContent value="architecture">
          <Card class="overflow-hidden">
            <CardContent class="p-0">
              <svg viewBox="0 0 840 520" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" role="img" aria-label="数据安全架构示意图：客户私域通过加密通道与可信安全沙箱进行数据交互">
                <defs>
                  <!-- Background -->
                  <linearGradient id="archBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#F8FAFC" />
                    <stop offset="100%" stop-color="#F1F5F9" />
                  </linearGradient>

                  <!-- Soft shadow for isometric blocks -->
                  <filter id="isoShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.06" />
                  </filter>
                  <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.07" />
                  </filter>

                  <!-- Gradients for isometric faces -->
                  <linearGradient id="cTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#DBEAFE" />
                    <stop offset="100%" stop-color="#BFDBFE" />
                  </linearGradient>
                  <linearGradient id="cFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#93C5FD" />
                    <stop offset="100%" stop-color="#60A5FA" />
                  </linearGradient>
                  <linearGradient id="cSide" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#60A5FA" />
                    <stop offset="100%" stop-color="#3B82F6" />
                  </linearGradient>

                  <linearGradient id="gTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#D1FAE5" />
                    <stop offset="100%" stop-color="#A7F3D0" />
                  </linearGradient>
                  <linearGradient id="gFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6EE7B7" />
                    <stop offset="100%" stop-color="#34D399" />
                  </linearGradient>
                  <linearGradient id="gSide" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#34D399" />
                    <stop offset="100%" stop-color="#10B981" />
                  </linearGradient>

                  <linearGradient id="sTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FEF3C7" />
                    <stop offset="100%" stop-color="#FDE68A" />
                  </linearGradient>
                  <linearGradient id="sFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FCD34D" />
                    <stop offset="100%" stop-color="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="sSide" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#F59E0B" />
                    <stop offset="100%" stop-color="#D97706" />
                  </linearGradient>

                  <!-- Arrow markers -->
                  <marker id="arrBlue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#3B82F6" />
                  </marker>
                  <marker id="arrGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
                  </marker>
                  <marker id="arrOrange" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#D97706" />
                  </marker>
                </defs>

                <!-- Background -->
                <rect width="840" height="520" rx="12" fill="url(#archBg)" />

                <!-- Ground plane connection line -->
                <path d="M120,440 L420,440 L720,440" stroke="#E2E8F0" stroke-width="2" stroke-dasharray="8,6" fill="none" />

                <!-- LEFT: Customer Private Domain (Isometric Block) -->
                <g filter="url(#isoShadow)">
                  <!-- Top face -->
                  <path d="M120,300 L220,250 L320,300 L220,350 Z" fill="url(#cTop)" />
                  <!-- Front face -->
                  <path d="M120,300 L220,350 L220,440 L120,390 Z" fill="url(#cFront)" />
                  <!-- Side face -->
                  <path d="M220,350 L320,300 L320,390 L220,440 Z" fill="url(#cSide)" />

                  <!-- Top icon: user -->
                  <g transform="translate(220,300)">
                    <circle cx="0" cy="-18" r="14" fill="white" opacity="0.95" />
                    <circle cx="0" cy="-22" r="5" fill="#3B82F6" />
                    <path d="M-8,-10 Q0,-16 8,-10 L8,-4 Q0,-10 -8,-4 Z" fill="#3B82F6" />
                    <circle cx="0" cy="-18" r="14" fill="none" stroke="white" stroke-width="2" opacity="0.6" />
                  </g>

                  <!-- Front panel: title -->
                  <g transform="translate(170,365)">
                    <rect x="-55" y="-16" width="110" height="28" rx="6" fill="white" opacity="0.92" />
                    <text x="0" y="2" text-anchor="middle" font-size="12" font-weight="700" fill="#1D4ED8">客户私域</text>
                  </g>

                  <!-- Side panels -->
                  <g transform="translate(270,365)">
                    <rect x="-38" y="-14" width="76" height="22" rx="5" fill="white" opacity="0.85" />
                    <text x="0" y="2" text-anchor="middle" font-size="9" font-weight="600" fill="#1E40AF">输入 Prompt</text>
                  </g>
                  <g transform="translate(270,395)">
                    <rect x="-42" y="-14" width="84" height="22" rx="5" fill="white" opacity="0.85" />
                    <text x="0" y="2" text-anchor="middle" font-size="9" font-weight="600" fill="#1E40AF">接收 Response</text>
                  </g>
                </g>

                <!-- CENTER: Access Layer (Isometric Block) -->
                <g filter="url(#isoShadow)">
                  <!-- Top face -->
                  <path d="M370,300 L470,250 L570,300 L470,350 Z" fill="url(#gTop)" />
                  <!-- Front face -->
                  <path d="M370,300 L470,350 L470,440 L370,390 Z" fill="url(#gFront)" />
                  <!-- Side face -->
                  <path d="M470,350 L570,300 L570,390 L470,440 Z" fill="url(#gSide)" />

                  <!-- Top icon: lock -->
                  <g transform="translate(470,300)">
                    <rect x="-10" y="-6" width="20" height="16" rx="3" fill="white" opacity="0.95" />
                    <rect x="-6" y="-14" width="12" height="10" rx="5" fill="none" stroke="white" stroke-width="2.5" opacity="0.95" />
                    <circle cx="0" cy="2" r="2" fill="#10B981" />
                  </g>

                  <!-- Front panel: title -->
                  <g transform="translate(420,365)">
                    <rect x="-45" y="-16" width="90" height="28" rx="6" fill="white" opacity="0.92" />
                    <text x="0" y="2" text-anchor="middle" font-size="12" font-weight="700" fill="#047857">接入层</text>
                  </g>

                  <!-- Side panels -->
                  <g transform="translate(520,358)">
                    <rect x="-42" y="-12" width="84" height="22" rx="5" fill="white" opacity="0.85" />
                    <text x="0" y="3" text-anchor="middle" font-size="9" font-weight="600" fill="#065F46">接入点登录</text>
                  </g>
                  <g transform="translate(520,388)">
                    <rect x="-48" y="-16" width="96" height="30" rx="5" fill="white" opacity="0.85" />
                    <text x="0" y="-2" text-anchor="middle" font-size="9" font-weight="600" fill="#065F46">全链路加密通道</text>
                    <text x="0" y="10" text-anchor="middle" font-size="8" fill="#059669">TLS / mTLS</text>
                  </g>
                </g>

                <!-- RIGHT: Sandbox (Isometric Block) -->
                <g filter="url(#isoShadow)">
                  <!-- Top face -->
                  <path d="M620,300 L720,250 L820,300 L720,350 Z" fill="url(#sTop)" />
                  <!-- Front face -->
                  <path d="M620,300 L720,350 L720,440 L620,390 Z" fill="url(#sFront)" />
                  <!-- Side face -->
                  <path d="M720,350 L820,300 L820,390 L720,440 Z" fill="url(#sSide)" />

                  <!-- Top icon: shield -->
                  <g transform="translate(720,300)">
                    <path d="M0,-18 L14,-10 V2 Q14,10 0,18 Q-14,10 -14,2 V-10 Z" fill="white" opacity="0.95" />
                    <path d="M0,-14 L10,-8 V0 Q10,6 0,12 Q-10,6 -10,0 V-8 Z" fill="#F59E0B" />
                    <path d="M-3,0 L-1,4 L4,-3" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                  </g>

                  <!-- Front panel: title -->
                  <g transform="translate(670,365)">
                    <rect x="-60" y="-18" width="120" height="32" rx="6" fill="white" opacity="0.92" />
                    <text x="0" y="-2" text-anchor="middle" font-size="11" font-weight="700" fill="#B45309">Sandbox</text>
                    <text x="0" y="11" text-anchor="middle" font-size="10" font-weight="600" fill="#B45309">可信安全沙箱</text>
                  </g>

                  <!-- Side panels -->
                  <g transform="translate(770,358)">
                    <rect x="-42" y="-12" width="84" height="22" rx="5" fill="white" opacity="0.85" />
                    <text x="0" y="3" text-anchor="middle" font-size="9" font-weight="600" fill="#92400E">模型推理中</text>
                  </g>
                  <g transform="translate(770,388)">
                    <rect x="-50" y="-14" width="100" height="26" rx="5" fill="#FFFBEB" opacity="0.95" stroke="#FCD34D" stroke-width="1" />
                    <text x="0" y="4" text-anchor="middle" font-size="9" font-weight="700" fill="#B45309">数据「可用不可见」</text>
                  </g>
                </g>

                <!-- Data Flow Arrows -->
                <!-- Prompt: Left -> Center -->
                <g>
                  <path d="M320,390 Q360,410 370,400" stroke="#3B82F6" stroke-width="2.5" fill="none" stroke-dasharray="6,4" marker-end="url(#arrBlue)" />
                  <rect x="332" y="382" width="46" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1" />
                  <text x="355" y="395" text-anchor="middle" font-size="9" font-weight="600" fill="#2563EB">Prompt</text>
                </g>

                <!-- Encrypted Prompt: Center -> Right -->
                <g>
                  <path d="M570,390 Q610,410 620,400" stroke="#10B981" stroke-width="2.5" fill="none" stroke-dasharray="6,4" marker-end="url(#arrGreen)" />
                  <rect x="562" y="407" width="36" height="16" rx="4" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1" />
                  <text x="580" y="418" text-anchor="middle" font-size="8" font-weight="600" fill="#059669">加密</text>
                </g>

                <!-- Encrypted Response: Right -> Center -->
                <g>
                  <path d="M620,360 Q580,340 570,350" stroke="#D97706" stroke-width="2.5" fill="none" stroke-dasharray="6,4" marker-end="url(#arrOrange)" />
                  <rect x="572" y="332" width="36" height="16" rx="4" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1" />
                  <text x="590" y="343" text-anchor="middle" font-size="8" font-weight="600" fill="#B45309">加密</text>
                </g>

                <!-- Response: Center -> Left -->
                <g>
                  <path d="M370,360 Q330,340 320,350" stroke="#10B981" stroke-width="2.5" fill="none" stroke-dasharray="6,4" marker-end="url(#arrGreen)" />
                  <rect x="332" y="332" width="54" height="18" rx="4" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1" />
                  <text x="359" y="345" text-anchor="middle" font-size="9" font-weight="600" fill="#059669">Response</text>
                </g>


                <!-- Bottom Annotation -->
                <g filter="url(#cardShadow)">
                  <rect x="80" y="468" width="680" height="36" rx="8" fill="white" />
                  <text x="420" y="490" text-anchor="middle" font-size="12" font-weight="500" fill="#475569">
                    用户 Prompt 数据仅在沙箱内进行推理计算，响应结果再通过加密通道返回客户私域，实现数据「可用不可见」
                  </text>
                </g>

                <!-- Decorative dots -->
                <circle cx="220" cy="440" r="3" fill="#CBD5E1" />
                <circle cx="470" cy="440" r="3" fill="#CBD5E1" />
                <circle cx="720" cy="440" r="3" fill="#CBD5E1" />
              </svg>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
<!-- [AI_END LINES=393 TIMESTAMP=2025-06-15 12:00:00] -->

