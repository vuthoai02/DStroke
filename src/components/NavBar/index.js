import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from '../CustomText';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const nav = [
  {name: 'Home', title: 'Trang chủ', iconName: 'home'},
  {name: 'Medical_services', title: 'Dịch vụ', iconName: 'briefcase-medical'},
  {name: 'Community', title: 'Cộng đồng', iconName: 'rss-square'},
  {name: 'Person', title: 'Cá nhân', iconName: 'user'},
];

function NavBar({currentTab}) {
  const navigate = useNavigation();
  const {authState} = useContext(AuthContext);

  //console.log(authState);

  const goto = name => {
    switch (name) {
      case 'Person':
        if (authState.isAuthenticated === false) {
          navigate.navigate('Login');
          return;
        }
        navigate.navigate('User');
        return;
      case 'Home':
        navigate.navigate('Home');
        return;
      case 'Community':
        navigate.navigate('Community');
        return;
      case 'Medical_services':
        navigate.navigate('Service');
        return;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {nav.map((ele, index) => {
        return (
          <TouchableOpacity
            style={styles.navBtn}
            key={index}
            onPress={() => goto(ele.name)}>
            {/* <Icon size={40} style={styles.icon} name={ele.name} /> */}
            <Icon
              name={ele.iconName}
              size={30}
              color={currentTab === ele.name ? '#CC0099' : '#0099FF'}
            />
            <CustomText
              content={ele.title}
              styles={{color: currentTab === ele.name ? 'black' : 'gray', marginTop:2}}
            />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,
    height: 70,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#fff',
    paddingTop: 5,
    zIndex: 999,
    borderTopColor: '#D3D3D3',
    overflow: 'hidden',
  },
  navBtn: {
    alignItems: 'center',
  },
});

export default NavBar;
