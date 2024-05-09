import { describe, it, expect } from "vitest";

import * as TheIcon from "./";

describe("TheIcon", () => {
  it("should be defined", () => {
    const icons = [
      "SunIcon",
      "SunMediumIcon",
      "CloudSunIcon",
      "CloudyIcon",
      "CloudDrizzleIcon",
      "CloudFogIcon",
      "CloudHailIcon",
      "CloudSnowIcon",
      "CloudRainIcon",
      "CloudRainWindIcon",
      "CloudLightningIcon",
      "SnowflakeIcon",
    ];

    icons.forEach((icon) => {
      expect(icon in TheIcon).toBeTruthy();
    });
  });
});
