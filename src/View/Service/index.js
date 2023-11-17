import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import NavBar from '../../components/NavBar';
import Icons from '../../assets/icons/index';
import Background from '../../assets/images/serviceBackground.jpg';

function Service() {
  const navigate = useNavigation();
  const servicesList = [
    {
      key: 'book',
      title: 'Đặt lịch thăm khám',
      advice: '',
      img: Icons.CalendarService,
      link: 'Home',
    },
    {
      key: 'guide',
      title: 'Cẩm nang sức khỏe',
      advice: '',
      img: Icons.BookService,
      link: 'HandBook',
    },
    {
      key: 'insurance',
      title: 'Mua bảo hiểm y tế',
      advice: '',
      img: Icons.Protect,
      link: 'Home',
    },
  ];

  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{height: windowHeight}}>
        <View style={styles.list}>
          <Image source={Background} style={styles.background} />
          <Text style={styles.title}>Dịch vụ</Text>
          {servicesList.map((elm, index) => (
            <TouchableOpacity
              key={index}
              style={styles.servicesBtn}
              onPress={() => navigate.navigate(elm.link)}>
              <Image source={elm.img} style={styles.img} />
              <Text style={styles.text}>{elm.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  p: {
    fontSize: 50,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    width: '100%',
    paddingLeft: 30,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: '900',
  },
  servicesBtn: {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '82%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
    height: '11%',
  },
  text: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  background: {
    width: '80%',
    height: '30%',
  },
  img: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: '5%',
    top: '20%',
  },
});
export default Service;
