import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

import video from '../../../assets/images/video.mp4';

const windowHeight = Dimensions.get('window').height;

export default function SoCuu() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{height: windowHeight}}>
        <View style={{padding: 10, flex: 1}}>
          <View
            style={{
              height: '20%',
              width: '100%',
              marginBottom: 10,
              marginTop: 10,
            }}>
            <Video
              source={video}
              paused={false}
              controls={true}
              style={styles.backgroundVideo}
            />
          </View>
          <Text style={{color: 'black', textAlign: 'justify', fontSize: 16}}>
            {'1. Trong thời gian chờ cấp cứu đến thì để phần đầu và lưng củabệnh nhân nằm nghiêng 45 độ so với cơ thể để phòng tránh bị sặc đường thở;\n' +
              '\n2. Mặc quần áo rộng, thoáng, mở phần cổ áo để kiểm tra hô hấp của người bệnh. Trong trường hợp người bệnh ngừng tim thì tiến hành xoa bóp tim ngoài lồng ngực;\n' +
              '\n3. Dùng khăn tay để quấn vào ngón tay trỏ và lấy sạch đờm, dãi trong miệng người bệnh. Trong trường hợp người bệnh bị co giật thì phải lấy chiếc đũa đã được quấn lớp vải để ngáng ngang miệng không cho người bệnh cắn vào lưỡi;\n' +
              '\n4. Ghi chú lại thời điểm người bệnh khởi phát biểu hiện đột quỵ bất thường;\n' +
              '\n5. Ghi chú lại những loại thuốc mà người bệnh đang dùng hoặc mang theo đơn thuốc đang có.\n'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
