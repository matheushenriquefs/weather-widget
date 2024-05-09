import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/vue";

import { DailyForecast } from "./";

const date = new Date("2024-03-27T17:01:35.776Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(date);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("DailyForecast", () => {
  it("should be defined", () => {
    expect(DailyForecast).toBeDefined();
  });

  it("should render placeholder elements with default props", () => {
    const wrapper = render(DailyForecast);
    const placeholderEls =
      wrapper.container.querySelectorAll('[aria-busy="true"]');

    expect(placeholderEls.length).toBe(4);
  });

  it("should render with default props", () => {
    const props = {
      isLoading: false,
    };
    const wrapper = render(DailyForecast, {
      props,
    });
    const headingEl = wrapper.getByRole("heading", { level: 3 });
    const smallEls = wrapper.container.querySelectorAll("small");

    expect(headingEl).toBeTruthy();
    expect(headingEl.textContent).toBe("Thu");

    for (const smallEl of smallEls) {
      expect(smallEl).toBeTruthy();
      expect(smallEl.textContent).toBe("0 ˚C");
    }
  });
});
