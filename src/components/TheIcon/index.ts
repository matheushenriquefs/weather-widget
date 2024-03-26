import { defineAsyncComponent } from "vue";
import { TheIconPlaceholder } from "../TheIconPlaceholder";

const SunIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/sun"),
  loadingComponent: TheIconPlaceholder,
});

const SunMediumIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/sun-medium"),
  loadingComponent: TheIconPlaceholder,
});

const CloudSunIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-sun"),
  loadingComponent: TheIconPlaceholder,
});

const CloudyIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloudy"),
  loadingComponent: TheIconPlaceholder,
});

const CloudDrizzleIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-drizzle"),
  loadingComponent: TheIconPlaceholder,
});

const CloudFogIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-fog"),
  loadingComponent: TheIconPlaceholder,
});

const CloudHailIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-hail"),
  loadingComponent: TheIconPlaceholder,
});

const CloudSnowIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-snow"),
  loadingComponent: TheIconPlaceholder,
});

const CloudRainIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-rain"),
  loadingComponent: TheIconPlaceholder,
});

const CloudRainWindIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-rain-wind"),
  loadingComponent: TheIconPlaceholder,
});

const CloudLightningIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/cloud-lightning"),
  loadingComponent: TheIconPlaceholder,
});

const SnowflakeIcon = defineAsyncComponent({
  loader: () => import("lucide-vue-next/dist/esm/icons/snowflake"),
  loadingComponent: TheIconPlaceholder,
});

export {
  SunIcon,
  SunMediumIcon,
  CloudSunIcon,
  CloudyIcon,
  CloudDrizzleIcon,
  CloudFogIcon,
  CloudHailIcon,
  CloudSnowIcon,
  CloudRainIcon,
  CloudRainWindIcon,
  CloudLightningIcon,
  SnowflakeIcon,
};
