<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import { TheForecast } from "../TheForecast";
import { DayForecast } from "../DayForecast";

const isLoading = ref(true);

onBeforeMount(() => {
  setTimeout(() => (isLoading.value = false), 1000);
});
</script>

<template>
  <div class="root">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap"
      rel="stylesheet"
    />
    <TheForecast :is-loading class="grid forecast-grid" />
    <div class="grid day-forecast-container">
      <div class="day-forecast-grid">
        <DayForecast v-for="i in 7" :key="i" :is-loading class="column" />
      </div>
    </div>
  </div>
</template>

<style>
@import "modress/dist/base.css";
@import "../../assets/stylesheets/variables.css";
@import "../../assets/stylesheets/utilities.css";
@import "../ThePlaceholder/index.css";
@import "modress/dist/small.css";
@import "../TheForecast/index.css";
@import "../DayForecast/index.css";
@import "../TemperatureLabel/index.css";
@import "../../assets/stylesheets/icons.css";

:host {
  display: block;
  font-family: var(--font-family);
  font-optical-sizing: auto;
  font-weight: var(--font-weight-regular);
  font-style: normal;
  font-size: var(--font-size-base);
  font-variation-settings: "slnt" 0;
}

:host([hidden]) {
  display: none;
}

.root {
  background-color: var(--body-color);
  color: var(--font-color);
  padding: var(--spacing-base) var(--spacing-base) 0;
}

.day-forecast-container {
  margin: 0 calc(var(--spacing-base) * -1);
}

.day-forecast-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--spacing-base);
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  :host {
    --font-color: var(--neutral-100);
    --body-color: var(--neutral-800);
    --card-body-color: var(--neutral-700);
  }
}

@container (min-width: 576px) {
  .day-forecast-grid {
    align-items: center;
    flex-direction: row;
    gap: unset;
    margin: 0 var(--spacing-base);
  }
}
</style>
