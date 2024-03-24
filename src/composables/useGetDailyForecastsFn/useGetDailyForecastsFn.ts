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

  if (!daily) {
    return dailyForecasts;
  }

  let nextDate = date.start;
  let index = 0;

  while (nextDate < date.end) {
    const weatherCodeIndex = options.indexOf("weather_code");
    const minTemperatureIndex = options.indexOf("temperature_2m_min");
    const maxTemperatureIndex = options.indexOf("temperature_2m_max");
    const code = daily.variables(weatherCodeIndex)!.valuesArray()![
      index
    ] as WeatherCode;

    dailyForecasts.push({
      date: nextDate,
      temperature: {
        min: Math.round(
          daily.variables(minTemperatureIndex)!.valuesArray()![index],
        ),
        max: Math.round(
          daily.variables(maxTemperatureIndex)!.valuesArray()![index],
        ),
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
