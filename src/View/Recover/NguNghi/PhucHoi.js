import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function PhucHoi() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Đột quỵ là một vấn đề sức khỏe nguy hiểm, biến chứng lâu dài, thời
          gian phục hồi chậm. Do đó, không chỉ quan tâm ăn gì phòng ngừa đột quỵ
          mà người bệnh cũng nên tìm hiểu sau khi đột quỵ nên ăn gì để mau phục
          hồi. Theo đó, người bệnh sau đột quỵ nên tham khảo các gợi ý dưới đây:
        </Text>
      </View>
      <View>
        <Text style={styles.title}>1. Ăn nhiều loại thức ăn mỗi ngày</Text>
        <Text style={styles.text}>
          Người bệnh nên đa dạng hóa các loại thực phẩm bởi một loại không thể
          cung cấp đầy đủ toàn bộ các chất dinh dưỡng. Mỗi chất sẽ đóng vai trò
          khác nhau đối với sự phục hồi sau đột quỵ. Do đó, tốt nhất nên thay
          đổi các loại thức ăn và chú ý ăn nhiều loại thức ăn hơn.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>
          2. Ăn ít nhất 5 loại trái cây và rau quả mỗi ngày
        </Text>
        <Text style={styles.text}>
          Người bị đột quỵ và người chưa bị nhưng muốn tìm hiểu ăn gì phòng ngừa
          đột quỵ nên cố gắng bổ sung 5 loại rau củ quả và trái cây vào trong
          chế độ dinh dưỡng của mình mỗi ngày. Bạn có thể ăn các loại rau sống,
          rau luộc, canh, uống nước ép trái cây nếu khó nuốt hoặc ăn trái cây
          tươi đều được, miễn sao đảm bảo tối thiểu 5 loại trái cây và rau củ
          quả trong một ngày.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>3. Chọn thức ăn nhiều màu sắc</Text>
        <Text style={styles.text}>
          Chế độ ăn cầu vồng là một chế độ ăn uống tốt cho sức khỏe, đặc biệt là
          những người vừa bị đột quỵ hoặc muốn tìm thực phẩm phòng ngừa đột quỵ.
          Theo chế độ ăn này, bạn nên kết hợp các loại rau củ, trái cây nhiều
          màu sắc với nhau, bao gồm: nhóm thực vật màu đỏ – màu cam và vàng –
          màu xanh – màu xanh dương và tím. Mỗi nhóm thực phẩm sẽ giúp bổ sung
          từng loại dưỡng chất khác nhau, giúp cơ thể được bổ sung nhiều dưỡng
          chất từ chế độ ăn này.
        </Text>
      </View>
      <View>
        <Text style={styles.title}>
          4. Hạn chế chất béo bão hòa, thực phẩm giàu cholesterol
        </Text>
        <Text style={styles.text}>
          Cholesterol xấu tăng cao là một trong những nguyên nhân dẫn đến đột
          quỵ cao nhất. Với câu hỏi ăn gì để chống đột quỵ tái phát, các bác sĩ
          thường khuyên người bệnh nên hạn chế các loại thực phẩm chứa nhiều
          chất béo bão hòa hoặc cholesterol để giảm nguy cơ tái phát đột quỵ.
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
