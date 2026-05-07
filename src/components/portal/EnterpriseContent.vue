<!-- [AI_START TIMESTAMP=2025-07-14 12:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BuildingOffice2Icon, CheckCircleIcon, ShieldCheckIcon, PencilSquareIcon,
  KeyIcon, DocumentTextIcon, ArrowRightIcon,
  LockClosedIcon, BoltIcon, LifebuoyIcon,
  ClockIcon, CpuChipIcon, ChartBarIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()

const enterpriseInfo = {
  name: '中科云数科技有限公司', creditCode: '91110108MA01XXXXXX', legalPerson: '张三',
  contactPerson: '李四', contactPhone: '138****8888', contactEmail: 'admin@zhongkeyunshu.com',
  address: '北京市海淀区中关村科技园区XX号', registeredAt: '2024-01-15', verifiedAt: '2024-01-16', status: 'verified',
}

const editDialogOpen = ref(false)
const verifyDialogOpen = ref(false)

function goVerifyKey() {
  verifyDialogOpen.value = false
  router.push('/enterprise/verify-key')
}

function goVerifyUpload() {
  verifyDialogOpen.value = false
  router.push('/enterprise/verify-upload')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">企业信息管理</h2>
      <p class="text-muted-foreground">查看和管理企业认证信息</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Basic Info -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><BuildingOffice2Icon class="h-5 w-5 text-primary" /></div>
              <div><CardTitle>企业基本信息</CardTitle><CardDescription>工商注册信息</CardDescription></div>
            </div>
            <Badge variant="outline" class="gap-1"><CheckCircleIcon class="h-3 w-3 text-green-500" />已认证</Badge>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4">
            <div class="space-y-1"><Label class="text-muted-foreground">企业名称</Label><p class="font-medium">{{ enterpriseInfo.name }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">统一社会信用代码</Label><p class="font-mono">{{ enterpriseInfo.creditCode }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">法定代表人</Label><p>{{ enterpriseInfo.legalPerson }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">企业地址</Label><p>{{ enterpriseInfo.address }}</p></div>
          </div>
          <Separator />
          <div class="flex items-center justify-between text-sm text-muted-foreground">
            <span>注册时间：{{ enterpriseInfo.registeredAt }}</span>
            <span>认证时间：{{ enterpriseInfo.verifiedAt }}</span>
          </div>
        </CardContent>
      </Card>

      <!-- Contact Info -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div><CardTitle>联系人信息</CardTitle><CardDescription>企业管理员联系方式</CardDescription></div>
            <Button variant="outline" size="sm" @click="editDialogOpen = true"><PencilSquareIcon class="mr-1 h-3 w-3" />修改</Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4">
            <div class="space-y-1"><Label class="text-muted-foreground">联系人</Label><p class="font-medium">{{ enterpriseInfo.contactPerson }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">联系电话</Label><p>{{ enterpriseInfo.contactPhone }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">联系邮箱</Label><p>{{ enterpriseInfo.contactEmail }}</p></div>
          </div>
        </CardContent>
      </Card>

      <!-- Enterprise Qualification -->
      <Card class="lg:col-span-2">
        <CardHeader class="pb-4">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100"><ShieldCheckIcon class="h-5 w-5 text-indigo-600" /></div>
              <div class="min-w-0"><CardTitle>企业资质</CardTitle><CardDescription class="truncate">为了保障平台安全与合规，请尽快完成企业资质验证。验证通过后，您的企业将解锁全部 MaaS 平台服务。</CardDescription></div>
            </div>
            <Button size="lg" class="gap-2 shrink-0" @click="verifyDialogOpen = true">
              <ShieldCheckIcon class="h-5 w-5" />
              验证企业资质
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid gap-8 lg:grid-cols-5">
            <!-- Left: Verification Steps (3/5) -->
            <div class="lg:col-span-3 space-y-5">

              <div class="flex-1 space-y-5 p-5 flex-1 space-y-4">
                <div class="flex items-center gap-2">
                  <div class="h-px flex-1 bg-border" />
                  <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">验证流程</span>
                  <div class="h-px flex-1 bg-border" />
                </div>

                <!-- Horizontal Steps -->
                <div class="flex items-start">
                  <!-- Step 1 -->
                  <div class="flex-1 flex flex-col items-center text-center rounded-lg bg-muted/60 p-5">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">1</div>
                    <p class="mt-3 text-sm font-semibold text-foreground">选择验证方式</p>
                    <p class="mt-1 text-xs text-muted-foreground leading-relaxed">在线绑定中信网银 Key，或提交营业执照、法人身份证等资质材料</p>
                  </div>

                  <!-- Arrow -->
                  <div class="w-[10%] shrink-0 flex items-center justify-center pt-8">
                    <div class="hidden sm:flex items-center w-full px-1">
                      <div class="h-1 flex-1 rounded-full bg-indigo-300" />
                      <div class="h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-indigo-400" />
                    </div>
                  </div>

                  <!-- Step 2 -->
                  <div class="flex-1 flex flex-col items-center text-center rounded-lg bg-muted/60 p-5">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">2</div>
                    <p class="mt-3 text-sm font-semibold text-foreground">完成验证操作</p>
                    <p class="mt-1 text-xs text-muted-foreground leading-relaxed">安装插件并插入U盾自动匹配信息，或按指引上传所需资质文件</p>
                  </div>

                  <!-- Arrow -->
                  <div class="w-[10%] shrink-0 flex items-center justify-center pt-8">
                    <div class="hidden sm:flex items-center w-full px-1">
                      <div class="h-1 flex-1 rounded-full bg-indigo-300" />
                      <div class="h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-indigo-400" />
                    </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="flex-1 flex flex-col items-center text-center rounded-lg bg-muted/60 p-5">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">3</div>
                    <p class="mt-3 text-sm font-semibold text-foreground">审核通过，开通服务</p>
                    <p class="mt-1 text-xs text-muted-foreground leading-relaxed">在线 Key 验证即时生效；材料提交后预计 <span class="font-medium text-foreground">3 个工作日</span> 内完成审核</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Unlockable Services + CTA (2/5) -->
            <div class="lg:col-span-2 flex flex-col">
              <div class="rounded-lg bg-muted/40 p-5 flex-1 space-y-4">
                <div class="flex items-center gap-2">
                  <div class="h-px flex-1 bg-border" />
                  <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">验证后可开通</span>
                  <div class="h-px flex-1 bg-border" />
                </div>

                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100 mt-px">
                      <BoltIcon class="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-foreground">MaaS API 服务</p>
                      <p class="text-xs text-muted-foreground">大语言模型、视觉模型等全部 API 调用能力</p>
                    </div>
                  </li>
                 
                  <li class="flex items-start gap-3">
                    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 mt-px">
                      <LockClosedIcon class="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-foreground">企业级安全策略</p>
                      <p class="text-xs text-muted-foreground">独立租户隔离、访问控制、审计日志等安全配置</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-100 mt-px">
                      <LifebuoyIcon class="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-foreground">专属技术支持</p>
                      <p class="text-xs text-muted-foreground">7×24 小时技术支持与专属客户经理服务</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-100 mt-px">
                      <ChartBarIcon class="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-foreground">完整数据看板</p>
                      <p class="text-xs text-muted-foreground">实时调用统计、用量分析与消费报表</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Edit Dialog -->
    <Dialog v-model:open="editDialogOpen">
      <DialogContent>
        <DialogHeader><DialogTitle>修改联系人信息</DialogTitle><DialogDescription>更新企业管理员联系方式</DialogDescription></DialogHeader>
        <div class="space-y-4">
          <div class="space-y-2"><Label for="contactPerson">联系人</Label><Input id="contactPerson" :default-value="enterpriseInfo.contactPerson" /></div>
          <div class="space-y-2"><Label for="contactPhone">联系电话</Label><Input id="contactPhone" :default-value="enterpriseInfo.contactPhone" /></div>
          <div class="space-y-2"><Label for="contactEmail">联系邮箱</Label><Input id="contactEmail" type="email" :default-value="enterpriseInfo.contactEmail" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="editDialogOpen = false">取消</Button>
          <Button @click="editDialogOpen = false">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Verification Method Choice Dialog -->
    <Dialog v-model:open="verifyDialogOpen">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader class="text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
            <ShieldCheckIcon class="h-8 w-8 text-indigo-600" />
          </div>
          <DialogTitle class="text-xl">选择企业资质验证方式</DialogTitle>
          <DialogDescription>
            请选择适合您企业的方式进行资质验证
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-2">
          <!-- Option A: Online UKey Binding -->
          <button
            @click="goVerifyKey"
            class="flex items-start gap-4 rounded-lg border border-border p-5 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
              <KeyIcon class="h-6 w-6 text-indigo-600" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">方式 A</span>
                <p class="font-semibold text-foreground">在线绑定中信网银 Key</p>
              </div>
              <p class="mt-1 text-sm text-muted-foreground">安装浏览器插件，插入U盾，系统自动匹配企业信息，即时完成验证</p>
              <div class="mt-2 flex items-center gap-2 text-xs text-indigo-600">
                <BoltIcon class="h-3 w-3" />
                <span>即时生效，无需等待</span>
              </div>
            </div>
            <ArrowRightIcon class="h-5 w-5 shrink-0 text-muted-foreground self-center" />
          </button>

          <!-- Option B: Document Upload -->
          <button
            @click="goVerifyUpload"
            class="flex items-start gap-4 rounded-lg border border-border p-5 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
              <DocumentTextIcon class="h-6 w-6 text-emerald-600" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">方式 B</span>
                <p class="font-semibold text-foreground">提交信息验证企业资质</p>
              </div>
              <p class="mt-1 text-sm text-muted-foreground">上传营业执照、法人身份证及其他资质材料，后台审核通过后完成验证</p>
              <div class="mt-2 flex items-center gap-2 text-xs text-emerald-600">
                <ClockIcon class="h-3 w-3" />
                <span>预计 3 个工作日完成审核</span>
              </div>
            </div>
            <ArrowRightIcon class="h-5 w-5 shrink-0 text-muted-foreground self-center" />
          </button>
        </div>

        <DialogFooter>
          <Button variant="outline" class="w-full sm:w-auto" @click="verifyDialogOpen = false">
            稍后再说
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=173 TIMESTAMP=2025-07-14 12:00:00] -->
