<script setup lang="ts">
import { Sun as SunIcon } from "lucide-vue-next";

import { ThePlaceholder } from "../ThePlaceholder";
import { useGetCurrentForecast } from "../../composables/useGetCurrentForecast";
import { type CurrentForecast } from "../../types";

withDefaults(
  defineProps<{
    isLoading?: boolean;
    currentForecast?: CurrentForecast;
  }>(),
  {
    isLoading: true,
    currentForecast: () => useGetCurrentForecast(null, []),
  },
);
</script>

<template>
  <div>
    <section class="column current-forecast-column overflow-hidden">
      <ThePlaceholder :is-loading style="width: 100%; height: 48px">
        <h1 class="text-highlight" aria-busy="false">New York</h1>
      </ThePlaceholder>
      <ThePlaceholder style="width: 100%; height: 24px" :is-loading>
        <small class="current-forecast-weather" aria-busy="false"
          >Feels like {{ currentForecast.temperature.apparent }}˚C</small
        >
      </ThePlaceholder>
    </section>
    <div class="column current-forecast-column">
      <ThePlaceholder :is-loading style="width: 100%; height: 48px">
        <SunIcon :size="48" aria-busy="false" style="margin: 4px" />
      </ThePlaceholder>
      <ThePlaceholder :is-loading style="width: 100%; height: 24px">
        <small class="current-forecast-weather" aria-busy="false">{{
          currentForecast.weather.label
        }}</small>
      </ThePlaceholder>
    </div>
    <section class="column current-forecast-column">
      <ThePlaceholder :is-loading style="width: 100%; height: 48px">
        <h2 class="text-highlight" aria-busy="false">
          {{ currentForecast.temperature.max }}˚C
        </h2>
      </ThePlaceholder>
      <ThePlaceholder :is-loading style="width: 100%; height: 24px">
        <div class="current-forecast-conditions">
          <small>Rain: {{ currentForecast.rain }}%</small>
          <small>Humidity: {{ currentForecast.relativeHumidity }}%</small>
          <small>Wind: {{ currentForecast.wind.speed }}%</small>
        </div>
      </ThePlaceholder>
    </section>
  </div>
</template>
