<script setup lang="ts">
import { computed } from "vue";

import { ThePlaceholder } from "../ThePlaceholder";
import { useGetWeatherLabelFn } from "../../composables/useGetWeatherLabelFn";
import { useGetCurrentForecastFn } from "../../composables/useGetCurrentForecastFn";
import { useFormatTemperatureFn } from "../../composables/useFormatTemperatureFn";
import { useFormatWindSpeedFn } from "../../composables/useFormatWindSpeedFn";
import { type CurrentForecast, type WeatherWidgetProps } from "../../types";

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    currentForecast?: CurrentForecast;
    location: string;
    options?: WeatherWidgetProps["options"];
  }>(),
  {
    isLoading: true,
    currentForecast: () => useGetCurrentForecastFn(null, []),
    options: () => ({
      temperatureUnit: "celsius",
      windSpeedUnit: "kmh",
    }),
  },
);

const ForecastIcon = computed(
  () => useGetWeatherLabelFn(props.currentForecast.weather.code).icon,
);

const temperature = computed(() => ({
  max: useFormatTemperatureFn(
    props.currentForecast.temperature.max,
    props.options.temperatureUnit,
  ),
  apparent: useFormatTemperatureFn(
    props.currentForecast.temperature.apparent,
    props.options.temperatureUnit,
  ),
}));

const windSpeed = computed(() =>
  useFormatWindSpeedFn(
    props.currentForecast.wind.speed,
    props.options.windSpeedUnit,
  ),
);
</script>

<template>
  <div>
    <section class="column current-forecast-column overflow-hidden">
      <ThePlaceholder :is-loading="isLoading" style="width: 100%; height: 48px">
        <h1 class="text-highlight" aria-busy="false">{{ location }}</h1>
      </ThePlaceholder>
      <ThePlaceholder style="width: 100%; height: 24px" :is-loading="isLoading">
        <small class="current-forecast-weather" aria-busy="false"
          >Feels like {{ temperature.apparent }}</small
        >
      </ThePlaceholder>
    </section>
    <div class="column current-forecast-column">
      <ThePlaceholder :is-loading="isLoading" style="width: 100%; height: 48px">
        <Suspense>
          <component
            :is="ForecastIcon"
            :size="48"
            aria-busy="false"
            style="margin: 4px"
          />

          <template #fallback>
            <ThePlaceholder
              :is-loading="isLoading"
              style="width: 100%; height: 48px"
            ></ThePlaceholder>
          </template>
        </Suspense>
      </ThePlaceholder>
      <ThePlaceholder :is-loading="isLoading" style="width: 100%; height: 24px">
        <small class="current-forecast-weather" aria-busy="false">{{
          currentForecast.weather.label
        }}</small>
      </ThePlaceholder>
    </div>
    <section class="column current-forecast-column">
      <ThePlaceholder :is-loading="isLoading" style="width: 100%; height: 48px">
        <h2 class="text-highlight" aria-busy="false">
          {{ temperature.max }}
        </h2>
      </ThePlaceholder>
      <ThePlaceholder :is-loading="isLoading" style="width: 100%; height: 24px">
        <div class="current-forecast-conditions">
          <small>Rain: {{ currentForecast.rain }}%</small>
          <small>Humidity: {{ currentForecast.relativeHumidity }}%</small>
          <small>Wind: {{ windSpeed }}</small>
        </div>
      </ThePlaceholder>
    </section>
  </div>
</template>
