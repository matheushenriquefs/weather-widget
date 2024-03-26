import { type WeatherWidgetProps, type LocationAddress } from "../../types";

export const useGetForecastParamsFn = async (props: WeatherWidgetProps) => {
  const params = {
    latitude: props.lat,
    longitude: props.lon,
    current: [
      "weather_code",
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "rain",
      "wind_speed_10m",
    ],
    daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"],
  };
  let location = props.location;

  if (!props.lat || !props.lon) {
    params.latitude = 51.477928;
    params.longitude = -0.001545;
    location = "London";
  }

  if (!location) {
    const fetchedLocation: LocationAddress = await (
      await fetch(
        `${import.meta.env.VITE_NOMINATIM_API_URL}/reverse?format=json&lat=${params.latitude}&lon=${params.longitude}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      )
    ).json();

    location = fetchedLocation.address.city;
  }

  return { params, location };
};
