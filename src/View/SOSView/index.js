import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Map from '../../components/Map/index';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../context/UserContext';
import SoCuu from '../../components/SoCuu/soCuu';

function SOS(props) {
  const {SOSPerson, updateSOSStatus} = useContext(AuthContext);
  const {setDisplaySOSView} = useContext(UserContext);
  const [sosAddress, setSosAddress] = useState(null);
  const {patient, setPatient} = props;
  const [location, setLocation] = useState(null);
  const [disDur, setDisDur] = useState({
    dis: '0 m',
    dur: '0 phút',
  });
  const [displaySoCuu, setDisplaySoCuu] = useState(false);

  const getSOSLocation = async () => {
    if (!SOSPerson.position) {
      return;
    }
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${SOSPerson?.position[1]}&lon=${SOSPerson?.position[0]}&apiKey=4f1a9f8a41e045259feef524825a13b1`,
      );
      setSosAddress(res.data.features[0].properties.formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSOSLocation();
  }, [SOSPerson]);

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
    <>
      {displaySoCuu === true ? (
        <SoCuu setDisplay={setDisplaySoCuu} updateSOSStatus={null} />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={{height: '100%', position: 'relative'}}>
            {SOSPerson && (
              <Map dist={SOSPerson.position} setLocation={setLocation} />
            )}
          </View>
          <TouchableOpacity
            style={styles.back}
            onPress={() => setDisplaySOSView(false)}>
            <Icon name="arrow-left" size={20} color="gray" />
          </TouchableOpacity>
          <View style={styles.addressContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
              }}>
              <View style={styles.boxInfor}>
                <Icon name="ruler-horizontal" size={30} color="gray" />
                <Text style={{color: 'black'}}>Khoảng cách: {disDur?.dis}</Text>
              </View>
              <View style={styles.boxInfor}>
                <Icon name="clock" size={30} color="gray" />
                <Text style={{color: 'black'}}>Thời gian: {disDur?.dur}</Text>
              </View>
            </View>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>Bệnh nhân: </Text>
              {SOSPerson?.fullname}
            </Text>
            <Text style={styles.text}>
              <Icon name="map-marker-alt" size={20} color="rgb(99,184,255)" />
              {sosAddress}
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setDisplaySoCuu(true)}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 18,
                  alignItems: 'center',
                }}>
                Sơ cứu
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    width: '90%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    left: 18,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxInfor: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 17,
    width: '88%',
  },
  btn: {
    backgroundColor: '#6BCC69',
    borderRadius: 20,
    height: 35,
    justifyContent: 'space-around',
    width: '45%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  callBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: 'gray',
  },
});

export default SOS;
