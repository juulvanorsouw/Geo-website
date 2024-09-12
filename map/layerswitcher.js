// layerswitcher.js

import { map } from "./map.js"


// Define base map layers
const osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  maxZoom: 18
});

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

const Esri_WorldDarkGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  maxZoom: 18
});

// Define base maps object
const basemaps = {
  'Open Streetmap': osmLayer,
  'ESRI Imagery': Esri_WorldImagery,
  'ESRI Light Gray': Esri_WorldGrayCanvas,
  'ESRI Dark Gray': Esri_WorldDarkGrayCanvas
};

// Add default base map layer to the map
map.addLayer(Esri_WorldDarkGrayCanvas);

// Create and add base map switcher control to the map
const lagenSwitcher = new L.Control.Layers(basemaps);
map.addControl(lagenSwitcher);
