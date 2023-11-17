import React from 'react';
import {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoicHJvMDY1NCIsImEiOiJjbDduZTg2dm8yMHNrNDFwMDc2M3phbHVrIn0.jPzF1FZ5nlZ2mM-Lm4mi_g',
);

function Map({type, ...props}) {
  const {SOSPerson, toLocation, setLocation} = props;
  const [currentLocation, setCurrendLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [geojson, setGeoJson] = useState(null);

  const getRoute = async () => {
    switch (type) {
      case 'SOS':
        if (!SOSPerson.position) {
          return;
        }

        try {
          const res = await axios.get(
            `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${SOSPerson?.position[0]},${SOSPerson?.position[1]};${currentLocation?.longitude},${currentLocation?.latitude}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=pk.eyJ1IjoicHJvMDY1NCIsImEiOiJjbDc5MXBldzQwOTMwM3dybTN3b2diMjFqIn0.cyvlqjYpGTreuhMS5RnJkQ`,
          );
          setRoute(res?.data?.trips[0].geometry.coordinates);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'Hospitals':
        if (!toLocation) {
          return;
        }
        try {
          const res = await axios.get(
            `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${toLocation[0]},${toLocation[1]};${currentLocation?.longitude},${currentLocation?.latitude}?overview=full&source=first&destination=last&roundtrip=false&geometries=geojson&access_token=pk.eyJ1IjoicHJvMDY1NCIsImEiOiJjbDc5MXBldzQwOTMwM3dybTN3b2diMjFqIn0.cyvlqjYpGTreuhMS5RnJkQ`,
          );
          // console.log('res:', res);
          setRoute(res?.data?.trips[0].geometry.coordinates);
          setLocation({
            dis: res?.data?.trips[0].distance,
            dur: res?.data?.trips[0].duration,
          });
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (currentLocation) {
      getRoute();
    }
  }, [currentLocation]);

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

  // console.log(currentLocation);

  switch (type) {
    case 'SOS':
      return (
        <SafeAreaView>
          <MapboxGL.MapView
            style={styles.map}
            zoomEnabled={true}
            userTrackingMode={true}>
            <MapboxGL.UserLocation
              onUpdate={data => setCurrendLocation(data.coords)}
              showsUserHeadingIndicator={true}
            />
            {SOSPerson?.position && (
              <MapboxGL.PointAnnotation
                id="sosPersonPoi"
                title="Nggười thân"
                coordinate={[SOSPerson?.position[0], SOSPerson?.position[1]]}
              />
            )}
            {currentLocation && (
              <MapboxGL.Camera
                centerCoordinate={[
                  currentLocation?.longitude,
                  currentLocation?.latitude,
                ]}
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
    case 'Hospitals':
      return (
        <SafeAreaView>
          <MapboxGL.MapView
            style={styles.map}
            zoomEnabled={true}
            userTrackingMode={true}>
            <MapboxGL.UserLocation
              onUpdate={data => {
                setCurrendLocation(data.coords);
              }}
              showsUserHeadingIndicator={true}
            />
            {toLocation && (
              <MapboxGL.PointAnnotation
                id="sosPersonPoi"
                title="Nggười thân"
                coordinate={[toLocation[0], toLocation[1]]}
              />
            )}
            {currentLocation && (
              <MapboxGL.Camera
                centerCoordinate={[
                  currentLocation?.longitude,
                  currentLocation?.latitude,
                ]}
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
    default:
      return;
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    borderWidth: 1,
  },
});

export default Map;
