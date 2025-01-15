import { map } from "./map.js";

// Declare global variables
let totalwildfires = 0;
let totalacresburned = 0;
let totalfatalities = 0;
let totalincidentpersonnel = 0;
let totalresidencesdestroyed = 0;
let totalwildfirestoday = 0;

// Function to fetch wildfire data and calculate totals
async function fetchWildfireData(state) {
  // GeoServer WFS URL with CQL filter for the selected state
  const wfsUrl = state
    ? `http://localhost:8080/geoserver/Wildfire/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Wildfire:current_wilfdire&outputFormat=application/json&cql_filter=poostate='${state}'`
    : `http://localhost:8080/geoserver/Wildfire/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Wildfire:current_wilfdire&outputFormat=application/json`;

  try {
    // Fetch data from GeoServer
    const response = await fetch(wfsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Reset totals before calculation
    totalwildfires = 0;
    totalacresburned = 0;
    totalfatalities = 0;
    totalincidentpersonnel = 0;
    totalresidencesdestroyed = 0;

    // Loop through features and calculate totals
    data.features.forEach((feature) => {
      totalwildfires += 1;
      const acres = feature.properties.calculatedacres || 0;
      const fatalities = feature.properties.fatalities || 0;
      const personnel = feature.properties.totalincidentpersonnel || 0;
      const residences = feature.properties.residencesdestroyed || 0;

      totalacresburned += acres;
      totalfatalities += fatalities;
      totalincidentpersonnel += personnel;
      totalresidencesdestroyed += residences;
    });

    // Round totals to the nearest integer where necessary
    totalacresburned = Math.round(totalacresburned);
    totalincidentpersonnel = Math.round(totalincidentpersonnel);

    // Log results
    console.log('Total Wildfires:', totalwildfires);
    console.log('Total Acres Burned:', totalacresburned);
    console.log('Total Fatalities:', totalfatalities);
    console.log('Total Incident Personnel:', totalincidentpersonnel);
    console.log('Total Residences Destroyed:', totalresidencesdestroyed);

    // Update HTML content with the fetched data
    updateHTMLContent();

    // Optionally return the calculated values
    return {
      totalwildfires,
      totalacresburned,
      totalfatalities,
      totalincidentpersonnel,
      totalresidencesdestroyed,
    };
  } catch (error) {
    console.error('Error fetching wildfire data:', error);
    return null;
  }
}

// Function to update HTML content with the fetched data
function updateHTMLContent() {
  document.getElementById('totalwildfires').innerText = totalwildfires;
  document.getElementById('totalacresburned').innerText = totalacresburned;
  document.getElementById('totalfatalities').innerText = totalfatalities;
  document.getElementById('totalincidentpersonnel').innerText = totalincidentpersonnel;
  document.getElementById('totalresidencesdestroyed').innerText = totalresidencesdestroyed;
}

document.addEventListener('DOMContentLoaded', function() {
  const stateSelect = document.getElementById('state-select');

  stateSelect.addEventListener('change', async function() {
    const selectedValue = stateSelect.value;
    console.log('Selected State:', selectedValue);

    // Fetch and calculate wildfire data for the selected state or all states if no state is selected
    await fetchWildfireData(selectedValue);
  });

  // Initialize with all states data
  fetchWildfireData('');
});
