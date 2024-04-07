import { describe, it, expect } from "vitest";

import { useFormatTemperatureFn } from "./";

describe("useFormatTemperatureFn", () => {
  it("should be defined", () => {
    expect(useFormatTemperatureFn).toBeDefined();
  });

  it("should format the temperature to celsius", async () => {
    const temperatureInCelsius = 23;
    const unitInCelsius = "˚C";

    const result = useFormatTemperatureFn(temperatureInCelsius);

    expect(result).toBe(`${temperatureInCelsius} ${unitInCelsius}`);
  });

  it("should format the temperature to fahrenheit", async () => {
    const temperatureInCelsius = 23;
    const temperatureInFahrenheit = 73;
    const unitInFahrenheit = "˚F";

    const result = useFormatTemperatureFn(temperatureInCelsius, "fahrenheit");

    expect(result).toBe(`${temperatureInFahrenheit} ${unitInFahrenheit}`);
  });
});
