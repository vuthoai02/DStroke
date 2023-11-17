import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HostpitalList({navigationName}) {
  const [hospitalList, setHospitalList] = useState([]);
  const navigate = useNavigation();
  const [curPoisition, setCurPoisition] = useState(null);
  const [fetching, setFetching] = useState(false);

  const getHospitals = async () => {
    setFetching(true);
    try {
      const res = await axios.get(
        `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${curPoisition?.latitude}&lon=${curPoisition?.longitude}&limit=100&radius=50000&categorySet=7321&view=Unified&relatedPois=off&key=xbvIy7MHHycAg8ZS72LRLkCkehUV08sw`,
      );
      setHospitalList(
        res.data.results.filter(
          elm =>
            elm?.poi.categories.includes('general') &&
            elm?.poi.name.includes('Bệnh Viện'),
        ),
      );

      setFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      setCurPoisition(pos.coords);
    });
  }, []);
  useEffect(() => {
    if (curPoisition) {
      getHospitals();
    }
  }, [curPoisition]);

  // console.log(hospitalList);

  if (fetching === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Progress.Circle color="gray" size={40} indeterminate={true} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgb(99,184,255)',
      }}>
      {/* {toLocation && (
        <View style={{height: '70%'}}>
          <Map type={'Hospitals'} toLocation={toLocation} />
        </View>
      )} */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {hospitalList ? (
          <>
            {hospitalList.map((elm, index) => (
              <TouchableOpacity
                key={index}
                style={styles.btn}
                onPress={() =>
                  navigate.navigate(navigationName, {
                    lon: elm?.position.lon,
                    lat: elm?.position.lat,
                    hospitalName: elm?.poi.name,
                    address: elm?.address.freeformAddress,
                  })
                }>
                <Text style={styles.text}>{elm?.poi.name}</Text>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  <Icon name="map-marker-alt" size={15} color="#000" />
                  {` ${elm.address?.streetName || ''} ${
                    elm.address?.municipalitySubdivision
                  } ${elm.address?.municipality}`}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text>Không có bệnh viện xung quanh!</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: '600',
  },
  btn: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
});
