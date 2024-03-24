<script setup lang="ts">
import { computed } from "vue";

import { ThePlaceholder } from "../ThePlaceholder";
import { useGetCurrentForecastFn } from "../../composables/useGetCurrentForecastFn";
import { useGetForecastIconFn } from "../../composables/useGetForecastIconFn";
import { type CurrentForecast } from "../../types";

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    currentForecast?: CurrentForecast;
  }>(),
  {
    isLoading: true,
    currentForecast: () => useGetCurrentForecastFn(null, []),
  },
);

const ForecastIcon = computed(() =>
  useGetForecastIconFn(props.currentForecast),
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
        <component
          :is="ForecastIcon"
          :size="48"
          aria-busy="false"
          style="margin: 4px"
        />
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
