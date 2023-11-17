import React from 'react';
import {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoicHJvMDY1NCIsImEiOiJjbDduZTg2dm8yMHNrNDFwMDc2M3phbHVrIn0.jPzF1FZ5nlZ2mM-Lm4mi_g',
);

function Map({dist, setLocation, ...props}) {
  const [geojson, setGeoJson] = useState(null);
  const [source, setSource] = useState(null);
  const [route, setRoute] = useState(null);
  const getRoute = async () => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${dist[0]},${dist[1]};${source?.longitude},${source?.latitude}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=pk.eyJ1IjoicHJvMDY1NCIsImEiOiJjbDc5MXBldzQwOTMwM3dybTN3b2diMjFqIn0.cyvlqjYpGTreuhMS5RnJkQ`,
      );
      //console.log('res:', res);
      setRoute(res?.data?.trips[0].geometry.coordinates);
      setLocation({
        dis: res?.data?.trips[0].distance,
        dur: res?.data?.trips[0].duration,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (source) {
      getRoute();
    }
  }, [source]);

  useEffect(() => {
    const geojsonValue = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route,
      },
    };
    setGeoJson(geojsonValue);
  }, [route]);

  return (
    <SafeAreaView>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        userTrackingMode={true}>
        <MapboxGL.UserLocation
          onUpdate={data => setSource(data.coords)}
          showsUserHeadingIndicator={true}
        />
        {dist && (
          <MapboxGL.PointAnnotation
            id="sosPersonPoi"
            title="Nggười thân"
            coordinate={[dist[0], dist[1]]}
          />
        )}
        {source && (
          <MapboxGL.Camera
            centerCoordinate={[source?.longitude, source?.latitude]}
            zoomLevel={12}
            followUserLocation={true}
            followZoomLevel={12}
          />
        )}

        {geojson?.geometry.coordinates !== null && (
          <MapboxGL.ShapeSource id="polylineLayer" shape={geojson}>
            <MapboxGL.LineLayer
              id="lineLayer"
              style={{
                lineColor: 'red',
                lineWidth: 3.2,
                lineCap: MapboxGL.LineJoin.Round,
                lineOpacity: 1.84,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});

export default Map;
