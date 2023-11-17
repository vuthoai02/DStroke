import React, {useContext, useEffect, useRef} from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import API_URL from '../../api/constant/index';
import NavBar from '../../components/NavBar';
import {AuthContext} from '../../context/AuthContext';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from '../../assets/icons/index';
import Avatar from '../../assets/images/avatar.png';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const functionsList = [
  {
    key: 'details',
    title: 'Hồ sơ cá nhân',
    link: 'Details',
    img: Icons.Detail,
  },
  {
    key: 'relatives',
    title: 'Danh sách người thân',
    link: 'Relatives',
    img: Icons.Relatives,
  },
];

function User() {
  const {logout, authState, loadUser} = useContext(AuthContext);
  const {update} = useContext(UserContext);
  const navigate = useNavigation();
  const _logout = async () => {
    await logout();
    navigate.navigate('Home');
  };

  const setRole = async () => {
    try {
      const res = await update({
        role: 'doctor',
        workPlace: 'Bệnh Viện Công An Thành Phố Hà Nội',
      });
      if (res.success === true) {
        await loadUser();
        alert('Bạn đã trở thành bác sĩ');
        return;
      }
    } catch (err) {
      console.log(err);
      alert('Thất bại');
    }
  };

  // useEffect(() => {
  //   loadUser();
  // }, []);
  //console.log(authState.user?.role);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{height: HEIGHT}}>
        <View style={styles.background}>
          {authState.user && (
            <View style={{flexDirection: 'row', padding: 10}}>
              <Image source={Avatar} style={{width: 50, height: 50}} />
              <View>
                <Text
                  style={{
                    color: 'black',
                    paddingLeft: 10,
                    fontWeight: '600',
                    fontSize: 20,
                  }}>
                  {authState.user.fullname}
                </Text>
                <Text style={{color: '#888888', paddingLeft: 10}}>
                  {authState?.user.phone}
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {functionsList.map(elm => (
            <TouchableOpacity
              style={styles.btn}
              key={elm.key}
              onPress={() => navigate.navigate(elm.link)}>
              <Image
                source={elm.img}
                style={{width: 40, height: 40, marginLeft: 8}}
              />
              <Text style={styles.text}>{elm.title}</Text>
            </TouchableOpacity>
          ))}
          {authState.user?.role !== 'doctor' && (
            <TouchableOpacity style={styles.btn} onPress={() => setRole()}>
              <Image source={Icons.Doctor} style={{width: 50, height: 50}} />
              <Text style={styles.text}>Trở Thành Bác Sĩ</Text>
            </TouchableOpacity>
          )}
          {authState.user?.role === 'doctor' && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => alert('Chức năng đang được hoàn thiện')}>
              <Image source={Icons.Doctor} style={{width: 50, height: 50}} />
              <Text style={styles.text}>Cập nhật địa chỉ phòng khám</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.btn} onPress={() => _logout()}>
            <Icon
              name="sign-out-alt"
              size={40}
              color="red"
              style={{marginLeft: 8}}
            />
            <Text style={styles.text}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  background: {
    backgroundColor: 'white',
    width: WIDTH,
    height: HEIGHT * 0.5,
  },
  text: {
    color: 'black',
    marginLeft: 15,
  },
  btn: {
    width: WIDTH,
    height: HEIGHT * 0.08,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default User;
