import React, {useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {AppState} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import video from '../../assets/images/video.mp4';
import {AuthContext} from '../../context/AuthContext';

function SoCuu({setDisplay, updateSOSStatus}) {
  const windowHeight = Dimensions.get('window').height;
  const {
    authState: {user},
  } = useContext(AuthContext);
  //console.log(user.SOS);
  return (
    <View style={{width: '100%', height: windowHeight, flex: 1, padding: 10}}>
      <ScrollView contentContainerStyle={{height: windowHeight}}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '20%',
              width: Dimensions.get('window').width,
              marginBottom: 10,
              marginTop: 10,
            }}>
            <Video
              source={video}
              paused={false}
              controls={true}
              style={styles.backgroundVideo}
              muted={AppState.currentState === 'background' ? true : false}
            />
          </View>
          <Text style={{color: 'black', fontWeight: '900', fontSize: 24}}>
            Hướng dẫn sơ cứu
          </Text>
          <Text style={{color: 'black', textAlign: 'justify', fontSize: 18}}>
            {'1. Trong thời gian chờ cấp cứu đến thì để phần đầu và lưng củabệnh nhân nằm nghiêng 45 độ so với cơ thể để phòng tránh bị sặc đường thở;\n' +
              '\n2. Mặc quần áo rộng, thoáng, mở phần cổ áo để kiểm tra hô hấp của người bệnh. Trong trường hợp người bệnh ngừng tim thì tiến hành xoa bóp tim ngoài lồng ngực;\n' +
              '\n3. Dùng khăn tay để quấn vào ngón tay trỏ và lấy sạch đờm, dãi trong miệng người bệnh. Trong trường hợp người bệnh bị co giật thì phải lấy chiếc đũa đã được quấn lớp vải để ngáng ngang miệng không cho người bệnh cắn vào lưỡi;\n' +
              '\n4. Ghi chú lại thời điểm người bệnh khởi phát biểu hiện đột quỵ bất thường;\n' +
              '\n5. Ghi chú lại những loại thuốc mà người bệnh đang dùng hoặc mang theo đơn thuốc đang có.\n'}
          </Text>
        </View>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => {
            setDisplay(false);
            if (user.SOS === true) updateSOSStatus(null);
          }}>
          <Icon name="phone-slash" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{color: 'black'}}>Kết thúc</Text>
      </View>
    </View>
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

export default SoCuu;
