<!-- [AI_START TIMESTAMP=2025-07-14 12:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  DocumentTextIcon, ArrowLeftIcon, ArrowUpTrayIcon,
  ShieldCheckIcon, CheckCircleIcon, LockClosedIcon,
  ClockIcon, BuildingOffice2Icon, UserIcon,
  DocumentCheckIcon, XCircleIcon, EyeIcon,
  InformationCircleIcon, ExclamationTriangleIcon,
  CheckIcon, ArrowRightIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()

// Upload file state
interface UploadFile {
  id: string
  name: string
  label: string
  description: string
  required: boolean
  file: File | null
  uploaded: boolean
}

const uploadFiles = ref<UploadFile[]>([
  {
    id: 'business_license',
    name: 'business_license',
    label: '营业执照',
    description: '企业法人营业执照正本或副本，需在有效期内',
    required: true,
    file: null,
    uploaded: false,
  },
  {
    id: 'legal_person_id',
    name: 'legal_person_id',
    label: '法定代表人身份证',
    description: '法定代表人身份证正反面，信息清晰可见',
    required: true,
    file: null,
    uploaded: false,
  },
  {
    id: 'other_cert',
    name: 'other_cert',
    label: '其他资质文件',
    description: '高新技术企业证书、行业许可证等（可选）',
    required: false,
    file: null,
    uploaded: false,
  },
])

const submitted = ref(false)
const submitting = ref(false)
const agreeTerms = ref(false)

const canSubmit = computed(() => {
  const requiredUploaded = uploadFiles.value
    .filter(f => f.required)
    .every(f => f.uploaded)
  return requiredUploaded && agreeTerms.value
})

function handleFileSelect(event: Event, fileItem: UploadFile) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    fileItem.file = input.files[0]
    fileItem.uploaded = true
  }
}

function removeFile(fileItem: UploadFile) {
  fileItem.file = null
  fileItem.uploaded = false
}

function goBack() {
  if (submitted.value) {
    submitted.value = false
    return
  }
  router.push('/enterprise')
}

function submitVerification() {
  if (!canSubmit.value) return

  submitting.value = true
  // Simulate submission
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 1500)
}

