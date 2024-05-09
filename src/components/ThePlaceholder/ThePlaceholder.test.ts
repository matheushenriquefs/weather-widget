import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import { h } from "vue";

import { ThePlaceholder } from "./";

describe("ThePlaceholder", () => {
  it("should be defined", () => {
    expect(ThePlaceholder).toBeDefined();
  });

  it("should render placeholder", () => {
    const wrapper = render(ThePlaceholder);
    const placeholderEl = wrapper.container.querySelector('[aria-busy="true"]');

    expect(placeholderEl).toBeTruthy();
  });

  it("should not render placeholder", () => {
    const wrapper = render(ThePlaceholder, {
      props: {
        isLoading: false,
      },
      slots: {
        default: () => [h("span", { innerHTML: "test" })],
      },
    });
    const placeholderEl = wrapper.container.querySelector('[aria-busy="true"]');
    const slotEl = wrapper.container.querySelector("span");

    expect(placeholderEl).toBe(null);
    expect(slotEl).toBeTruthy();
  });
});
