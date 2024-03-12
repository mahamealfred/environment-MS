const fetch = require('node-fetch');

export const getLatLong = async(address)=> {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Failed to geocode address');
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw error;
  }
}

// Example usage
const address = '1600 Amphitheatre Parkway, Mountain View, CA';
getLatLong(address)
  .then(coords => console.log('Latitude:', coords.latitude, 'Longitude:', coords.longitude))
  .catch(error => console.error('Error:', error.message));