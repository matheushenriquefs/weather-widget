<script setup lang="ts">
import {
  Sun as SunIcon,
  ThermometerSun as ThermometerSunIcon,
  ThermometerSnowflake as ThermometerSnowflakeIcon,
} from "lucide-vue-next";

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
  <div>
    <section class="column forecast-column overflow-hidden">
      <ThePlaceholder :is-loading style="width: 100%; height: 48px">
        <h1 class="text-highlight" aria-busy="false">New York</h1>
      </ThePlaceholder>
      <ThePlaceholder style="width: 100%; height: 24px" :is-loading>
        <small class="forecast-mood" aria-busy="false">Feels like 31˚C</small>
      </ThePlaceholder>
    </section>
    <div class="column forecast-column">
      <ThePlaceholder :is-loading style="width: 100%; height: 48px">
        <SunIcon :size="48" aria-busy="false" style="margin: 4px" />
      </ThePlaceholder>
      <ThePlaceholder :is-loading style="width: 100%; height: 24px">
        <small class="forecast-mood" aria-busy="false"
          >Clear with periodic clouds</small
        >
      </ThePlaceholder>
    </div>
    <section class="column forecast-column">
      <ThePlaceholder :is-loading style="width: 100%; height: 48px">
        <h2 class="text-highlight" aria-busy="false">28˚C</h2>
      </ThePlaceholder>
      <ThePlaceholder :is-loading style="width: 100%; height: 24px">
        <div class="forecast-thermometer-container" aria-busy="false">
          <div class="forecast-thermometer">
            <ThermometerSunIcon :size="24" />
            <TemperatureLabel>33˚C</TemperatureLabel>
          </div>
          <div class="forecast-thermometer">
            <ThermometerSnowflakeIcon :size="24" />
            <TemperatureLabel label="low">23˚C</TemperatureLabel>
          </div>
        </div>
      </ThePlaceholder>
    </section>
  </div>
</template>
