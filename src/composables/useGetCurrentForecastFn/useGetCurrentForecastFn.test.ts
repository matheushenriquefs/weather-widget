import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { VariableWithValues } from "@openmeteo/sdk/variable-with-values";

import { useGetCurrentForecastFn } from "./";
import { useGetWeatherLabelFn } from "../useGetWeatherLabelFn";

const date = new Date("2024-03-27T17:01:35.776Z");

class VariableWithValuesMock extends VariableWithValues {
  private expectedValue: unknown;

  constructor(expectedValue: unknown) {
    super();
    this.expectedValue = expectedValue;
  }

  value(): number {
    return Number(this.expectedValue);
  }
}

class VariablesWithTimeMock extends VariablesWithTime {
  private expectedVariables: unknown[];

  constructor(expectedVariables: unknown[]) {
    super();
    this.expectedVariables = expectedVariables;
  }

  time(): bigint {
    const time = date.getTime() / 1000;

    return time as unknown as bigint;
  }

  variables(
    index: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _obj?: VariableWithValues,
  ): VariableWithValues | null {
    return this.expectedVariables[index] !== undefined
      ? new VariableWithValuesMock(this.expectedVariables[index])
      : null;
  }
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(date);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useGetCurrentForecastFn", () => {
  it("should be defined", () => {
    expect(useGetCurrentForecastFn).toBeDefined();
  });

  it("should return current forecast with default data", async () => {
    const currentForecast = {
      date: date.getTime(),
      temperature: {
        min: 0,
        max: 0,
        apparent: 0,
      },
      weather: {
        code: 0,
        label: useGetWeatherLabelFn(0).label,
      },
      wind: {
        speed: 0,
      },
      relativeHumidity: 0,
      rain: 0,
    };

    const result = useGetCurrentForecastFn(null, []);

    expect(result).toStrictEqual(currentForecast);
  });

  it("should return the current forecast", async () => {
    const code = 1;
    const temperature = 20;
    const apparentTemperature = 25;
    const relativeHumidity = 50;
    const rain = 0;
    const windSpeed = 10;
    const options = [
      "weather_code",
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "rain",
      "wind_speed_10m",
    ];
    const currentForecast = {
      date: date.getTime(),
      temperature: {
        min: temperature,
        max: temperature,
        apparent: apparentTemperature,
      },
      weather: {
        code,
        label: useGetWeatherLabelFn(code).label,
      },
      wind: {
        speed: windSpeed,
      },
      relativeHumidity,
      rain,
    };

    const result = useGetCurrentForecastFn(
      new VariablesWithTimeMock([
        code,
        temperature,
        apparentTemperature,
        relativeHumidity,
        rain,
        windSpeed,
      ]),
      options,
    );

    expect(result).toStrictEqual(currentForecast);
  });

  it("should return the current forecast with few options", async () => {
    const code = 0;
    const temperature = 0;
    const apparentTemperature = 0;
    const options = ["weather_code", "temperature_2m", "apparent_temperature"];
    const currentForecast = {
      date: date.getTime(),
      temperature: {
        min: temperature,
        max: temperature,
        apparent: apparentTemperature,
      },
      weather: {
        code,
        label: useGetWeatherLabelFn(code).label,
      },
      wind: {
        speed: 0,
      },
      relativeHumidity: 0,
      rain: 0,
    };

    const result = useGetCurrentForecastFn(
      new VariablesWithTimeMock([]),
      options,
    );

    expect(result).toStrictEqual(currentForecast);
  });
});
