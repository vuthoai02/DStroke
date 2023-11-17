import axios from 'axios';

const calculateDistance = async (source, dist) => {
  if (!source || !dist) return;
  try {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${source[0]}%2C${source[1]}%3B${dist[0]}%2C${dist[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoicHJvMDY1NCIsImEiOiJjbDc5MXBldzQwOTMwM3dybTN3b2diMjFqIn0.cyvlqjYpGTreuhMS5RnJkQ`,
    );
    const distance = res.data?.routes[0].distance;

    if (distance > 1000) {
      return `${(distance / 1000).toFixed(1)} km`;
    } else {
      return `${distance} m`;
    }
  } catch (error) {
    console.log(error);
  }
};

export default calculateDistance;
