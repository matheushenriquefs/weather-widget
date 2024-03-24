<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchWeatherApi } from "openmeteo";

import { CurrentForecast } from "../CurrentForecast";
import { DailyForecast } from "../DailyForecast";
import { useGetCurrentForecastFn } from "../../composables/useGetCurrentForecastFn";
import { useGetDailyForecastsFn } from "../../composables/useGetDailyForecastsFn";
import {
  type NominatimReverseGeocoding,
  type GroupedForecast,
} from "../../types";

const props = withDefaults(
  defineProps<{
    lat?: number;
    lon?: number;
    location?: string;
  }>(),
  {
    lat: 0,
    lon: 0,
    location: "",
  },
);

const groupedForecast = ref<GroupedForecast>({
  location: "",
  current: undefined,
  daily: [],
});
const isLoading = ref(true);

onBeforeMount(async () => {
  const params = {
    latitude: props.lat,
    longitude: props.lon,
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
  let location = props.location;

  if (!props.lat || !props.lon) {
    params.latitude = 51.477928;
    params.longitude = -0.001545;
    location = "London";
  }

  if (!location) {
    const fetchedLocation: NominatimReverseGeocoding = await (
      await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${params.latitude}&lon=${params.longitude}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      )
    ).json();

    location = fetchedLocation.address.city;
  }

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
  groupedForecast.value = {
    location,
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
