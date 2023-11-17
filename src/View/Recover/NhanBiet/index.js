import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import KnowStroke from '../../../assets/images/knowStroke.jpg';

const windowHeight = Dimensions.get('window').height;

export default function NhanBiet() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Text style={styles.title}>1. Đột quỵ là gì?</Text>
          <Text style={styles.text}>
            {
              'Đột quỵ còn được gọi là tai biến mạch máu não. Đây là tình trạng não bộ bị tổn thương nghiêm trọng do quá trình cấp máu não bị gián đoạn hoặc giảm đáng kể khiến não bộ bị thiếu oxy, không đủ dinh dưỡng để nuôi các tế bào. Trong vòng vài phút nếu không được cung cấp đủ máu các tế bào não sẽ bắt đầu chết.\nDo đó, người bị đột quỵ cần được cấp cứu ngay lập tức, thời gian kéo dài càng lâu, số lượng tế bào não chết càng nhiều sẽ ảnh hưởng lớn tới khả năng vận động và tư duy của cơ thể, thậm chí là tử vong. Hầu hết những người sống sót sau cơn đột quỵ đều có sức khỏe suy yếu hoặc mắc các di chứng như: tê liệt hoặc cử động yếu một phần cơ thể, mất ngôn ngữ, rối loạn cảm xúc, thị giác suy giảm...\n'
            }
          </Text>
          <Text style={styles.text}>
            {
              'Có 2 loại đột quỵ là đột quỵ do thiếu máu và đột quỵ do xuất huyết\n\t- Đột quỵ do thiếu máu cục bộ: Chiếm khoảng 85% tổng số các ca bị đột quỵ hiện nay. Đây là tình trạng đột quỵ do các cục máu đông làm tắc nghẽn động mạch, cản trở quá trình máu lưu thông lên não.\n\t- Đột quỵ do xuất huyết: Đột quỵ do xuất huyết là tình trạng mạch máu đến não bị vỡ khiến máu chảy ồ ạt gây xuất huyết não. Nguyên nhân khiến mạch máu vỡ là do thành động mạch mỏng yếu hoặc xuất hiện các vết nứt, rò rỉ.'
            }
          </Text>
          <Image source={KnowStroke} style={{width: 350, height: 250}} />
        </View>
        <View>
          <Text style={styles.title}>2. Nguyên nhân gây đột quỵ là gì?</Text>
          <Text style={styles.text}>
            {
              '- Tuổi tác: Bất cứ ai cũng có nguy cơ bị đột quỵ. Tuy nhiên, người già có nguy cơ đột quỵ cao hơn người trẻ. Kể từ sau tuổi 55, cứ mỗi 10 năm, nguy cơ bị đột quỵ lại tăng lên gấp đôi.\n- Giới tính: Nam giới có nguy cơ bị đột quỵ cao hơn nữ giới.\n- Tiền sử gia đình: Người có người thân trong gia đình từng bị đột quỵ có nguy cơ bị đột quỵ cao hơn người bình thường.\n- Đái tháo đường: Các vấn đề liên quan đến đái tháo đường có khả năng làm tăng nguy cơ đột quỵ.\n- Cao huyết áp: Cao huyết áp gây gia tăng sức ép lên thành động mạch, lâu dần khiến thành động mạch bị tổn thương dẫn đến xuất huyết não. Ngoài ra, cao huyết áp còn tạo điều kiện cho các cục máu đông hình thành, cản trở quá trình lưu thông máu lên não. Khám huyết áp là một trong những biện pháp để tìm ra nguyên nhân đột quỵ.'
            }
          </Text>
        </View>
        <View>
          <Text style={styles.title}>3. Dấu hiệu đột quỵ</Text>
          <Text style={styles.text}>
            {
              '- Cơ thể mệt mỏi, đột nhiên cảm thấy không còn sức lực, tê cứng mặt hoặc một nửa mặt, nụ cười bị méo mó.\n- Cử động khó hoặc không thể cử động chân tay, tê liệt một bên cơ thể. Dấu hiệu đột quỵ chính xác nhất là không thể nâng hai cánh tay qua đầu cùng một lúc.\n- Khó phát âm, nói không rõ chữ, bị dính chữ, nói ngọng bất thường. Bạn có thể thực hiện phép thử bằng cách nói những câu đơn giản và yêu cầu người bệnh nhắc lại, nếu không thể nhắc lại được thì người bệnh đó đang có những dấu hiệu đột quỵ.\n- Hoa mắt, chóng mặt, người mất thăng bằng đột ngột, không phối hợp được các hoạt động.\n- Thị lực giảm, mắt mờ, không nhìn rõ\n- Đau đầu dữ dội, cơn đau đầu đến rất nhanh, có thể gây buồn nôn hoặc nôn'
            }
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
