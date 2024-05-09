import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";

import { CurrentForecast } from "./";
import { useGetCurrentForecastFn } from "../../composables/useGetCurrentForecastFn";
import { useGetWeatherLabelFn } from "../../composables/useGetWeatherLabelFn";

describe("CurrentForecast", () => {
  it("should be defined", () => {
    expect(CurrentForecast).toBeDefined();
  });

  it("should render placeholder elements with default props", () => {
    const wrapper = render(CurrentForecast, {
      props: {
        location: "",
      },
    });
    const placeholderEls =
      wrapper.container.querySelectorAll('[aria-busy="true"]');

    expect(placeholderEls.length).toBe(6);
  });

  it("should render with default props", () => {
    const props = {
      isLoading: false,
      location: "Testing Location",
    };
    const wrapper = render(CurrentForecast, {
      props,
    });
    const headingEl = wrapper.getByRole("heading", { level: 1 });
    const currentForecast = useGetCurrentForecastFn(null, []);
    const { label } = useGetWeatherLabelFn(currentForecast.weather.code);

    expect(headingEl).toBeTruthy();
    expect(headingEl.textContent).toBe(props.location);
    expect(
      wrapper.getByText(
        `Feels like ${currentForecast.temperature.apparent} ˚C`,
      ),
    ).toBeTruthy();
    expect(wrapper.getByText(label)).toBeTruthy();
    expect(
      wrapper.getByText(`${currentForecast.temperature.max} ˚C`),
    ).toBeTruthy();
    expect(wrapper.getByText(`Rain: ${currentForecast.rain}%`)).toBeTruthy();
    expect(
      wrapper.getByText(`Humidity: ${currentForecast.relativeHumidity}%`),
    ).toBeTruthy();
    expect(
      wrapper.getByText(`Wind: ${currentForecast.wind.speed} km/h`),
    ).toBeTruthy();
  });
});
