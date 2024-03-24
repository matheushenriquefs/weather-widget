import { useGetWeatherLabelFn } from "../../composables/useGetWeatherLabelFn";
import { type DailyForecast, type CurrentForecast } from "../../types";

export const useGetForecastIconFn = (
  forecast: CurrentForecast | DailyForecast | undefined,
) => {
  if (!forecast) {
    return useGetWeatherLabelFn(0).icon;
  }

  return useGetWeatherLabelFn(forecast.weather.code).icon;
};
