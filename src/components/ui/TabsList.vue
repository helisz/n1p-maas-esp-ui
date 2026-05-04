// [AI_START TIMESTAMP=2026-05-04 09:49:00]
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { TabsList } from 'radix-vue'

const props = defineProps<{ class?: string }>()
const classes = computed(() =>
  cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground overflow-x-auto', props.class)
)
</script>

<template>
  <TabsList :class="classes"><slot /></TabsList>
</template>
<!-- [AI_END LINES=13 TIMESTAMP=2025-06-15 12:00:00] -->
