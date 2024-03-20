<script setup lang="ts">
import { Sun as SunIcon } from "lucide-vue-next";

import { ThePlaceholder } from "../ThePlaceholder";
import { TemperatureLabel } from "../TemperatureLabel";

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
  <article class="day-forecast">
    <header class="day-forecast-header">
      <ThePlaceholder :is-loading style="width: 32px">
        <h3 class="day-forecast-text-highlight" aria-busy="false">Sun</h3>
      </ThePlaceholder>
      <ThePlaceholder
        :is-loading
        style="width: 32px; height: 32px; margin-bottom: 16px"
      >
        <SunIcon :size="32" class="day-forecast-icon" aria-busy="false" />
      </ThePlaceholder>
    </header>
    <footer class="day-forecast-footer">
      <ThePlaceholder :is-loading style="width: 18px; height: 14px">
        <TemperatureLabel aria-busy="false">14˚C</TemperatureLabel>
      </ThePlaceholder>
      <ThePlaceholder :is-loading style="width: 18px; height: 14px">
        <TemperatureLabel aria-busy="false" label="low">10˚C</TemperatureLabel>
      </ThePlaceholder>
    </footer>
  </article>
</template>
