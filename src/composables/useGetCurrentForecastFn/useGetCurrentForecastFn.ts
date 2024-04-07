import { type VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

import { useGetWeatherLabelFn } from "../useGetWeatherLabelFn";
import { type CurrentForecast, type WeatherCode } from "../../types";

export const useGetCurrentForecastFn = (
  current: VariablesWithTime | null,
  options: string[],
): CurrentForecast => {
  const defaultForecast = {
    date: Date.now(),
    temperature: {
      min: 0,
      max: 0,
      apparent: 0,
    },
    weather: {
      code: 0 as WeatherCode,
      label: useGetWeatherLabelFn(0).label,
    },
    wind: {
      speed: 0,
    },
    relativeHumidity: 0,
    rain: 0,
  };

  if (!current) {
    return defaultForecast;
  }

  const weatherCodeIndex = options.indexOf("weather_code");
  const temperatureIndex = options.indexOf("temperature_2m");
  const apparentTemperatureIndex = options.indexOf("apparent_temperature");
  const relativeHumidityIndex = options.indexOf("relative_humidity_2m");
  const rainIndex = options.indexOf("rain");
  const windSpeedIndex = options.indexOf("wind_speed_10m");

  const date = Number(current.time()) * 1000;

  const code = current.variables(weatherCodeIndex)
    ? (current.variables(weatherCodeIndex)!.value() as WeatherCode)
    : defaultForecast.weather.code;

  const temperature = current.variables(temperatureIndex)
    ? current.variables(temperatureIndex)!.value()
    : defaultForecast.temperature.min;

  const apparentTemperature = current.variables(apparentTemperatureIndex)
    ? current.variables(apparentTemperatureIndex)!.value()
    : defaultForecast.temperature.apparent;

  const relativeHumidity = current.variables(relativeHumidityIndex)
    ? current.variables(relativeHumidityIndex)!.value()
    : defaultForecast.relativeHumidity;

  const rain = current.variables(rainIndex)
    ? current.variables(rainIndex)!.value()
    : defaultForecast.rain;

  const windSpeed = current.variables(windSpeedIndex)
    ? current.variables(windSpeedIndex)!.value()
    : defaultForecast.wind.speed;

  return {
    date,
    temperature: {
      min: Math.round(temperature),
      max: Math.round(temperature),
      apparent: Math.round(apparentTemperature),
    },
    weather: {
      code,
      label: useGetWeatherLabelFn(code).label,
    },
    wind: {
      speed: Math.round(windSpeed),
    },
    relativeHumidity: Math.round(relativeHumidity),
    rain: Math.round(rain),
  };
};
