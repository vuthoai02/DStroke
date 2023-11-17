import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Map from '../../components/Map/map';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MapView({route, navigation}) {
  const {lon, lat, hospitalName, address} = route.params;
  const [location, setLocation] = useState(null);
  const [disDur, setDisDur] = useState({
    dis: '0 m',
    dur: '0 phút',
  });

  useEffect(() => {
    if (location) {
      const dis =
        location?.dis > 1000
          ? `${(location?.dis / 1000).toFixed(1)} km`
          : `${location?.dis} m`;
      const dur =
        location?.dur < 3600
          ? `${(location?.dur / 60).toFixed(1)} phút`
          : `${(location?.dur / 360).toFixed(1)} giờ`;
      setDisDur({dis, dur});
    }
  }, [location]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{position: 'relative'}}>
        <Map
          type={'Hospitals'}
          toLocation={[lon, lat]}
          setLocation={setLocation}
        />
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.boxInfor}>
          <Icon name="ruler-horizontal" size={30} color="gray" />
          <Text style={{color: 'black'}}>Khoảng cách: {disDur?.dis}</Text>
        </View>
        <View style={styles.boxInfor}>
          <Icon name="clock" size={30} color="gray" />
          <Text style={{color: 'black'}}>Thời gian: {disDur?.dur}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    width: '90%',
    height: '12%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: 18,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#888888',
    fontSize: 14,
  },
  boxInfor: {
    alignItems: 'center',
  },
});
