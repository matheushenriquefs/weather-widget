<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <span
    class="placeholder"
    aria-busy="true"
    v-bind="$attrs"
    style="width: 100%; height: 32px"
  ></span>
</template>
