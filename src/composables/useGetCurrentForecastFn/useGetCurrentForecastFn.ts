import { type VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

import { useGetWeatherLabelFn } from "../useGetWeatherLabelFn";
import { type CurrentForecast, type WeatherCode } from "../../types";

export const useGetCurrentForecastFn = (
  current: VariablesWithTime | null,
  options: string[],
): CurrentForecast => {
  if (!current) {
    return {
      date: Date.now(),
      temperature: {
        min: 0,
        max: 0,
        apparent: 0,
      },
      weather: {
        code: 0,
        label: useGetWeatherLabelFn(0).label,
      },
      wind: {
        speed: 0,
      },
      relativeHumidity: 0,
      rain: 0,
    };
  }

  const weatherCodeIndex = options.indexOf("weather_code");
  const temperatureIndex = options.indexOf("temperature_2m");
  const apparentTemperatureIndex = options.indexOf("apparent_temperature");
  const relativeHumidityIndex = options.indexOf("relative_humidity_2m");
  const rainIndex = options.indexOf("rain");
  const windSpeedIndex = options.indexOf("wind_speed_10m");
  const date = Number(current.time()) * 1000;
  const code = current.variables(weatherCodeIndex)!.value();

  return {
    date,
    temperature: {
      min: Math.round(current.variables(temperatureIndex)!.value()),
      max: Math.round(current.variables(temperatureIndex)!.value()),
      apparent: Math.round(
        current.variables(apparentTemperatureIndex)!.value(),
      ),
    },
    weather: {
      code,
      label: useGetWeatherLabelFn(code as WeatherCode).label,
    },
    wind: {
      speed: Math.round(current.variables(windSpeedIndex)!.value()),
    },
    relativeHumidity: Math.round(
      current.variables(relativeHumidityIndex)!.value(),
    ),
    rain: Math.round(current.variables(rainIndex)!.value()),
  };
};
