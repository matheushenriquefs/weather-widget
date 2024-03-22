export type DailyForecast = {
  date: number;
  temperature: {
    min: number;
    max: number;
  };
  weather: {
    code: number;
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
    code: number;
    label: string;
  };
  wind: {
    speed: number;
  };
  relativeHumidity: number;
  rain: number;
};
