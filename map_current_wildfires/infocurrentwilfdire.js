// Declare global variables
let totalWildfires = 0;
let totalAcresBurned = 0;
let totalFatalities = 0;
let totalIncidentPersonnel = 0;
let totalResidencesDestroyed = 0;

// Function to fetch wildfire data and calculate totals
async function fetchWildfireData() {
    // GeoServer WFS URL
    const wfsUrl = 'http://localhost:8080/geoserver/Wildfire/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Wildfire:current_wilfdire&outputFormat=application/json';

    try {
        // Fetch data from GeoServer
        const response = await fetch(wfsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Reset totals before calculation
        totalWildfires = 0;
        totalAcresBurned = 0;
        totalFatalities = 0;
        totalIncidentPersonnel = 0;
        totalResidencesDestroyed = 0;

        // Loop through features and calculate totals
        data.features.forEach((feature) => {
            totalWildfires += 1;
            const acres = feature.properties.CalculatedAcres || 0;
            const fatalities = feature.properties.Fatalities || 0;
            const personnel = feature.properties.TotalIncidentPersonnel || 0;
            const residences = feature.properties.ResidencesDestroyed || 0;

            totalAcresBurned += acres;
            totalFatalities += fatalities;
            totalIncidentPersonnel += personnel;
            totalResidencesDestroyed += residences;
        });

        // Round totals to the nearest integer where necessary
        totalAcresBurned = Math.round(totalAcresBurned);
        totalIncidentPersonnel = Math.round(totalIncidentPersonnel);

        // Log results
        console.log('Total Wildfires:', totalWildfires);
        console.log('Total Acres Burned:', totalAcresBurned);
        console.log('Total Fatalities:', totalFatalities);
        console.log('Total Incident Personnel:', totalIncidentPersonnel);
        console.log('Total Residences Destroyed:', totalResidencesDestroyed);

        // Update HTML content with the fetched data
        updateHTMLContent();

        // Optionally return the calculated values
        return {
            totalWildfires,
            totalAcresBurned,
            totalFatalities,
            totalIncidentPersonnel,
            totalResidencesDestroyed,
        };
    } catch (error) {
        console.error('Error fetching wildfire data:', error);
        return null;
    }
}

// Function to update HTML content with the fetched data
function updateHTMLContent() {
    document.getElementById('totalWildfires').innerText = totalWildfires;
    document.getElementById('totalAcresBurned').innerText = totalAcresBurned;
    document.getElementById('totalFatalities').innerText = totalFatalities;
    document.getElementById('totalIncidentPersonnel').innerText = totalIncidentPersonnel;
    document.getElementById('totalResidencesDestroyed').innerText = totalResidencesDestroyed;
}

// Export function and variables
export default fetchWildfireData;
export { totalWildfires, totalAcresBurned, totalFatalities, totalIncidentPersonnel, totalResidencesDestroyed };
