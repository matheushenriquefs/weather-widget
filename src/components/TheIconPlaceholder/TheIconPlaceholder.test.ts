import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import { h } from "vue";

import { TheIconPlaceholder } from "./";

describe("TheIconPlaceholder", () => {
  it("should be defined", () => {
    expect(TheIconPlaceholder).toBeDefined();
  });

  it("should render placeholder", () => {
    const wrapper = render(TheIconPlaceholder);
    const placeholderEl = wrapper.container.querySelector('[aria-busy="true"]');

    expect(placeholderEl).toBeTruthy();
  });
});
