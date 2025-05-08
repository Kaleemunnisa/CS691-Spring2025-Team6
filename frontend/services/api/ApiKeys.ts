import Constants from "expo-constants";
const { geoAPIFY_Key, ticketMasterAPI_Key } = Constants.expoConfig?.extra || {
  geoAPIFY_Key: undefined,
  ticketMasterAPI_Key: undefined,
};
// export const GEOAPIFY_KEY = "ea9de81252614d3099df3bea0483f020"; // geoapify key places
// export const TICKETMASTER_API_KEY = "vjVJ92WGe1DKSrkoeUEyInYGVm2wLj1N"; // Ticketmaster API key for events
export const GEOAPIFY_KEY = geoAPIFY_Key; // geoapify key places
export const TICKETMASTER_API_KEY = ticketMasterAPI_Key; // Ticketmaster API key for events
