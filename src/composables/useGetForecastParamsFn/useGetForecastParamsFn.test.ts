import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

import { useGetForecastParamsFn } from "./";
import { coordinates } from "../../utils/coordinates";

const location = {
  address: {
    city: coordinates.location,
  },
};

export const restHandlers = [
  http.get(
    `${import.meta.env.VITE_NOMINATIM_API_URL}/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
    () => {
      return HttpResponse.json(location);
    },
  ),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe("useGetForecastParamsFn", () => {
  it("should be defined", () => {
    expect(useGetForecastParamsFn).toBeDefined();
  });

  it("should return default forecast params", async () => {
    const forecastParams = {
      location: coordinates.location,
      params: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current: [
          "weather_code",
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "rain",
          "wind_speed_10m",
        ],
        daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
      },
    };
    const props = {
      lat: 0,
      lon: 0,
    };

    const result = await useGetForecastParamsFn(props);

    expect(result).toStrictEqual(forecastParams);
  });

  it("should return forecast params", async () => {
    const forecastParams = {
      location: coordinates.location,
      params: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current: [
          "weather_code",
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "rain",
          "wind_speed_10m",
        ],
        daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
      },
    };
    const props = {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      location: coordinates.location,
    };

    const result = await useGetForecastParamsFn(props);

    expect(result).toStrictEqual(forecastParams);
  });

  it("should return params and guess the location using coordinates", async () => {
    const forecastParams = {
      location: coordinates.location,
      params: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current: [
          "weather_code",
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "rain",
          "wind_speed_10m",
        ],
        daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
      },
    };
    const props = {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      location: "",
    };

    const result = await useGetForecastParamsFn(props);

    expect(result).toStrictEqual(forecastParams);
  });
});