function finishAndReturn() {
  router.push('/enterprise')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Button variant="outline" size="sm" @click="goBack">
        <ArrowLeftIcon class="mr-1 h-4 w-4" />返回
      </Button>
      <div>
        <h2 class="text-2xl font-semibold text-foreground">提交信息验证企业资质</h2>
        <p class="text-muted-foreground">上传企业资质材料，等待后台审核</p>
      </div>
    </div>

    <!-- Before Submission -->
    <div v-if="!submitted" class="grid gap-6 lg:grid-cols-3">
      <!-- Left: Instructions -->
      <Card class="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle>提交说明</CardTitle>
          <CardDescription>请仔细阅读后上传材料</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-start gap-2">
            <InformationCircleIcon class="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
            <p class="text-sm text-muted-foreground">
              请确保上传的资质文件真实有效，信息清晰完整。虚假材料将导致审核不通过。
            </p>
          </div>
          <div class="flex items-start gap-2">
            <LockClosedIcon class="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
            <p class="text-sm text-muted-foreground">
              所有上传的文件均通过加密通道传输，仅用于企业资质审核，审核完成后将安全存档。
            </p>
          </div>
          <div class="flex items-start gap-2">
            <ClockIcon class="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <p class="text-sm text-muted-foreground">
              审核周期预计为 <span class="font-medium text-foreground">3 个工作日</span>，审核结果将通过短信和邮件通知。
            </p>
          </div>

          <Separator />

          <div class="space-y-2">
            <p class="text-sm font-semibold">支持的文件格式</p>
            <div class="flex flex-wrap gap-1.5">
              <span class="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs">PDF</span>
              <span class="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs">JPG</span>
              <span class="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs">PNG</span>
              <span class="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs">GIF</span>
            </div>
            <p class="text-xs text-muted-foreground">单个文件不超过 10 MB</p>
          </div>

          <!-- Security badges -->
          <div class="rounded-lg bg-muted/50 p-3 space-y-2">
            <p class="text-xs font-semibold text-foreground">安全保障</p>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheckIcon class="h-3 w-3 text-emerald-500" />
              <span>TLS 1.3 加密传输</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <LockClosedIcon class="h-3 w-3 text-emerald-500" />
              <span>等保三级合规存储</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <DocumentCheckIcon class="h-3 w-3 text-emerald-500" />
              <span>审核后 90 天自动清除</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Right: Upload Forms -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>上传资质文件</CardTitle>
          <CardDescription>
            带 <span class="text-red-500">*</span> 的为必填项
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Upload items -->
          <div
            v-for="fileItem in uploadFiles"
            :key="fileItem.id"
            class="rounded-lg border border-border p-4 space-y-3"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <div
                  :class="[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    fileItem.id === 'business_license' ? 'bg-blue-100' :
                    fileItem.id === 'legal_person_id' ? 'bg-purple-100' : 'bg-muted',
                  ]"
                >
                  <BuildingOffice2Icon v-if="fileItem.id === 'business_license'" class="h-5 w-5 text-blue-600" />
                  <UserIcon v-else-if="fileItem.id === 'legal_person_id'" class="h-5 w-5 text-purple-600" />
                  <DocumentTextIcon v-else class="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div class="flex items-center gap-1">
                    <p class="font-medium">{{ fileItem.label }}</p>
                    <span v-if="fileItem.required" class="text-red-500 text-sm">*</span>
                    <span v-else class="text-xs text-muted-foreground">（可选）</span>
                  </div>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ fileItem.description }}</p>
                </div>
              </div>
            </div>

            <!-- File uploaded state -->
            <div v-if="fileItem.uploaded && fileItem.file" class="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <div class="flex items-center gap-3">
                <CheckCircleIcon class="h-5 w-5 text-emerald-500" />
                <div>
                  <p class="text-sm font-medium text-emerald-800">{{ fileItem.file.name }}</p>
                  <p class="text-xs text-emerald-600">{{ (fileItem.file.size / 1024).toFixed(1) }} KB</p>
                </div>
              </div>
              <button @click="removeFile(fileItem)" class="text-muted-foreground hover:text-red-500 transition-colors">
                <XCircleIcon class="h-5 w-5" />
              </button>
            </div>

            <!-- Upload button -->
            <div v-else>
              <label
                :for="`file-upload-${fileItem.id}`"
                class="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 cursor-pointer transition-colors hover:border-indigo-300 hover:bg-indigo-50/30"
              >
                <ArrowUpTrayIcon class="h-6 w-6 text-muted-foreground" />
                <span class="text-sm text-muted-foreground">点击上传或拖拽文件到此处</span>
                <span class="text-xs text-muted-foreground">支持 PDF、JPG、PNG 格式，不超过 10 MB</span>
                <input
                  :id="`file-upload-${fileItem.id}`"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.gif"
                  class="hidden"
                  @change="handleFileSelect($event, fileItem)"
                />
              </label>
            </div>
          </div>

          <!-- Terms agreement -->
          <div class="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
            <input
              id="agree-terms"
              v-model="agreeTerms"
              type="checkbox"
              class="mt-0.5 h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            <label for="agree-terms" class="text-sm text-muted-foreground">
              我确认以上提交的资质材料真实、有效、合法，并同意平台将其用于企业资质审核目的。如因材料不实导致的任何后果由本企业自行承担。
            </label>
          </div>

          <!-- Submit -->
          <div class="flex justify-center">
            <Button
              size="lg"
              class="gap-2 px-10"
              :disabled="!canSubmit || submitting"
              @click="submitVerification"
            >
              <ArrowPathIcon v-if="submitting" class="h-5 w-5 animate-spin" />
              <ShieldCheckIcon v-else class="h-5 w-5" />
              {{ submitting ? '提交中…' : '提交验证' }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- After Submission: Success State -->
    <div v-else class="grid gap-6 lg:grid-cols-3">
      <Card class="lg:col-span-3">
        <CardContent class="pt-6">
          <div class="flex flex-col items-center gap-4 py-8 text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckBadgeIcon class="h-10 w-10 text-emerald-500" />
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-foreground">资质材料已提交成功！</h3>
              <p class="mt-2 text-muted-foreground max-w-md mx-auto">
                您的企业资质材料已通过安全通道上传，平台将在 <span class="font-semibold text-foreground">3 个工作日</span> 内完成审核，审核结果将通过短信和邮件通知您。
              </p>
            </div>

            <!-- Submission info -->
            <div class="rounded-lg bg-muted/50 border border-border p-5 w-full max-w-lg space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">提交时间</span>
                <span class="font-medium">{{ new Date().toLocaleString('zh-CN') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">审核状态</span>
                <span class="inline-flex items-center gap-1 font-medium text-amber-700">
                  <ClockIcon class="h-3.5 w-3.5" />审核中
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">预计完成时间</span>
                <span class="font-medium">{{ new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">已上传文件</span>
                <span class="font-medium">{{ uploadFiles.filter(f => f.uploaded).length }} 个</span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <InformationCircleIcon class="h-4 w-4" />
              <span>如有疑问请联系客服：400-XXX-XXXX</span>
            </div>

            <Button @click="finishAndReturn" size="lg" class="gap-2 px-8 mt-2">
              <CheckCircleIcon class="h-5 w-5" />返回企业信息
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
<!-- [AI_END LINES=252 TIMESTAMP=2025-07-14 12:00:00] -->
