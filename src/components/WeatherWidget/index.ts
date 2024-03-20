import { defineCustomElement } from "vue";

import WeatherWidgetVue from "./WeatherWidget.ce.vue";

const WeatherWidget = defineCustomElement(WeatherWidgetVue);

declare module "vue" {
  export interface GlobalComponents {
    WeatherWidget: typeof WeatherWidget;
  }
}

type CustomGlobalComponentsOptions = {
  readonly name: string;
  readonly element: CustomElementConstructor;
};

export { WeatherWidget };

export const register = (components?: CustomGlobalComponentsOptions[]) => {
  return new Promise((resolve: (value: boolean) => void, reject) => {
    try {
      const _components = components ?? [
        {
          name: "weather-widget",
          element: WeatherWidget,
        },
      ];

      _components.forEach((component) => {
        customElements.define(component.name, component.element);
      });

      return resolve(true);
    } catch (error) {
      console.error(error);

      return reject(false);
    }
  });
};
