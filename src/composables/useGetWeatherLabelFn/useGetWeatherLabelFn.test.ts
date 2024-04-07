import { describe, it, expect } from "vitest";

import { useGetWeatherLabelFn } from "./";
import { codes } from "../../utils/codes";
import { type WeatherCode } from "../../types";

describe("useGetWeatherLabelFn", () => {
  it("should be defined", () => {
    expect(useGetWeatherLabelFn).toBeDefined();
  });

  it("should return weather label", async () => {
    for (const [code, label] of Object.entries(codes)) {
      const result = useGetWeatherLabelFn(Number(code) as WeatherCode);

      expect(result).toBe(label);
    }
  });

  it("should return a default label", async () => {
    const code = 9999;
    const label = codes[0];

    const result = useGetWeatherLabelFn(code as WeatherCode);

    expect(result).toBe(label);
  });
});
