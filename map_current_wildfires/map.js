/* eslint-disable no-undef */

// Configuration for the map
let config = {
  minZoom: 4,
  maxZoom: 18,
};

// Initial coordinates and zoom level for the map
export const zoom = 4; // Set zoom level to 4
export const lat = 37.0902; // Latitude for the center of the USA
export const long = -95.7129; // Longitude for the center of the USA

// Initialize the map centered on the USA
export const map = L.map("map", config).setView([lat, long], zoom);


// Add the scale control to the map
L.control
  .scale({
    imperial: true,  // Only metric scale
  })
  .addTo(map);
