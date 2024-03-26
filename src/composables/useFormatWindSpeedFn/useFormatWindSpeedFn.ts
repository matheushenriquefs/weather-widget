import { type WeatherWidgetPropsOptions } from "../../types";

const convertKilometersToMiles = (speed: number) => speed / 1.609;

export const useFormatWindSpeedFn = (
  speed: number,
  unit: WeatherWidgetPropsOptions["windSpeedUnit"] = "kmh",
) => {
  const _unit = unit?.replace("h", "/h");
  let _speed = speed;

  if (unit === "mph") {
    _speed = Math.round(convertKilometersToMiles(_speed));
  }

  return `${_speed} ${_unit}`;
};
