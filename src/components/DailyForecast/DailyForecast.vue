<script setup lang="ts">
import { computed } from "vue";

import { ThePlaceholder } from "../ThePlaceholder";
import { TemperatureLabel } from "../TemperatureLabel";
import { useGetWeatherLabelFn } from "../../composables/useGetWeatherLabelFn";
import { useFormatTemperatureFn } from "../../composables/useFormatTemperatureFn";
import { type DailyForecast, type WeatherWidgetProps } from "../../types";

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    dailyForecast?: DailyForecast;
    options?: WeatherWidgetProps["options"];
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
    options: () => ({
      temperatureUnit: "celsius",
    }),
  },
);

const date = computed(() => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  })
    .format(props.dailyForecast.date + timezoneOffset)
    .split("")
    .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
    .join("");
});

const ForecastIcon = computed(
  () => useGetWeatherLabelFn(props.dailyForecast.weather.code).icon,
);

const temperature = computed(() => ({
  min: useFormatTemperatureFn(
    props.dailyForecast.temperature.min,
    props.options.temperatureUnit,
  ),
  max: useFormatTemperatureFn(
    props.dailyForecast.temperature.max,
    props.options.temperatureUnit,
  ),
}));
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
        style="width: 32px; height: 32px"
        class="daily-forecast-icon"
      >
        <Suspense>
          <ForecastIcon class="daily-forecast-icon" />

          <template #fallback>
            <ThePlaceholder
              :is-loading
              style="width: 32px; height: 32px"
              class="daily-forecast-icon"
            ></ThePlaceholder>
          </template>
        </Suspense>
      </ThePlaceholder>
    </header>
    <footer class="daily-forecast-footer">
      <ThePlaceholder :is-loading="isLoading" style="width: 18px; height: 14px">
        <TemperatureLabel aria-busy="false">{{
          temperature.max
        }}</TemperatureLabel>
      </ThePlaceholder>
      <ThePlaceholder :is-loading="isLoading" style="width: 18px; height: 14px">
        <TemperatureLabel aria-busy="false" label="min">{{
          temperature.min
        }}</TemperatureLabel>
      </ThePlaceholder>
    </footer>
  </article>
</template>
