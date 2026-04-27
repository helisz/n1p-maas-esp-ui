<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onUpdated, watch, nextTick } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Tabs from '@/components/ui/Tabs.vue'
import TabsList from '@/components/ui/TabsList.vue'
import TabsTrigger from '@/components/ui/TabsTrigger.vue'
import TabsContent from '@/components/ui/TabsContent.vue'
import Progress from '@/components/ui/Progress.vue'
import Table from '@/components/ui/Table.vue'
import TableHeader from '@/components/ui/TableHeader.vue'
import TableBody from '@/components/ui/TableBody.vue'
import TableRow from '@/components/ui/TableRow.vue'
import TableHead from '@/components/ui/TableHead.vue'
import TableCell from '@/components/ui/TableCell.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import SecurityAuditContent from '@/components/portal/SecurityAuditContent.vue'
import {
  Key, Eye, EyeOff, Copy, RefreshCw, AlertTriangle,
  CheckCircle2, Activity, TrendingUp, Clock, Server,
} from 'lucide-vue-next'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const myPackages = [
  { id: 'pkg-001', name: '高级版', status: 'active', startDate: '2024-03-15', endDate: '2024-06-15', usedCalls: 89456, totalCalls: 200000, apiEndpoint: 'https://api.maas-portal.com/v1' },
  { id: 'pkg-002', name: '基础版', status: 'active', startDate: '2024-02-01', endDate: '2024-05-01', usedCalls: 78000, totalCalls: 100000, apiEndpoint: 'https://api.maas-portal.com/v1' },
  { id: 'pkg-003', name: '尊享版', status: 'expiring', startDate: '2024-01-15', endDate: '2024-04-01', usedCalls: 450000, totalCalls: 1000000, apiEndpoint: 'https://api.maas-portal.com/v1' },
]
const apiKeys = [
  { id: 'key-001', name: '生产环境密钥', accessKey: 'ak_prod_xxxxxxxxxxxx1234', secretKey: 'sk_prod_xxxxxxxxxxxxxxxxxxxxxxxx5678', createdAt: '2024-03-15 10:30:00', status: 'active' },
  { id: 'key-002', name: '测试环境密钥', accessKey: 'ak_test_xxxxxxxxxxxx9876', secretKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxx4321', createdAt: '2024-03-10 14:20:00', status: 'active' },
]

const stats7d = [
  { date: '03-10', calls: 4500 }, { date: '03-11', calls: 2200 },
  { date: '03-12', calls: 4800 }, { date: '03-13', calls: 4100 },
  { date: '03-14', calls: 2500 }, { date: '03-15', calls: 1200 },
  { date: '03-16', calls: 3800 },
]

const stats30d = [
  { date: '02-15', calls: 3200 }, { date: '02-16', calls: 4100 }, { date: '02-17', calls: 3800 },
  { date: '02-18', calls: 4500 }, { date: '02-19', calls: 5200 }, { date: '02-20', calls: 4900 },
  { date: '02-21', calls: 5600 }, { date: '02-22', calls: 6100 }, { date: '02-23', calls: 5800 },
  { date: '02-24', calls: 5300 }, { date: '02-25', calls: 4700 }, { date: '02-26', calls: 5100 },
  { date: '02-27', calls: 6200 }, { date: '02-28', calls: 5900 }, { date: '02-29', calls: 6500 },
  { date: '03-01', calls: 6800 }, { date: '03-02', calls: 7200 }, { date: '03-03', calls: 6900 },
  { date: '03-04', calls: 7400 }, { date: '03-05', calls: 7100 }, { date: '03-06', calls: 7800 },
  { date: '03-07', calls: 7500 }, { date: '03-08', calls: 8200 }, { date: '03-09', calls: 7900 },
  { date: '03-10', calls: 4500 }, { date: '03-11', calls: 5200 }, { date: '03-12', calls: 4800 },
  { date: '03-13', calls: 6100 }, { date: '03-14', calls: 5500 }, { date: '03-15', calls: 7200 },
  { date: '03-16', calls: 6800 },
]

const stats90d = [
  { date: 'W1', calls: 28500 }, { date: 'W2', calls: 31200 }, { date: 'W3', calls: 29800 },
  { date: 'W4', calls: 35600 }, { date: 'W5', calls: 34100 }, { date: 'W6', calls: 38900 },
  { date: 'W7', calls: 37400 }, { date: 'W8', calls: 42100 }, { date: 'W9', calls: 40800 },
  { date: 'W10', calls: 44500 }, { date: 'W11', calls: 43200 }, { date: 'W12', calls: 46800 },
]

type RangeOption = '7d' | '30d' | '90d'
const rangeMap: Record<RangeOption, { label: string; data: typeof stats7d; desc: string }> = {
  '7d': { label: '7天', data: stats7d, desc: '过去7天的调用趋势' },
  '30d': { label: '1个月', data: stats30d, desc: '过去30天的调用趋势' },
  '90d': { label: '3个月', data: stats90d, desc: '过去12周的调用趋势' },
}

const selectedRange = ref<RangeOption>('7d')
const currentStats = computed(() => rangeMap[selectedRange.value].data)

const errorLogs = [
  { time: '2024-03-15 14:32:15', api: '/v1/completions', error: 'Rate limit exceeded', code: 429 },
  { time: '2024-03-15 12:15:30', api: '/v1/embedding', error: 'Invalid input format', code: 400 },
  { time: '2024-03-14 18:45:00', api: '/v1/completions', error: 'Token limit exceeded', code: 400 },
]

const showSecretKey = ref<string | null>(null)
const resetDialogOpen = ref(false)
const selectedKey = ref<typeof apiKeys[0] | null>(null)

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function handleResetKey(key: typeof apiKeys[0]) {
  selectedKey.value = key
  resetDialogOpen.value = true
}

const chartCanvas = ref<HTMLCanvasElement | null>(null)
const chartContainer = ref<HTMLDivElement | null>(null)

function niceStep(maxValue: number, ticks: number): number {
  const rough = maxValue / ticks
  const pow10 = Math.pow(10, Math.floor(Math.log10(rough)))
  const d = rough / pow10
  let nice = 1
  if (d < 1.5) nice = 1
  else if (d < 3) nice = 2
  else if (d < 7) nice = 5
  else nice = 10
  return nice * pow10
}

function drawBarChart() {
  const canvas = chartCanvas.value
  const container = chartContainer.value
  if (!canvas || !container) return

  const rect = container.getBoundingClientRect()
  if (rect.width === 0) {
    requestAnimationFrame(drawBarChart)
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const width = rect.width
  const height = 220

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.scale(dpr, dpr)

  ctx.clearRect(0, 0, width, height)

  const padding = { top: 20, right: 16, bottom: 32, left: 52 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const data = currentStats.value
  const rawMax = Math.max(...data.map((d: { calls: number }) => d.calls))
  const yTicks = 5
  const step = niceStep(rawMax, yTicks)
  const maxValue = step * yTicks

  // Draw Y axis grid lines & labels
  ctx.strokeStyle = '#E5E7EB'
  ctx.lineWidth = 1
  ctx.fillStyle = '#6B7280'
  ctx.font = '11px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'

  for (let i = 0; i <= yTicks; i++) {
    const value = i * step
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight

    // Grid line
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.stroke()

    // Y axis label
    ctx.fillText(String(Math.round(value)), padding.left - 8, y)
  }

  // Y axis line
  ctx.strokeStyle = '#9CA3AF'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(padding.left, padding.top)
  ctx.lineTo(padding.left, height - padding.bottom)
  ctx.stroke()

  // Draw bars
  const barCount = data.length
  const barGap = Math.max(4, 64 / barCount)
  const barWidth = (chartWidth - (barCount - 1) * barGap) / barCount

  data.forEach((stat: { date: string; calls: number }, i: number) => {
    const x = padding.left + i * (barWidth + barGap)
    const barHeight = (stat.calls / maxValue) * chartHeight
    const y = padding.top + chartHeight - barHeight

    // Bar shadow
    ctx.fillStyle = 'rgba(0,0,0,0.06)'
    ctx.fillRect(x + 2, y + 2, barWidth, barHeight)

    // Bar body (dark gray)
    ctx.fillStyle = '#374151'
    ctx.fillRect(x, y, barWidth, barHeight)

    // Top highlight line
    ctx.fillStyle = '#4B5563'
    ctx.fillRect(x, y, barWidth, 2)

    // Value label (only when barCount <= 14 or every nth)
    const showLabel = barCount <= 14 || i % Math.ceil(barCount / 10) === 0
    if (showLabel && barWidth > 18) {
      ctx.fillStyle = '#111827'
      ctx.font = 'bold 10px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText(String(stat.calls), x + barWidth / 2, y - 6)
    }

    // Date label (skip some when too dense)
    const showDate = barCount <= 14 || i % Math.ceil(barCount / 10) === 0
    if (showDate) {
      ctx.fillStyle = '#6B7280'
      ctx.font = '10px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(stat.date, x + barWidth / 2, height - padding.bottom + 8)
    }
  })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (chartContainer.value) {
    resizeObserver = new ResizeObserver(() => drawBarChart())
    resizeObserver.observe(chartContainer.value)
  }
  window.addEventListener('resize', drawBarChart)
})

onUpdated(() => {
  // Re-draw when TabsContent becomes visible or data changes
  drawBarChart()
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  window.removeEventListener('resize', drawBarChart)
})

// Draw when canvas element is first bound to ref (TabsContent mount)
watch(chartCanvas, (el) => {
  if (el) {
    nextTick(() => {
      requestAnimationFrame(drawBarChart)
    })
  }
})

watch(selectedRange, () => {
  nextTick(() => {
    requestAnimationFrame(drawBarChart)
  })
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">服务管理</h2>
      <p class="text-muted-foreground">管理您的套餐、API密钥和调用监控</p>
    </div>

    <Tabs default-value="packages" class="space-y-6">
      <TabsList>
        <TabsTrigger value="packages">我的套餐</TabsTrigger>
        <TabsTrigger value="keys">API 密钥</TabsTrigger>
        <TabsTrigger value="monitor">调用监控</TabsTrigger>
        <TabsTrigger value="security">安全审计</TabsTrigger>
      </TabsList>

      <!-- Packages Tab -->
      <TabsContent value="packages" class="space-y-4">
        <div class="grid gap-4">
          <Card v-for="pkg in myPackages" :key="pkg.id">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><Server class="h-5 w-5" /></div>
                  <div>
                    <CardTitle class="text-lg">{{ pkg.name }}</CardTitle>
                    <CardDescription>有效期：{{ pkg.startDate }} 至 {{ pkg.endDate }}</CardDescription>
                  </div>
                </div>
                <Badge v-if="pkg.status === 'active'" variant="outline" class="gap-1"><CheckCircle2 class="h-3 w-3 text-green-500" />运行中</Badge>
                <Badge v-else variant="outline" class="gap-1"><AlertTriangle class="h-3 w-3 text-red-500" />即将到期</Badge>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">API 调用额度</span>
                  <span>{{ pkg.usedCalls.toLocaleString() }} / {{ pkg.totalCalls.toLocaleString() }} 次</span>
                </div>
                <Progress :value="Math.round((pkg.usedCalls / pkg.totalCalls) * 100)" />
                <p class="text-xs text-muted-foreground">已使用 {{ Math.round((pkg.usedCalls / pkg.totalCalls) * 100) }}%，剩余 {{ (pkg.totalCalls - pkg.usedCalls).toLocaleString() }} 次</p>
              </div>
              <div class="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <span class="text-sm text-muted-foreground">API 端点：</span>
                <code class="flex-1 text-sm">{{ pkg.apiEndpoint }}</code>
                <Button variant="ghost" size="icon" class="h-6 w-6" @click="copyToClipboard(pkg.apiEndpoint)"><Copy class="h-3 w-3" /></Button>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm">查看文档</Button>
                <Button variant="outline" size="sm">在线调试</Button>
                <Button v-if="pkg.status === 'expiring'" size="sm">立即续费</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- API Keys Tab -->
      <TabsContent value="keys" class="space-y-4">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <div><CardTitle>API 密钥管理</CardTitle><CardDescription>用于 API 接口调用的访问凭证</CardDescription></div>
              <Button><Key class="mr-2 h-4 w-4" />创建密钥</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead><TableHead>AccessKey</TableHead><TableHead>SecretKey</TableHead>
                  <TableHead>创建时间</TableHead><TableHead>状态</TableHead><TableHead class="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="key in apiKeys" :key="key.id">
                  <TableCell class="font-medium">{{ key.name }}</TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <code class="text-sm">{{ key.accessKey }}</code>
                      <Button variant="ghost" size="icon" class="h-6 w-6" @click="copyToClipboard(key.accessKey)"><Copy class="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <code class="text-sm">{{ showSecretKey === key.id ? key.secretKey : '••••••••••••••••••••••••' }}</code>
                      <Button variant="ghost" size="icon" class="h-6 w-6" @click="showSecretKey = showSecretKey === key.id ? null : key.id">
                        <Eye v-if="showSecretKey !== key.id" class="h-3 w-3" />
                        <EyeOff v-else class="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell class="text-muted-foreground">{{ key.createdAt }}</TableCell>
                  <TableCell><Badge variant="outline" class="gap-1"><CheckCircle2 class="h-3 w-3 text-green-500" />正常</Badge></TableCell>
                  <TableCell class="text-right">
                    <Button variant="ghost" size="sm" @click="handleResetKey(key)"><RefreshCw class="mr-1 h-3 w-3" />重置</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Monitor Tab -->
      <TabsContent value="monitor" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">今日调用</CardTitle></CardHeader>
            <CardContent><div class="text-2xl font-bold">6,800</div><div class="flex items-center text-xs text-muted-foreground"><TrendingUp class="mr-1 h-3 w-3 text-green-500" />较昨日 +8%</div></CardContent>
          </Card>
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">本周调用</CardTitle></CardHeader>
            <CardContent><div class="text-2xl font-bold">40,100</div></CardContent>
          </Card>
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">错误率</CardTitle></CardHeader>
            <CardContent><div class="text-2xl font-bold text-yellow-600">0.3%</div></CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>近期 API 调用统计</CardTitle>
              <CardDescription>{{ rangeMap[selectedRange].desc }}</CardDescription>
            </div>
            <Select v-model="selectedRange">
              <SelectTrigger class="w-28">
                <SelectValue placeholder="选择范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7天</SelectItem>
                <SelectItem value="30d">1个月</SelectItem>
                <SelectItem value="90d">3个月</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div ref="chartContainer" class="w-full">
              <canvas ref="chartCanvas" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>错误日志</CardTitle><CardDescription>最近的 API 调用错误</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>时间</TableHead><TableHead>API</TableHead><TableHead>错误</TableHead><TableHead>状态码</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow v-for="log in errorLogs" :key="log.time">
                  <TableCell class="text-muted-foreground">{{ log.time }}</TableCell>
                  <TableCell class="font-mono text-sm">{{ log.api }}</TableCell>
                  <TableCell><div class="flex items-center gap-2"><AlertTriangle class="h-4 w-4 text-yellow-500" />{{ log.error }}</div></TableCell>
                  <TableCell><Badge variant="outline" class="gap-1 text-red-500">{{ log.code }}</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Security Audit Tab -->
      <TabsContent value="security">
        <SecurityAuditContent />
      </TabsContent>
    </Tabs>

    <!-- Reset Key Dialog -->
    <Dialog v-model:open="resetDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>重置 SecretKey</DialogTitle>
          <DialogDescription>此操作不可逆，重置后旧密钥将立即失效</DialogDescription>
        </DialogHeader>
        <div v-if="selectedKey" class="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <p class="text-sm">确定要重置 <span class="font-medium">{{ selectedKey.name }}</span> 的 SecretKey 吗？</p>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="resetDialogOpen = false">取消</Button>
          <Button variant="destructive" @click="resetDialogOpen = false">确认重置</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=193 TIMESTAMP=2025-06-15 12:00:00] -->
