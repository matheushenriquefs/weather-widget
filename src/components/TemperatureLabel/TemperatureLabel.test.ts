import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import { h } from "vue";

import { TemperatureLabel } from "./";

describe("TemperatureLabel", () => {
  it("should be defined", () => {
    expect(TemperatureLabel).toBeDefined();
  });

  it("should render slot", () => {
    const wrapper = render(TemperatureLabel, {
      props: {
        isLoading: false,
      },
      slots: {
        default: () => [h("span", { innerHTML: "test" })],
      },
    });
    const slotEl = wrapper.container.querySelector("span");

    expect(slotEl).toBeTruthy();
  });
});
