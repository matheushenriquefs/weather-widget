import { describe, it, expect } from "vitest";

import { useFormatWindSpeedFn } from "./";

describe("useFormatWindSpeedFn", () => {
  it("should be defined", () => {
    expect(useFormatWindSpeedFn).toBeDefined();
  });

  it("should format the speed to kilometers per hour", async () => {
    const speedInKilometers = 1;
    const formattedUnitInKilometers = "km/h";

    const result = useFormatWindSpeedFn(speedInKilometers);

    expect(result).toBe(`${speedInKilometers} ${formattedUnitInKilometers}`);
  });

  it("should format the speed to miles per hour", async () => {
    const speedInKilometers = 1.6;
    const speedInMiles = 1;
    const unitInMiles = "mph";
    const formattedUnitInMiles = "mp/h";

    const result = useFormatWindSpeedFn(speedInKilometers, unitInMiles);

    expect(result).toBe(`${speedInMiles} ${formattedUnitInMiles}`);
  });
});
