import { map, lat, long, zoom } from "./map.js";

const htmlTemplate = '<i class="fas fa-home"></i>';


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
