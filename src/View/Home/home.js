import React, {useState, useContext, useEffect} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  AppState,
} from 'react-native';

import NavBar from '../../components/NavBar';
import {styles} from './styles';
import CustomSlider from '../../components/slider';
import Geolocation from '@react-native-community/geolocation';
import Icons from '../../assets/icons/index';
import {AuthContext} from '../../context/AuthContext';
import {UserContext} from '../../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SOS from '../SOSView';
import Banner from '../../assets/banners/index';
import FlatList from '../../components/FlatList/FlatList';
import SoCuu from '../../components/SoCuu/soCuu';
import xetNghiemImage from '../../assets/images/xetnghiem.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handBookList = [
  {
    key: 'xetNghiem',
    title: 'Xét nghiệm tại nhà',
    link: 'XetNghiem',
    img: xetNghiemImage,
    contex:
      'Nếu bạn cũng quan tâm vấn đề này, các gói xét nghiệm tại nhà của chúng tôi.',
  },
  {
    key: 'resulxn',
    title: 'Kết quả xét nghiệm',
    link: 'Sleep',
    img: Icons.KetQua,
    contex:
      'Kết quả xét nghiệm sẽ được đưa ra nhanh chóng, không đi đâu xa ngay tại đây.',
  },
];

const servicesList = [
  {key: 'consulting', title: 'Tư vấn', img: Icons.TuVan, link: 'Consulting'},
  {key: 'map', title: 'Bệnh viện', img: Icons.Map, link: 'Hospitals'},
  {key: 'handBook', title: 'Cẩm nang', img: Icons.Book, link: 'HandBook'},
  {key: 'khaoSat', title: 'Khảo sát', img: Icons.Survey, link: 'Home'},
  {key: 'recover', title: 'Phục hồi', img: Icons.PhucHoi, link: 'Recover'},
  {key: 'booking', title: 'Đặt lịch', img: Icons.CalendarService, link: 'Home'},
];

function Home() {
  const navigate = useNavigation();
  const [curPoisition, setCurPoisition] = useState({});
  //const [calling, setCalling] = useState(false);
  const [isUpdatePoi, setIsUpdatePoi] = useState(false);
  const [displaySoCuu, setDisplaySoCuu] = useState(false);
  const [link, setLink] = useState(null);
  const [_user, setUser] = useState({});

  const {
    updateSOSStatus,
    sosStatus,
    authState: {user},
  } = useContext(AuthContext);
  const {displaySOSView} = useContext(UserContext);

  //console.log(user?.onesignalIdRelationship);

  const Call = async type => {
    Linking.openURL('tel:0824775054');
    if (!user && type === 'press') {
      navigate.navigate('Login');
      return;
    }
    setDisplaySoCuu(true);
    //setCalling(!calling);
    setIsUpdatePoi(!isUpdatePoi);
    await updateSOSStatus([curPoisition.longitude, curPoisition.latitude]);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      setCurPoisition(pos.coords);
    });
  }, [isUpdatePoi]);

  // const getDeepLink = async () => {
  //   const deepLink = await Linking.getInitialURL();
  //   setLink(deepLink?.split('//')[1]);
  // };
  // useEffect(() => {
  //   const change = AppState.addEventListener('change', async () => {
  //     if (AppState.currentState === 'active') {
  //       await getDeepLink();
  //     }
  //   });

  //   return () => change.remove();
  // }, []);
  // console.log('link: ', link);

  // useEffect(() => {
  //   if (link) {
  //     Call();
  //   }
  // }, [link]);

  const goto = route => {
    if (!user) {
      navigate.navigate('Login');
      return;
    }
    navigate.navigate(route);
  };

  if (sosStatus === true && displaySOSView === true) {
    return <SOS />;
  }

  if (displaySoCuu === true) {
    return (
      <SoCuu setDisplay={setDisplaySoCuu} updateSOSStatus={updateSOSStatus} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => navigate.navigate('Follow')}>
            <Text
              style={{color: '#fff', textAlign: 'center', fontWeight: '600'}}>
              Theo dõi sức khỏe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messBtn}
            onPress={() => goto('Conversations')}>
            <Icon name="facebook-messenger" size={27} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellBtn}>
            <Icon name="bell" size={27} color="#fff" />
          </TouchableOpacity>
          <ImageBackground
            source={require('../../assets/images/homeImage.png')}
            style={styles.headerBgImage}
          />
        </View>

        {/* body */}
        <View style={styles.body}>
          <TouchableOpacity onPress={() => Call('press')}>
            <Image source={Icons.Calling} style={styles.call} />
          </TouchableOpacity>
          <View style={styles.services}>
            {servicesList.map(elem => (
              <TouchableOpacity
                key={elem.key}
                style={styles.serviceBtn}
                onPress={() => navigate.navigate(elem.link)}>
                <ImageBackground source={elem.img} style={styles.serviceImg} />
                <Text style={styles.text}>{elem.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Image source={Icons.ServiceBanner} style={styles.serviceBanner} />
        </View>
        <View style={{paddingBottom: 20}}>
          <FlatList data={handBookList} he={300} />
        </View>
        <CustomSlider bannerList={Banner.bannerList} />
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
}

export default Home;
