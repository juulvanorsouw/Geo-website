// layerswitcher.js

import { map } from "./map.js";
import { camp_fire } from "./data/camp_fire.js";
import { house_0 } from "./data/house_0.js";
import { house_1_10 } from "./data/house_1_10.js";

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

// Define style for the camp fire layer
const campFireStyle = {
  color: "#FF4500",
  weight: 2,
  opacity: 0.8
};
const campFireLayer = L.geoJSON(camp_fire, {
  style: campFireStyle
});
map.addLayer(campFireLayer);

// Define house icon
let marker_house_o = new L.Icon({
  iconUrl: 'pictures/logo.png',
  iconAnchor: [10.5, 16],
  iconSize: [16, 24],
  popupAnchor: [0, -16]
});

// Create and add house layer
let house_0Layer = new L.geoJSON(house_0, {
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(feature.properties.Lang);
    layer.setIcon(marker_house_o);
  }
});

// Define house icon
let marker_house_1_10 = new L.Icon({
  iconUrl: 'pictures/logo.png',
  iconAnchor: [10.5, 16],
  iconSize: [50, 100],
  popupAnchor: [0, -16]
});

// Create and add house layer
let house_1_10Layer = new L.geoJSON(house_1_10, {
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(feature.properties.Lang);
    layer.setIcon(marker_house_1_10);
  }
});

// Function to update the visibility of the house layer based on zoom level
function updateHouseLayerVisibility() {
  if (map.getZoom() === 13.5) {
    map.addLayer(house_0Layer, house_1_10);
  } else {
    map.removeLayer(house_0Layer, house_1_10);
  }
}

// Initialize visibility of the house layer
updateHouseLayerVisibility();

// Add zoom event listener
map.on('zoomend', updateHouseLayerVisibility);

// Define data layers
let datalagen = {
  'Fire boundary': campFireLayer,
  'No Visible Damage': house_0Layer,
  'Affected (1-9%)': house_1_10Layer,
};

// Create and add base map switcher control to the map
const lagenSwitcher = new L.Control.Layers(basemaps, datalagen);
map.addControl(lagenSwitcher);
