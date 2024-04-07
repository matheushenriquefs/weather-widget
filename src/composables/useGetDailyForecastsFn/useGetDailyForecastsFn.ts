import { type VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

import { useGetWeatherLabelFn } from "../useGetWeatherLabelFn";
import { type DailyForecast, type WeatherCode } from "../../types";

export const useGetDailyForecastsFn = (
  daily: VariablesWithTime | null,
  date: {
    start: number;
    end: number;
    interval: number;
  },
  options: string[],
) => {
  const dailyForecasts: DailyForecast[] = [];
  const defaultForecast = {
    temperature: {
      min: 0,
      max: 0,
    },
    weather: {
      code: 0 as WeatherCode,
    },
  };

  if (!daily) {
    return dailyForecasts;
  }

  let nextDate = date.start;
  let index = 0;

  while (nextDate < date.end) {
    const weatherCodeIndex = options.indexOf("weather_code");
    const minTemperatureIndex = options.indexOf("temperature_2m_min");
    const maxTemperatureIndex = options.indexOf("temperature_2m_max");
    let code = defaultForecast.weather.code;
    let minTemperature = defaultForecast.temperature.min;
    let maxTemperature = defaultForecast.temperature.max;

    if (
      daily.variables(weatherCodeIndex)?.valuesArray() &&
      daily.variables(weatherCodeIndex)!.valuesArray()![index] !== undefined
    ) {
      code = daily.variables(weatherCodeIndex)!.valuesArray()![
        index
      ] as WeatherCode;
    }

    if (
      daily.variables(minTemperatureIndex)?.valuesArray() &&
      daily.variables(minTemperatureIndex)!.valuesArray()![index] !== undefined
    ) {
      minTemperature = daily.variables(minTemperatureIndex)!.valuesArray()![
        index
      ];
    }

    if (
      daily.variables(maxTemperatureIndex)?.valuesArray() &&
      daily.variables(maxTemperatureIndex)!.valuesArray()![index] !== undefined
    ) {
      maxTemperature = daily.variables(maxTemperatureIndex)!.valuesArray()![
        index
      ];
    }

    dailyForecasts.push({
      date: nextDate,
      temperature: {
        min: Math.round(minTemperature),
        max: Math.round(maxTemperature),
      },
      weather: {
        code,
        label: useGetWeatherLabelFn(code).label,
      },
    });
    nextDate = nextDate + date.interval;
    index++;
  }

  return dailyForecasts;
};
