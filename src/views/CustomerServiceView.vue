// [AI_START TIMESTAMP=2025-06-19 08:30:00]
<script setup lang="ts">
import PortalLayout from "@/components/portal/PortalLayout.vue";
import ContactForm from "@/components/portal/ContactForm.vue";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-bold text-foreground">客户服务与支持</h1>
        <p class="text-muted-foreground mt-1">
          如有任何疑问，欢迎通过以下方式与我们联络
        </p>
      </div>

      <!-- Contact Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="rounded-xl border border-border bg-white p-5 text-center hover:shadow-md transition-all duration-300"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 mx-auto mb-3"
          >
            <PhoneIcon class="h-5 w-5 text-orange-500" />
          </div>
          <h3 class="text-sm font-semibold text-foreground mb-1">服务热线</h3>
          <p class="text-sm text-muted-foreground">400-XXXX-XXXX</p>
          <p class="text-xs text-muted-foreground mt-1">工作日 9:00-18:00</p>
        </div>
        <div
          class="rounded-xl border border-border bg-white p-5 text-center hover:shadow-md transition-all duration-300"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 mx-auto mb-3"
          >
            <EnvelopeIcon class="h-5 w-5 text-green-600" />
          </div>
          <h3 class="text-sm font-semibold text-foreground mb-1">电子邮箱</h3>
          <p class="text-sm text-muted-foreground">support@maas-portal.com</p>
          <p class="text-xs text-muted-foreground mt-1">7×24 小时接收</p>
        </div>
        <div
          class="rounded-xl border border-border bg-white p-5 text-center hover:shadow-md transition-all duration-300"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mx-auto mb-3"
          >
            <MapPinIcon class="h-5 w-5 text-blue-700" />
          </div>
          <h3 class="text-sm font-semibold text-foreground mb-1">公司地址</h3>
          <p class="text-sm text-muted-foreground">香港特别行政区</p>
          <p class="text-xs text-muted-foreground mt-1">中信国际电讯</p>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="rounded-xl border border-border bg-white p-6">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-foreground">查询及联络我们</h2>
          <p class="text-sm text-muted-foreground mt-1">
            填写以下信息，我们的客户服务团队会尽快与您联络
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  </PortalLayout>
</template>
// [AI_END LINES=89 TIMESTAMP=2025-06-19 08:30:00]
