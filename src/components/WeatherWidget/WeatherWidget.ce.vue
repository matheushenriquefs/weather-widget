<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchWeatherApi } from "openmeteo";

import { CurrentForecast } from "../CurrentForecast";
import { DailyForecast } from "../DailyForecast";
import { useGetCurrentForecastFn } from "../../composables/useGetCurrentForecastFn";
import { useGetDailyForecastsFn } from "../../composables/useGetDailyForecastsFn";
import { useGetForecastParamsFn } from "../../composables/useGetForecastParamsFn";
import { type GroupedForecast, type WeatherWidgetProps } from "../../types";

const props = withDefaults(defineProps<WeatherWidgetProps>(), {
  lat: 0,
  lon: 0,
  location: "",
});

const groupedForecast = ref<GroupedForecast>({
  location: "",
  current: undefined,
  daily: [],
});
const isLoading = ref(true);

onBeforeMount(async () => {
  const forecastParams = await useGetForecastParamsFn(props);

  const url = "https://api.open-meteo.com/v1/forecast";
  const [response] = await fetchWeatherApi(url, forecastParams.params);
  const current = response.current();
  const daily = response.daily();
  const currentForecast = useGetCurrentForecastFn(
    current,
    forecastParams.params.current,
  );
  const dailyForecasts = useGetDailyForecastsFn(
    daily,
    {
      start: Number(daily!.time()) * 1000,
      end: Number(daily!.timeEnd()) * 1000,
      interval: daily!.interval() * 1000,
    },
    forecastParams.params.daily,
  );
  groupedForecast.value = {
    location: forecastParams.location,
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
      :current-forecast="groupedForecast.current"
      :is-loading="isLoading"
      :location="groupedForecast.location"
      class="grid current-forecast-grid"
    />
    <div class="grid daily-forecast-container">
      <div class="daily-forecast-grid">
        <DailyForecast
          v-for="(dailyForecast, i) in groupedForecast.daily"
          :key="i"
          :is-loading="isLoading"
          :daily-forecast="dailyForecast"
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
