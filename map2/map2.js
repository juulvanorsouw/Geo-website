/* eslint-disable no-undef */

// Configuration for the map
let config = {
  minZoom: 4,
  maxZoom: 18,
};

// Initial coordinates and zoom level for the map
export const zoom = 6;
export const lat = 52.3676; // Latitude for the center of the Netherlands
export const long = 4.9041; // Longitude for the center of the Netherlands


// Initialize the map centered on the USA
export const map = L.map("map", config).setView([lat, long], zoom);