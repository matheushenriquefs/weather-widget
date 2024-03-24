<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchWeatherApi } from "openmeteo";

import { CurrentForecast } from "../CurrentForecast";
import { DailyForecast } from "../DailyForecast";
import { useGetCurrentForecastFn } from "../../composables/useGetCurrentForecastFn";
import { useGetDailyForecastsFn } from "../../composables/useGetDailyForecastsFn";
import { type WeatherForecast } from "../../types";

const props = withDefaults(
  defineProps<{
    latitude?: number;
    longitude?: number;
  }>(),
  {
    latitude: 51.477928, // prime meridian
    longitude: -0.001545, // prime meridian
  },
);

const weatherForecast = ref<WeatherForecast>({
  current: null,
  daily: [],
});
const isLoading = ref(true);

onBeforeMount(async () => {
  const params = {
    // latitude: -23.5475,
    // longitude: -46.6361,
    latitude: props.latitude,
    longitude: props.longitude,
    current: [
      "weather_code",
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "rain",
      "wind_speed_10m",
    ],
    daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const [response] = await fetchWeatherApi(url, params);
  const current = response.current();
  const daily = response.daily();
  const currentForecast = useGetCurrentForecastFn(current, params.current);
  const dailyForecasts = useGetDailyForecastsFn(
    daily,
    {
      start: Number(daily!.time()) * 1000,
      end: Number(daily!.timeEnd()) * 1000,
      interval: daily!.interval() * 1000,
    },
    params.daily,
  );
  weatherForecast.value = {
    current: currentForecast,
    daily: dailyForecasts,
  };
  isLoading.value = false;
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
    <CurrentForecast
      :current-forecast="
        weatherForecast.current ? weatherForecast.current : undefined
      "
      :is-loading
      class="grid current-forecast-grid"
    />
    <div class="grid daily-forecast-container">
      <div class="daily-forecast-grid">
        <DailyForecast
          v-for="(dailyForecast, i) in weatherForecast.daily"
          :key="i"
          :is-loading
          :daily-forecast
          class="column"
        />
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
@import "../CurrentForecast/index.css";
@import "../DailyForecast/index.css";
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

@media (prefers-color-scheme: dark) {
  :host {
    --font-color: var(--neutral-100);
    --body-color: var(--neutral-800);
    --card-body-color: var(--neutral-700);
  }
}
</style>
