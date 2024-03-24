import { codes } from "../../utils/codes";
import { type WeatherCode } from "../../types";

export const useGetWeatherLabelFn = (code: WeatherCode) =>
  codes[code] ? codes[code] : codes[0];
