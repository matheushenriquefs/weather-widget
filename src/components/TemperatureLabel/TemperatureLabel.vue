<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: "max" | "min";
  }>(),
  {
    label: "max",
  },
);
</script>

<template>
  <small :class="[`temperature-label-${label}`]">
    <slot></slot>
  </small>
</template>
