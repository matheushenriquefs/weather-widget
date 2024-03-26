import { defineAsyncComponent } from "vue";

const SunIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/sun"),
);

const SunMediumIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/sun-medium"),
);

const CloudSunIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-sun"),
);

const CloudyIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloudy"),
);

const CloudDrizzleIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-drizzle"),
);

const CloudFogIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-fog"),
);

const CloudHailIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-hail"),
);

const CloudSnowIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-snow"),
);

const CloudRainIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-rain"),
);

const CloudRainWindIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-rain-wind"),
);

const CloudLightningIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/cloud-lightning"),
);

const SnowflakeIcon = defineAsyncComponent(
  () => import("lucide-vue-next/dist/esm/icons/snowflake"),
);

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
