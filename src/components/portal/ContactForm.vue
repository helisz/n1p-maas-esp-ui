// [AI_START TIMESTAMP=2025-06-19 08:00:00]
<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const firstName = ref("");
const lastName = ref("");
const company = ref("");
const position = ref("");
const phone = ref("");
const email = ref("");
const message = ref("");
const privacyAgreed = ref(false);
const marketingAgreed = ref(false);

const errors = ref<Record<string, string | undefined>>({});
const submitting = ref(false);
const submitted = ref(false);

function validate(): boolean {
  const errs: Record<string, string> = {};
  if (!firstName.value.trim()) errs.firstName = "请输入名";
  if (!lastName.value.trim()) errs.lastName = "请输入姓";
  if (!phone.value.trim()) errs.phone = "请输入手机号码";
  if (!email.value.trim()) errs.email = "请输入 Email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
    errs.email = "Email 格式不正确";
  if (!privacyAgreed.value)
    errs.privacyAgreed = "请阅读并同意个人资料（私隐）政策声明";
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;
  submitting.value = true;
  // Simulate API call
  await new Promise((r) => setTimeout(r, 1200));
  submitting.value = false;
  submitted.value = true;
}

function reset() {
  firstName.value = "";
  lastName.value = "";
  company.value = "";
  position.value = "";
  phone.value = "";
  email.value = "";
  message.value = "";
  privacyAgreed.value = false;
  marketingAgreed.value = false;
  errors.value = {};
  submitted.value = false;
}

defineExpose({ reset });
</script>

<template>
  <div>
    <div v-if="submitted" class="text-center py-8 space-y-4">
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto"
      >
        <svg
          class="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-foreground">提交成功</h3>
      <p class="text-sm text-muted-foreground">
        感谢您的查询，我们的客户服务团队会尽快与您联络。
      </p>
      <Button variant="outline" @click="reset">再次提交</Button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <Label for="cf-firstName"> 名 </Label>
          <Input
            id="cf-firstName"
            v-model="firstName"
            placeholder=""
            :class="cn(errors.firstName && 'border-destructive')"
          />
          <p v-if="errors.firstName" class="text-xs text-destructive">
            {{ errors.firstName }}
          </p>
        </div>
        <div class="space-y-1.5">
          <Label for="cf-lastName"> 姓 </Label>
          <Input
            id="cf-lastName"
            v-model="lastName"
            placeholder=""
            :class="cn(errors.lastName && 'border-destructive')"
          />
          <p v-if="errors.lastName" class="text-xs text-destructive">
            {{ errors.lastName }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <Label for="cf-company">公司/机构</Label>
          <Input id="cf-company" v-model="company" placeholder="" />
        </div>
        <div class="space-y-1.5">
          <Label for="cf-position">职位</Label>
          <Input id="cf-position" v-model="position" placeholder="" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <Label for="cf-phone"> 手机号码 </Label>
          <Input
            id="cf-phone"
            v-model="phone"
            placeholder=""
            :class="cn(errors.phone && 'border-destructive')"
          />
          <p v-if="errors.phone" class="text-xs text-destructive">
            {{ errors.phone }}
          </p>
        </div>
        <div class="space-y-1.5">
          <Label for="cf-email"> Email </Label>
          <Input
            id="cf-email"
            type="email"
            v-model="email"
            placeholder=""
            :class="cn(errors.email && 'border-destructive')"
          />
          <p v-if="errors.email" class="text-xs text-destructive">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <div class="space-y-1.5">
        <Label for="cf-message">消息内容</Label>
        <Textarea
          id="cf-message"
          v-model="message"
          rows="5"
          placeholder=""
          class="h-32"
        />
      </div>

      <div class="space-y-2 pt-1">
        <div class="flex items-start gap-2">
          <Checkbox
            id="cf-privacy"
            v-model="privacyAgreed"
            :checked="privacyAgreed"
            @update:checked="privacyAgreed = $event"
            class="mt-0.5"
          />
          <Label
            for="cf-privacy"
            class="text-sm font-normal cursor-pointer leading-relaxed"
          >
            本人已阅读及明白中信国际电讯
            <span class="text-blue-700 underline cursor-pointer">
              个人资料（私隐）政策声明
            </span>
            之内容
          </Label>
        </div>
        <p v-if="errors.privacyAgreed" class="text-xs text-destructive">
          {{ errors.privacyAgreed }}
        </p>

        <div class="flex items-start gap-2">
          <Checkbox
            id="cf-marketing"
            v-model="marketingAgreed"
            :checked="marketingAgreed"
            @update:checked="marketingAgreed = $event"
            class="mt-0.5"
          />
          <Label
            for="cf-marketing"
            class="text-sm font-normal cursor-pointer leading-relaxed"
          >
            本人愿意接收中信国际电讯及其代表向本人发出宣传及推广资讯
          </Label>
        </div>
      </div>

      <div class="pt-2">
        <Button
          type="submit"
          class="w-full sm:w-auto px-8"
          :disabled="submitting"
        >
          <ArrowPathIcon v-if="submitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ submitting ? "发送中..." : "发送" }}
        </Button>
      </div>
    </form>
  </div>
</template>
// [AI_END LINES=137 TIMESTAMP=2025-06-19 08:00:00]
