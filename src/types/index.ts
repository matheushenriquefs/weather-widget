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

export type GroupedForecast = {
  location: string;
  current: CurrentForecast | undefined;
  daily: DailyForecast[];
};

export type LocationAddress = {
  address: {
    city: string;
  };
};

export type WeatherWidgetPropsOptions = {
  temperatureUnit?: "celsius" | "fahrenheit";
  windSpeedUnit?: "kmh" | "mph";
};

export type WeatherWidgetProps = {
  lat?: number;
  lon?: number;
  location?: string;
  options?: WeatherWidgetPropsOptions;
};
