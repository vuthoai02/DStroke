import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function PhongNgua() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>1. Vận động thể lực</Text>
        <Text style={styles.text}>
          Vận động thể lực: luyện tập đều đặn hàng ngày, mỗi ngày khoảng 30
          phút. Đi bộ hoặc chạy bộ nhẹ nhàng. Tập dưỡng sinh như thái cực quyền,
          thái cực trường sinh đạo. Yoga là một môn thể dục tốt. Không tập các
          bài tập nặng, gắng sức (tập tạ, tennis).
        </Text>
      </View>
      <View>
        <Text style={styles.title}>2. Bỏ hút thuốc lá</Text>
        <Text style={styles.text}>
          Bỏ hút thuốc lá: thuốc lá là một yếu tố gây xơ vữa động mạch và co
          thắt động mạch rất mạnh. Các hóa chất trong khói thuốc làm tăng phản
          xạ giao cảm, tăng đề kháng insulin (tăng nguy cơ mắc bệnh đái tháo
          đường), béo phì nội tạng và tăng tiến triển của bệnh thận mạn.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>3. Rượu</Text>
        <Text style={styles.text}>
          Rượu: uống vừa phải 20 - 30ml/ngày với loại có nồng độ cồn nhỏ hơn 12.
          Nên nhớ uống quá nhiều sẽ gây hại tim mạch. Chọn rượu vang vì chứa
          nhiều resveratrol có tác dụng bảo vệ tim mạch, chống ung thư (da, r
          uột già, máu) bảo vệ chức năng gan.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>4. Bớt stress</Text>
        <Text style={styles.text}>
          Bớt stress: giữ thái độ tinh thần thích hợp, lạc quan, tránh căng
          thẳng thần kinh, tránh nóng giận.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    padding: 5,
  },
  text: {
    color: 'black',
    textAlign: 'justify',
    lineHeight: 20,
    opacity: 0.7,
  },
});
