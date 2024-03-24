import { codes } from "../utils/codes";

export type WeatherCode = keyof typeof codes;

export type DailyForecast = {
  date: number;
  temperature: {
    min: number;
    max: number;
  };
  weather: {
    code: WeatherCode;
    label: string;
  };
};

export type CurrentForecast = {
  date: number;
  temperature: {
    min: number;
    max: number;
    apparent: number;
  };
  weather: {
    code: WeatherCode;
    label: string;
  };
  wind: {
    speed: number;
  };
  relativeHumidity: number;
  rain: number;
};

export type WeatherForecast = {
  current: CurrentForecast | null;
  daily: DailyForecast[];
};
