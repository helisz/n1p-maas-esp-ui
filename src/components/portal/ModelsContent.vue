<!-- [AI_START TIMESTAMP=2025-06-16 08:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import {
  MagnifyingGlassIcon, CpuChipIcon, EyeIcon, ArrowTopRightOnSquareIcon, RectangleStackIcon, HashtagIcon,
  CurrencyDollarIcon, SparklesIcon, GlobeAltIcon, BoltIcon,
} from '@heroicons/vue/24/outline'

interface TierPricing {
  prompt: number
  completion: number
}

interface ModelPricing {
  basic: TierPricing
  advanced: TierPricing
  premium: TierPricing
}

interface Model {
  id: string
  name: string
  provider: string
  description: string
  tags: string[]
  contextLength: number
  maxOutput: number
  pricing: ModelPricing
  capabilities: string[]
  modality: string
}

const models: Model[] = [
  {
    id: 'doubao-seed-2-0-pro',
    name: 'Doubao-Seed-2.0-pro',
    provider: '火山引擎',
    description: '火山引擎 Doubao 系列旗舰模型，具备强大的推理能力和多模态理解能力，适用于复杂任务场景。',
    tags: ['旗舰', '推荐'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 2.0, completion: 8.0 },
      advanced: { prompt: 1.8, completion: 7.2 },
      premium: { prompt: 1.6, completion: 6.4 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'doubao-seed-2-0-lite',
    name: 'Doubao-Seed-2.0-lite',
    provider: '火山引擎',
    description: '火山引擎 Doubao 轻量级模型，性价比高，适合高频调用和成本敏感型应用场景。',
    tags: ['高性价比', '轻量'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.15, completion: 0.6 },
      advanced: { prompt: 0.135, completion: 0.54 },
      premium: { prompt: 0.12, completion: 0.48 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'doubao-1-5-pro-32k',
    name: 'Doubao-1.5-pro-32k',
    provider: '火山引擎',
    description: '火山引擎 Doubao 1.5 专业版，32K 上下文窗口，在专业领域任务中表现稳定可靠。',
    tags: ['专业', '稳定'],
    contextLength: 32000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 1.0, completion: 4.0 },
      advanced: { prompt: 0.9, completion: 3.6 },
      premium: { prompt: 0.8, completion: 3.2 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'doubao-1-5-lite-32k',
    name: 'Doubao-1.5-lite-32k',
    provider: '火山引擎',
    description: '火山引擎 Doubao 1.5 轻量版，32K 上下文窗口，兼顾性能与成本，适合日常对话和简单任务。',
    tags: ['轻量', '高性价比'],
    contextLength: 32000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.1, completion: 0.4 },
      advanced: { prompt: 0.09, completion: 0.36 },
      premium: { prompt: 0.08, completion: 0.32 },
    },
    capabilities: ['Text Generation', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'deepseek-r1-volc',
    name: 'DeepSeek-R1',
    provider: '火山引擎',
    description: '火山引擎部署的 DeepSeek R1 深度推理模型，在复杂逻辑推理、数学证明和代码调试方面展现出强大的思维能力。',
    tags: ['深度推理', '推荐'],
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.5, completion: 2.0 },
      advanced: { prompt: 0.45, completion: 1.8 },
      premium: { prompt: 0.4, completion: 1.6 },
    },
    capabilities: ['Text Generation', 'Reasoning', 'Code Generation', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'deepseek-v3-volc',
    name: 'DeepSeek-V3',
    provider: '火山引擎',
    description: '火山引擎部署的 DeepSeek V3 通用模型，在数学推理和代码生成方面表现优异，性价比极高。',
    tags: ['高性价比', '代码'],
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.1, completion: 0.5 },
      advanced: { prompt: 0.09, completion: 0.45 },
      premium: { prompt: 0.08, completion: 0.4 },
    },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'deepseek-r1-huawei',
    name: 'DeepSeek-R1',
    provider: '华为云',
    description: '华为云部署的 DeepSeek R1 深度推理模型，在复杂逻辑推理、数学证明和代码调试方面展现出强大的思维能力。',
    tags: ['深度推理', '推荐'],
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.5, completion: 2.0 },
      advanced: { prompt: 0.45, completion: 1.8 },
      premium: { prompt: 0.4, completion: 1.6 },
    },
    capabilities: ['Text Generation', 'Reasoning', 'Code Generation', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'deepseek-v3-2-huawei',
    name: 'DeepSeek-V3.2',
    provider: '华为云',
    description: '华为云部署的 DeepSeek V3.2 升级版模型，在推理能力和代码生成方面进一步提升，性能更强劲。',
    tags: ['升级版', '代码'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.5, completion: 2.0 },
      advanced: { prompt: 0.45, completion: 1.8 },
      premium: { prompt: 0.4, completion: 1.6 },
    },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek-V4-Flash',
    provider: '华为云',
    description: '华为云部署的 DeepSeek V4 Flash 快速推理模型，延迟极低，适合高吞吐量实时应用场景。',
    tags: ['极速', '高吞吐'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.3, completion: 1.2 },
      advanced: { prompt: 0.27, completion: 1.08 },
      premium: { prompt: 0.24, completion: 0.96 },
    },
    capabilities: ['Text Generation', 'Code Generation', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'qwen3-235b-a22b',
    name: 'Qwen3-235B-A22B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen3 系列 MoE 架构模型，235B 参数（22B 激活），兼顾性能与效率。',
    tags: ['MoE', '高效'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 1.5, completion: 4.0 },
      advanced: { prompt: 1.35, completion: 3.6 },
      premium: { prompt: 1.2, completion: 3.2 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'qwen3-32b',
    name: 'Qwen3-32B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen3 系列 32B 参数模型，在中文理解和生成方面表现优异。',
    tags: ['中文强', '均衡'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.5, completion: 1.5 },
      advanced: { prompt: 0.45, completion: 1.35 },
      premium: { prompt: 0.4, completion: 1.2 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'glm-5',
    name: 'GLM-5',
    provider: '华为云',
    description: '华为云部署的智谱 GLM-5 系列模型，在中文理解和生成方面表现卓越，支持多种复杂任务。',
    tags: ['中文强', '推荐'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 1.0, completion: 3.0 },
      advanced: { prompt: 0.9, completion: 2.7 },
      premium: { prompt: 0.8, completion: 2.4 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'kimi-k2-6',
    name: 'Kimi-K2.6',
    provider: '华为云',
    description: '华为云部署的月之暗面 Kimi K2.6 模型，支持超长上下文，在中文长文档处理和理解方面极具优势。',
    tags: ['超长上下文', '中文'],
    contextLength: 256000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.5, completion: 2.0 },
      advanced: { prompt: 0.45, completion: 1.8 },
      premium: { prompt: 0.4, completion: 1.6 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'qwen2-5-72b-huawei',
    name: 'Qwen2.5-72B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen2.5 系列 72B 参数模型，中文理解和生成能力顶尖，支持长文本处理。',
    tags: ['中文强', '长文本'],
    contextLength: 128000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.5, completion: 1.0 },
      advanced: { prompt: 0.45, completion: 0.9 },
      premium: { prompt: 0.4, completion: 0.8 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'glm-5-1',
    name: 'GLM-5.1',
    provider: '华为云',
    description: '华为云部署的智谱 GLM-5.1 升级版模型，在 GLM-5 基础上进一步优化推理能力和响应质量。',
    tags: ['升级版', '推荐'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 1.2, completion: 3.5 },
      advanced: { prompt: 1.08, completion: 3.15 },
      premium: { prompt: 0.96, completion: 2.8 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'qwen3-coder-480b',
    name: 'Qwen3-Coder-480B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen3 Coder 系列 480B 参数模型，专为代码生成和编程任务优化，代码能力业界领先。',
    tags: ['代码', '旗舰'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 2.0, completion: 6.0 },
      advanced: { prompt: 1.8, completion: 5.4 },
      premium: { prompt: 1.6, completion: 4.8 },
    },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
]

const providers = computed(() => {
  const set = new Set(models.map(m => m.provider))
  return Array.from(set)
})

const searchQuery = ref('')
const selectedProvider = ref<string>('全部')
const selectedTier = ref<'basic' | 'advanced' | 'premium'>('basic')
const selectedModel = ref<Model | null>(null)
const detailOpen = ref(false)

const tierLabels: Record<string, string> = {
  basic: '基础版',
  advanced: '高级版',
  premium: '尊享版',
}

const tierBadgeClasses: Record<string, string> = {
  basic: 'bg-slate-100 text-slate-700',
  advanced: 'bg-indigo-100 text-indigo-700',
  premium: 'bg-amber-100 text-amber-700',
}

const filteredModels = computed(() => {
  let result = models
  if (selectedProvider.value !== '全部') {
    result = result.filter(m => m.provider === selectedProvider.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  return result
})

function openDetail(model: Model) {
  selectedModel.value = model
  detailOpen.value = true
}

function formatPrice(price: number) {
  return `$${price.toFixed(4)}`
}

function formatContext(len: number) {
  if (len >= 10000) return `${(len / 1000).toFixed(0)}K`
  return `${len}`
}

function discountRate(basic: number, tier: number) {
  return Math.round((tier / basic) * 100)
}

const providerColors: Record<string, string> = {
  '火山引擎': 'bg-red-100 text-red-700',
  '华为云': 'bg-blue-100 text-blue-700',
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-foreground">模型广场</h2>
      <p class="text-muted-foreground">浏览和比较平台接入的各类大语言模型，查看详细规格与分级定价信息</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div class="relative w-full lg:w-80">
        <MagnifyingGlassIcon class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input v-model="searchQuery" placeholder="搜索模型名称、提供商或标签..." class="h-10 pl-9 text-sm" />
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs text-muted-foreground">查看价格：</span>
        <button
          v-for="tier in ['basic', 'advanced', 'premium'] as const"
          :key="tier"
          @click="selectedTier = tier"
          :class="[
            'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
            selectedTier === tier ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          {{ tierLabels[tier] }}
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs text-muted-foreground">引擎提供方：</span>
        <button
          @click="selectedProvider = '全部'"
          :class="[
            'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
            selectedProvider === '全部' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          全部
        </button>
        <button
          v-for="p in providers"
          :key="p"
          @click="selectedProvider = p"
          :class="[
            'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
            selectedProvider === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Model Cards -->
    <div>
      <div class="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <CpuChipIcon class="h-5 w-5 text-primary" />
        模型列表
        <span class="text-sm font-normal text-muted-foreground">（共 {{ filteredModels.length }} 个）</span>
        <span :class="['ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', tierBadgeClasses[selectedTier]]">
          {{ tierLabels[selectedTier] }}价格
        </span>
      </div>
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          v-for="model in filteredModels"
          :key="model.id"
          class="flex cursor-pointer flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          @click="openDetail(model)"
        >
          <CardHeader class="pb-3 pt-5">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CpuChipIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <CardTitle class="text-base">{{ model.name }}</CardTitle>
                    <span v-if="model.tags.includes('推荐')" class="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                      <SparklesIcon class="mr-0.5 h-3 w-3" />推荐
                    </span>
                  </div>
                  <CardDescription class="mt-0.5 text-xs">
                    {{ model.modality }} · {{ formatContext(model.contextLength) }}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex flex-1 flex-col gap-4 pb-5">
            <div class="flex flex-wrap gap-1.5">
              <span :class="['inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium', providerColors[model.provider] || 'bg-muted text-muted-foreground']">
                {{ model.provider }}
              </span>
              <Badge v-for="tag in model.tags.filter(t => t !== '推荐')" :key="tag" variant="secondary" class="text-[10px]">
                {{ tag }}
              </Badge>
            </div>
            <p class="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {{ model.description }}
            </p>
            <div class="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
              <div>
                <div class="text-[10px] text-muted-foreground">Prompt / 1M</div>
                <div class="mt-0.5 font-mono text-sm font-semibold text-foreground">{{ formatPrice(model.pricing[selectedTier].prompt) }}</div>
              </div>
              <div>
                <div class="text-[10px] text-muted-foreground">Completion / 1M</div>
                <div class="mt-0.5 font-mono text-sm font-semibold text-foreground">{{ formatPrice(model.pricing[selectedTier].completion) }}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">上下文 {{ model.contextLength.toLocaleString() }} Tokens</span>
              <Button variant="ghost" size="sm" class="h-7 gap-1 text-xs" @click.stop="openDetail(model)">
                <EyeIcon class="h-3.5 w-3.5" />
                详情
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div v-if="filteredModels.length === 0" class="py-16 text-center text-muted-foreground">
        未找到匹配的模型
      </div>
    </div>

    <!-- Price Legend -->
    <div class="rounded-lg border border-border bg-muted/30 p-5">
      <div class="flex items-center gap-2 text-sm font-medium text-foreground">
        <CurrencyDollarIcon class="h-4 w-4" />
        计费说明
      </div>
      <p class="mt-2 text-xs leading-relaxed text-muted-foreground">
        价格单位：每百万 Tokens（1M Tokens）。基础版按标准价计费，高级版享约 9 折优惠，尊享版享约 8 折优惠。实际费用按调用量实时结算。
      </p>
    </div>

    <!-- Detail Dialog -->
    <Dialog v-model:open="detailOpen">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CpuChipIcon class="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle class="text-xl">{{ selectedModel?.name }}</DialogTitle>
              <DialogDescription class="flex items-center gap-2">
                <span :class="['inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', selectedModel ? (providerColors[selectedModel.provider] || 'bg-muted text-muted-foreground') : '']">
                  {{ selectedModel?.provider }}
                </span>
                <span class="text-xs text-muted-foreground">{{ selectedModel?.modality }}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div v-if="selectedModel" class="space-y-6 py-2">
          <!-- Description -->
          <p class="text-sm leading-relaxed text-foreground">{{ selectedModel.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <Badge v-for="tag in selectedModel.tags" :key="tag" variant="outline">{{ tag }}</Badge>
          </div>

          <!-- Specs Grid -->
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div class="rounded-lg border border-border bg-muted/30 p-3">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <RectangleStackIcon class="h-3.5 w-3.5" />
                上下文长度
              </div>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ selectedModel.contextLength.toLocaleString() }} Tokens</p>
            </div>
            <div class="rounded-lg border border-border bg-muted/30 p-3">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HashtagIcon class="h-3.5 w-3.5" />
                最大输出
              </div>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ selectedModel.maxOutput.toLocaleString() }} Tokens</p>
            </div>
            <div class="rounded-lg border border-border bg-muted/30 p-3">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <GlobeAltIcon class="h-3.5 w-3.5" />
                模态
              </div>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ selectedModel.modality }}</p>
            </div>
          </div>

          <!-- Tiered Pricing -->
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">分级定价（每 1M Tokens）</h4>
            <div class="grid grid-cols-3 gap-3">
              <div class="rounded-lg border border-border p-3">
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">基础版</div>
                  <Badge variant="secondary" class="text-[10px]">标准价</Badge>
                </div>
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Prompt</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.basic.prompt) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Completion</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.basic.completion) }}</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-border p-3">
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">高级版</div>
                  <Badge variant="secondary" class="text-[10px]">约 {{ discountRate(selectedModel.pricing.basic.prompt, selectedModel.pricing.advanced.prompt) }}%</Badge>
                </div>
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Prompt</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.advanced.prompt) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Completion</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.advanced.completion) }}</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-border p-3">
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">尊享版</div>
                  <Badge variant="secondary" class="text-[10px]">约 {{ discountRate(selectedModel.pricing.basic.prompt, selectedModel.pricing.premium.prompt) }}%</Badge>
                </div>
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Prompt</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.premium.prompt) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Completion</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.premium.completion) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Capabilities -->
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">能力支持</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="cap in selectedModel.capabilities"
                :key="cap"
                class="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                <BoltIcon class="h-3 w-3" />
                {{ cap }}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter class="gap-2 sm:gap-0">
          <Button variant="outline" @click="detailOpen = false">关闭</Button>
          <Button class="gap-1">
            <ArrowTopRightOnSquareIcon class="h-4 w-4" />
            查看文档
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=370 TIMESTAMP=2025-06-16 08:00:00] -->
