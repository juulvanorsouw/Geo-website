/* eslint-disable no-undef */

// Configuration for the map
let config = {
  minZoom: 9,
  maxZoom: 18,
};

export const zoom = 10;  // Adjust the zoom level to fit the region
export const lat = 39.7285; // Latitude for Chico, California
export const long = -121.65; // Longitude for Chico, California

// Initialize the map centered on the Netherlands without any tile layers
export const map = L.map("map", config).setView([lat, long], zoom);

// Add the scale control to the map
L.control
  .scale({
    imperial: true,  // Only metric scale
  })
  .addTo(map);
