import { type WeatherWidgetPropsOptions } from "../../types";

const convertCelsiusToFahrenheit = (temperature: number) =>
  (temperature * 9) / 5 + 32;

export const useFormatTemperatureFn = (
  temperature: number,
  unit: WeatherWidgetPropsOptions["temperatureUnit"] = "celsius",
) => {
  const _unit = "˚" + unit?.charAt(0).toUpperCase();
  let _temperature = temperature;

  if (unit === "fahrenheit") {
    _temperature = Math.round(convertCelsiusToFahrenheit(_temperature));
  }

  return `${_temperature} ${_unit}`;
};
