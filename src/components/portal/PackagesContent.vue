<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Tabs from '@/components/ui/Tabs.vue'
import TabsList from '@/components/ui/TabsList.vue'
import TabsTrigger from '@/components/ui/TabsTrigger.vue'
import TabsContent from '@/components/ui/TabsContent.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import { Check, Zap, Building2, Crown, Info, ArrowRight } from 'lucide-vue-next'

const packages = {
  llm: [
    { id: 'gpt4-basic', name: 'GPT-4 基础版', description: '适合小型团队和个人开发者', price: 1999, period: '月', apiCalls: '50,000', features: ['50,000 次/月 API 调用', '标准响应速度', '基础技术支持', 'API 文档访问', '调用统计报表'], tier: 'basic', popular: false },
    { id: 'gpt4-enterprise', name: 'GPT-4 企业版', description: '适合中大型企业日常使用', price: 5999, period: '月', apiCalls: '200,000', features: ['200,000 次/月 API 调用', '优先响应队列', '7x24 技术支持', '专属客户经理', '自定义限流规则', '高级调用分析'], tier: 'enterprise', popular: true },
    { id: 'gpt4-flagship', name: 'GPT-4 旗舰版', description: '适合大规模企业应用场景', price: 19999, period: '月', apiCalls: '1,000,000', features: ['1,000,000 次/月 API 调用', '最高响应优先级', '专属技术团队支持', 'SLA 99.99% 保障', '私有化部署支持', '定制化功能开发', '专属网络通道'], tier: 'flagship', popular: false },
  ],
  embedding: [
    { id: 'embed-basic', name: 'Embedding 基础版', description: '文本向量化基础服务', price: 999, period: '月', apiCalls: '100,000', features: ['100,000 次/月 API 调用', '1536 维向量输出', '批量处理支持', '标准技术支持'], tier: 'basic', popular: false },
    { id: 'embed-enterprise', name: 'Embedding 企业版', description: '企业级向量化服务', price: 2999, period: '月', apiCalls: '500,000', features: ['500,000 次/月 API 调用', '多维度向量支持', '高并发处理', '7x24 技术支持', '向量存储服务'], tier: 'enterprise', popular: true },
  ],
  vision: [
    { id: 'vision-basic', name: '视觉 API 基础版', description: '图像识别与分析服务', price: 1499, period: '月', apiCalls: '30,000', features: ['30,000 次/月 API 调用', '图像分类与识别', 'OCR 文字提取', '标准技术支持'], tier: 'basic', popular: false },
    { id: 'vision-enterprise', name: '视觉 API 企业版', description: '企业级图像处理服务', price: 4999, period: '月', apiCalls: '150,000', features: ['150,000 次/月 API 调用', '高级图像分析', '视频处理支持', '自定义模型训练', '7x24 技术支持'], tier: 'enterprise', popular: true },
  ],
}

const tierConfig: Record<string, { icon: typeof Zap; color: string; bgColor: string; borderColor: string }> = {
  basic: { icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  enterprise: { icon: Building2, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  flagship: { icon: Crown, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
}

const selectedPackage = ref<typeof packages.llm[0] | null>(null)
const dialogOpen = ref(false)

function handlePurchase(pkg: typeof packages.llm[0]) {
  selectedPackage.value = pkg
  dialogOpen.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">MaaS 套餐中心</h2>
      <p class="text-muted-foreground">选择适合您业务需求的 AI 服务套餐</p>
    </div>

    <Tabs default-value="llm" class="space-y-6">
      <TabsList class="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="llm">大语言模型</TabsTrigger>
        <TabsTrigger value="embedding">向量服务</TabsTrigger>
        <TabsTrigger value="vision">视觉服务</TabsTrigger>
      </TabsList>

      <TabsContent v-for="(pkgList, key) in packages" :key="key" :value="key" class="space-y-6">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="pkg in pkgList" :key="pkg.id" class="relative overflow-hidden">
            <CardHeader>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <component :is="tierConfig[pkg.tier].icon" :class="['h-5 w-5', tierConfig[pkg.tier].color]" />
                  <CardTitle class="text-lg">{{ pkg.name }}</CardTitle>
                </div>
                <Badge v-if="pkg.popular" variant="default">推荐</Badge>
              </div>
              <CardDescription>{{ pkg.description }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-bold">¥{{ pkg.price.toLocaleString() }}</span>
                <span class="text-muted-foreground">/{{ pkg.period }}</span>
              </div>
              <ul class="space-y-2">
                <li v-for="feature in pkg.features" :key="feature" class="flex items-center gap-2 text-sm">
                  <Check class="h-4 w-4 text-green-500 shrink-0" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" @click="handlePurchase(pkg)">
                立即订购
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
    </Tabs>

    <!-- Purchase Dialog -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认订购</DialogTitle>
          <DialogDescription>请确认您要订购以下套餐</DialogDescription>
        </DialogHeader>
        <div v-if="selectedPackage" class="space-y-4">
          <div class="flex items-center gap-3 rounded-lg bg-muted p-4">
            <component :is="tierConfig[selectedPackage.tier].icon" :class="['h-6 w-6', tierConfig[selectedPackage.tier].color]" />
            <div>
              <p class="font-medium">{{ selectedPackage.name }}</p>
              <p class="text-sm text-muted-foreground">{{ selectedPackage.apiCalls }} 次/月</p>
            </div>
          </div>
          <div class="flex items-center justify-between rounded-lg border border-border p-4">
            <span class="text-muted-foreground">套餐价格</span>
            <span class="text-lg font-bold">¥{{ selectedPackage.price.toLocaleString() }}/{{ selectedPackage.period }}</span>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
            <Info class="h-4 w-4 text-muted-foreground shrink-0" />
            <p class="text-xs text-muted-foreground">订购后将立即开通服务，费用将计入当月账单。</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="dialogOpen = false">取消</Button>
          <Button @click="dialogOpen = false">确认订购</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=118 TIMESTAMP=2025-06-15 12:00:00] -->
