<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { cn } from "@/lib/utils"
import { SwitchRoot, SwitchThumb } from "radix-vue"

const props = defineProps<{
  class?: string
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:checked": [value: boolean]
}>()
</script>

<template>
  <SwitchRoot
    v-model:checked="checked"
    :class="cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      props.class
    )"
    :disabled="disabled"
    @update:checked="emit('update:checked', $event)"
  >
    <SwitchThumb
      :class="cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
      )"
    />
  </SwitchRoot>
</template>
<!-- [AI_END LINES=29 TIMESTAMP=2025-06-15 12:00:00] -->
</template>
<!-- [AI_END LINES=46 TIMESTAMP=2025-06-15 12:00:00] -->
