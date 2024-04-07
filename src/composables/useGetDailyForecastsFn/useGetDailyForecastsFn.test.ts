import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";
import { VariableWithValues } from "@openmeteo/sdk/variable-with-values";

import { useGetDailyForecastsFn } from "./";
import { useGetWeatherLabelFn } from "../useGetWeatherLabelFn/useGetWeatherLabelFn";
import { type DailyForecast } from "../../types";

const date = new Date("2024-03-27T17:01:35.776Z");

class VariableWithValuesMock extends VariableWithValues {
  private expectedValue: unknown[];

  constructor(expectedValue: unknown[]) {
    super();
    this.expectedValue = expectedValue;
  }

  valuesArray(): Float32Array | null {
    return this.expectedValue as unknown as Float32Array;
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
      ? new VariableWithValuesMock(this.expectedVariables[index] as unknown[])
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

describe("useGetDailyForecastsFn", () => {
  it("should be defined", () => {
    expect(useGetDailyForecastsFn).toBeDefined();
  });

  it("should return default", () => {
    const dailyForecasts: DailyForecast[] = [];

    const result = useGetDailyForecastsFn(
      null,
      { start: 0, end: 0, interval: 0 },
      [],
    );

    expect(result).toStrictEqual(dailyForecasts);
  });

  it("should return the daily forecasts", async () => {
    const start = date.getTime();
    const interval = 1000 * 60 * 60 * 24;
    const end = interval * 7 + start;
    const code = 1;
    const minTemperature = 20;
    const maxTemperature = 25;
    const options = [
      "weather_code",
      "temperature_2m_min",
      "temperature_2m_max",
    ];
    const mock: unknown[] = [];
    const dailyForecasts: DailyForecast[] = [];
    let nextDate = start;
    mock.push(Array.from({ length: 7 }).map(() => code));
    mock.push(Array.from({ length: 7 }).map(() => minTemperature));
    mock.push(Array.from({ length: 7 }).map(() => maxTemperature));

    while (nextDate < end) {
      dailyForecasts.push({
        date: nextDate,
        temperature: {
          min: minTemperature,
          max: maxTemperature,
        },
        weather: {
          code,
          label: useGetWeatherLabelFn(code).label,
        },
      });
      nextDate = nextDate + interval;
    }

    const result = useGetDailyForecastsFn(
      new VariablesWithTimeMock(mock),
      {
        start,
        end,
        interval,
      },
      options,
    );

    expect(result).toStrictEqual(dailyForecasts);
  });

  it("should return the daily forecasts with few options", async () => {
    const start = date.getTime();
    const interval = 1000 * 60 * 60 * 24;
    const end = interval * 7 + start;
    const code = 1;
    const minTemperature = 20;
    const maxTemperature = 0;
    const options = ["weather_code", "temperature_2m_min"];
    const mock: unknown[] = [];
    const dailyForecasts: DailyForecast[] = [];
    let nextDate = start;
    mock.push(Array.from({ length: 7 }).map(() => code));
    mock.push(Array.from({ length: 7 }).map(() => minTemperature));

    while (nextDate < end) {
      dailyForecasts.push({
        date: nextDate,
        temperature: {
          min: minTemperature,
          max: maxTemperature,
        },
        weather: {
          code,
          label: useGetWeatherLabelFn(code).label,
        },
      });
      nextDate = nextDate + interval;
    }

    const result = useGetDailyForecastsFn(
      new VariablesWithTimeMock(mock),
      {
        start,
        end,
        interval,
      },
      options,
    );

    expect(result).toStrictEqual(dailyForecasts);
  });
});
