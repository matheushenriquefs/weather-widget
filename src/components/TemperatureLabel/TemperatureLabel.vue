<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: "high" | "low";
  }>(),
  {
    label: "high",
  },
);
</script>

<template>
  <small :class="[`temperature-label-${label}`]">
    <slot></slot>
  </small>
</template>
