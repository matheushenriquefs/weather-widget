<script setup lang="ts">
import { computed } from "vue";

import { ThePlaceholder } from "../ThePlaceholder";
import { TemperatureLabel } from "../TemperatureLabel";
import { useGetForecastIconFn } from "../../composables/useGetForecastIconFn";
import { type DailyForecast } from "../../types";

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    dailyForecast?: DailyForecast;
  }>(),
  {
    isLoading: true,
    dailyForecast: () => ({
      date: 0,
      temperature: {
        min: 0,
        max: 0,
      },
      weather: {
        code: 0,
        label: "",
      },
    }),
  },
);

const date = computed(() => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  })
    .format(props.dailyForecast.date + timezoneOffset)
    .split("")
    .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
    .join("");
});
const ForecastIcon = computed(() => useGetForecastIconFn(props.dailyForecast));
</script>

<template>
  <article class="daily-forecast">
    <header class="daily-forecast-header">
      <ThePlaceholder :is-loading="isLoading" style="width: 32px">
        <h3 class="daily-forecast-text-highlight" aria-busy="false">
          {{ date }}
        </h3>
      </ThePlaceholder>
      <ThePlaceholder
        :is-loading="isLoading"
        style="width: 32px; height: 32px; margin-bottom: 16px"
      >
        <component
          :is="ForecastIcon"
          :size="32"
          class="daily-forecast-icon"
          aria-busy="false"
        />
      </ThePlaceholder>
    </header>
    <footer class="daily-forecast-footer">
      <ThePlaceholder :is-loading="isLoading" style="width: 18px; height: 14px">
        <TemperatureLabel aria-busy="false"
          >{{ dailyForecast.temperature.max }}˚C</TemperatureLabel
        >
      </ThePlaceholder>
      <ThePlaceholder :is-loading="isLoading" style="width: 18px; height: 14px">
        <TemperatureLabel aria-busy="false" label="min"
          >{{ dailyForecast.temperature.min }}˚C</TemperatureLabel
        >
      </ThePlaceholder>
    </footer>
  </article>
</template>
