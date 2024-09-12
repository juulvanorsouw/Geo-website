import { map, lat, long, zoom } from "./map.js";

// SVG icon for the home button
const htmlTemplate = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z" /></svg>';

// Create custom button control
const customControl = L.Control.extend({
  options: {
    position: 'topleft', // Position of the button on the map
  },

  onAdd: function (map) {
    // Create button element
    const btn = L.DomUtil.create('button');
    btn.title = 'Back to Home';
    btn.innerHTML = htmlTemplate;
    btn.className += 'leaflet-bar back-to-home hidden';

    return btn;
  },
});

// Add custom button control to the map
map.addControl(new customControl());

// Event listeners for the back-to-home button
const buttonBackToHome = document.querySelector('.back-to-home');

function getCenterOfMap() {
  buttonBackToHome.classList.remove('hidden');

  buttonBackToHome.addEventListener('click', () => {
    map.flyTo([lat, long], zoom); // Fly to the initial coordinates with zoom level 4
  });

  map.on('moveend', () => {
    const { lat: latCenter, lng: longCenter } = map.getCenter();

    const defaultCoordinate = [lat, long];

    const centerCoordinate = [latCenter, longCenter];

    if (compareToArrays(centerCoordinate, defaultCoordinate)) {
      buttonBackToHome.classList.add('hidden');
    }
  });
}

const compareToArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);

map.on('moveend', getCenterOfMap);
