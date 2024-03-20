<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    isLoading?: boolean;
  }>(),
  {
    isLoading: true,
  },
);
</script>

<template>
  <span
    v-if="isLoading"
    class="placeholder"
    aria-busy="true"
    v-bind="$attrs"
  ></span>
  <slot v-else></slot>
</template>
