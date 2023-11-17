import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function PhongNgua() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Sức khỏe tim mạch, cân nặng và đột quỵ có mối liên hệ chặt chẽ với nhau.
        Do đó, những thực phẩm có khả năng giúp chúng ta duy trì cân nặng hợp
        lý, hạn chế nguy cơ mắc bệnh tim mạch, đái tháo đường,… có thể giúp hỗ
        trợ phòng ngừa đột quỵ hiệu quả. Nếu bạn chưa biết nên ăn gì phòng ngừa
        đột quỵ, dưới đây là những thực phẩm bạn nên tham khảo:
      </Text>
      <View>
        <Text style={styles.title}>1. Cá hồi</Text>
        <Text style={styles.text}>
          Cá hồi có hàm lượng axit béo omega-3 cao, giúp kiểm soát huyết áp và
          giảm cholesterol xấu bên trong cơ thể. Thường xuyên ăn cá hồi có thể
          tăng cường sức khỏe tim mạch, giảm nguy cơ đột quỵ. Bên cạnh cá hồi,
          bạn có thể dùng thêm một số loại cá béo lành tính khác như cá trích,
          cá ngừ, cá thu,…
        </Text>
      </View>
      <View>
        <Text style={styles.title}>2. Các loại rau màu xanh đậm</Text>
        <Text style={styles.text}>
          {
            'Thực phẩm phòng ngừa đột quỵ nào nên ăn? Để trả lời cho câu hỏi này,bạn nên cân nhắc ưu tiên các loại rau xanh trong chế độ dinh dưỡnghàng ngày. Rau xanh ít chất béo và calo nhưng lại giàu chất xơ cũngnhư các chất dinh dưỡng khác, bao gồm vitamin A, vitamin C, kai,folate,… \nĂn các loại rau màu xanh đậm có thể giúp kiểm soát cân nặngvà duy trì sức khỏe tim mạch, giữ cho huyết áp ở mức ổn định và hạn chế nguy cơ đột quỵ. Một số loại rau xanh tốt cho sức khỏe mà bạn cóthể lựa chọn bao gồm cải xoăn, rau muống, rau bina,….'
          }
        </Text>
      </View>
      <View>
        <Text style={styles.title}>3. Các loại đậu</Text>
        <Text style={styles.text}>
          Ăn gì phòng ngừa đột quỵ tốt? Nên ưu tiên các loại thực phẩm giàu
          protein và ít chất béo. Các loại đậu, chẳng hạn như đậu đen, đậu Hà
          Lan chính là nguồn cung cấp protein và chất xơ vô cùng dồi dào nhưng
          lại có hàm lượng chất béo cực thấp. Do đó, thường xuyên ăn các loại
          đậu giúp bạn kiểm soát nguy cơ đột quỵ tốt hơn.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>4. Cà chua</Text>
        <Text style={styles.text}>
          Các món ăn có chứa cà chua thường nằm trong danh sách món ăn phòng
          ngừa đột quỵ bởi cà chua có thể giúp giảm nguy cơ đột quỵ do thiếu máu
          cục bộ – tắc nghẽn động mạch não. Lycopene có trong cà chua không chỉ
          là một chất chống ung thư mà còn bảo vệ các tế bào não khỏi sự tổn
          thương do oxy hóa. Hơn nữa, cà chua còn đóng vai trò giảm huyết áp đối
          với những người thường xuyên bị huyết áp cao – nguyên nhân dẫn đến đột
          quỵ hàng đầu hiện nay.
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
