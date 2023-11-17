import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import FlatList from '../../components/FlatList/FlatList';

import Icons from '../../assets/icons/index';

const {width, height} = Dimensions.get('window');

export default function CamNang() {
  const handBookList = [
    {
      key: 'food',
      title: 'Ăn uống',
      link: 'Food',
      img: Icons.Food,
      contex:
        'Ăn gì phòng ngừa đột quỵ là vấn đề được nhiều người quan tâm vì nguy cơ đột quỵ đang có xu hướng tăng cao và trẻ hóa. Nếu bạn cũng quan tâm vấn đề này, hãy thử tham khảo các nhóm thực phẩm có thể giúp hỗ trợ phòng ngừa đột quỵ.',
    },
    {
      key: 'sleep',
      title: 'Nghỉ ngơi',
      link: 'Sleep',
      img: Icons.Night,
      contex:
        'Giấc ngủ là hoạt động sinh lý quan trọng, giúp cơ thể nghỉ ngơi và sức khỏe hồi phục. Vì vậy, nếu mắc phải tình trạng rối loạn giấc ngủ, mất ngủ sẽ làm giảm hiệu suất công việc, giảm tập trung, gây nhiều phiền toái đến công việc, cuộc sống.',
    },
    {
      key: 'firstAid',
      title: 'Hướng dẫn sơ cứu',
      link: 'FirstAid',
      img: Icons.FirstAid,
      contex:
        'Sơ cứu đúng cách đột quỵ não sẽ đảm bảo an toàn cho người bệnh trước khi nhận được sự hỗ can thiệp y tế từ đội ngũ bác sĩ, giảm nguy cơ để lại biến chứng nặng nề.',
    },
    {
      key: 'know',
      title: 'Dấu hiệu nhận biết',
      link: 'Know',
      img: Icons.Stroke,
      contex:
        'Nhận biết đột quỵ ngay từ sớm chính là yếu tố then chốt để gia tăng cơ hội chữa trị và phục hồi cho người bệnh.',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <Text style={{textAlign: 'center', padding: 5, fontWeight: '600'}}>
          Trang bị kiến thức ngay để phòng chống đột quỵ
        </Text>
        <FlatList data={handBookList} he={'96%'} />
      </View>
      <View style={{width: '100%', marginTop: 20}}>
        <Text
          style={{
            color: 'black',
            padding: 20,
            fontWeight: '900',
            fontSize: 24,
          }}>
          Các thông tin liên quan
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  select: {
    // width: '90%',
    height: height * 0.7,
    backgroundColor: '#1E90FF',
    // marginTop: 20,
    justifyContent: 'center',
    // borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
});
