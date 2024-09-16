/* eslint-disable no-undef */

// Configuration for the map
let config = {
  minZoom: 4,
  maxZoom: 18,
};

export const zoom = 6;
export const lat = 36.7783; // Latitude for the center of California
export const long = -119.4179; // Longitude for the center of California

// Initialize the map centered on the Netherlands without any tile layers
export const map = L.map("map", config).setView([lat, long], zoom);

// Add the scale control to the map
L.control
  .scale({
    imperial: true,  // Only metric scale
  })
  .addTo(map);
