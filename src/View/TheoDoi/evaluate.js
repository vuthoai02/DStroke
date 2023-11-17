import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Evaluate({
  open,
  setList,
  setListName,
  setHiddenLabel,
  setNote,
  feeling,
  user,
}) {
  const [state, setState] = React.useState({});
  const evaluateList = [
    {key: 'S1', label: 'Tôi thấy khó mà thoải mái được', value: feeling?.S1},
    {key: 'A2', label: 'Tôi bị khô miệng', value: feeling?.A2},
    {
      key: 'D3',
      label: 'Tôi dường như chẳng có chút cảm xúc tích cực nào',
      value: feeling?.D3,
    },
    {
      key: 'A4',
      label:
        'Tôi bị rối loạn nhịp thở (thở gấp, khó thở dù chẳng làm việc gì nặng)',
      value: feeling?.A4,
    },
    {
      key: 'D5',
      label: 'Tôi thấy khó bắt tay vào công việc',
      value: feeling?.D5,
    },
    {
      key: 'S6',
      label: 'Tôi có xu hướng phản ứng thái quá với mọi tình huống',
      value: feeling?.S6,
    },
    {
      key: 'A7',
      label: 'Tôi bị ra mồ hôi (chẳng hạn như mồ hôi tay…)',
      value: feeling?.A7,
    },
    {
      key: 'S8',
      label: 'Tôi thấy mình đang suy nghĩ quá nhiều',
      value: feeling?.S8,
    },
    {
      key: 'A9',
      label:
        'Tôi lo lắng về những tình huống có thể làm tôi hoảng sợ hoặc biến tôi thành trò cười',
      value: feeling?.A9,
    },
    {
      key: 'D10',
      label: 'Tôi thấy mình chẳng có gì để mong đợi cả',
      value: feeling?.D10,
    },
    {
      key: 'S11',
      label: 'Tôi thấy bản thân dễ bị kích động',
      value: feeling?.S11,
    },
    {key: 'S12', label: 'Tôi thấy khó thư giãn được', value: feeling?.S12},
    {
      key: 'D13',
      label: 'Tôi cảm thấy chán nản, thất vọng',
      value: feeling?.D13,
    },
    {
      key: 'S14',
      label:
        'Tôi không chấp nhận được việc có cái gì đó xen vào cản trở việc tôi đang làm',
      value: feeling?.S14,
    },
    {
      key: 'A15',
      label: 'Tôi thấy mình gần như hoảng loạn',
      value: feeling?.A15,
    },
    {
      key: 'D16',
      label: 'Tôi không thấy hăng hái với bất kỳ việc gì nữa',
      value: feeling?.D16,
    },
    {
      key: 'D17',
      label: 'Tôi cảm thấy mình chẳng đáng làm người',
      value: feeling?.D17,
    },
    {
      key: 'S18',
      label: 'Tôi thấy mình khá dễ phật ý, tự ái',
      value: feeling?.S18,
    },
    {
      key: 'A19',
      label:
        'Tôi nghe thấy rõ tiếng nhịp tim dù chẳng làm việc gì cả (ví dụ, tiếng nhịp tim tăng, tiếng tim loạn nhịp)',
      value: feeling?.A19,
    },
    {key: 'A20', label: 'Tôi hay sợ vô cớ', value: feeling?.A20},
    {key: 'D21', label: 'Tôi hay sợ vô cớ', value: feeling?.D21},
  ];

  const note =
    'Mức độ đánh giá (Nhập các thang điểm tương ứng sau):\n0: Không đúng với tôi chút nào cả\n1: Đúng với tôi phần nào, hoặc thỉnh thoảng mới đúng\n2: Đúng với tôi phần nhiều, hoặc phần lớn thời gian là đúng\n3: Hoàn toàn đúng với tôi, hoặc hầu hết thời gian là đúng';

  React.useEffect(() => {
    const s = evaluateState(user?.daily.feeling * 2);
    setState(s);
  }, [user]);

  // console.log(user);

  return (
    <View style={styles.evaluate}>
      <Text style={{color: '#00868B', fontSize: 20, fontWeight: '600'}}>
        Đánh giá trạng thái
      </Text>
      <View>
        {user?.daily.feeling ? (
          <>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Điểm đánh giá: {user?.daily.feeling * 2}
            </Text>
            <Text style={{color: 'black'}}>
              {`- Mức độ trầm cảm: ${state?.tramcam}\n\n- Mức độ lo âu: ${state?.loau}\n\n- Mức độ stress: ${state?.stress}\n`}
            </Text>
          </>
        ) : (
          <>
            <Icon name="exclamation-triangle" size={70} color="gray" />
            <Text style={{color: 'gray'}}>Hãy cập nhật thông tin đầy đủ!</Text>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            setList(evaluateList);
            setListName('dailyFeel');
            setHiddenLabel(true);
            setNote(note);
            open();
          }}
          style={{
            backgroundColor: 'green',
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            Thực hiện đánh giá mới
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  evaluate: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#20B2AA',
  },
});

const evaluateState = feeling => {
  console.log(feeling);
  const state = {
    loau: 'Bình thường',
    stress: 'Bình thường',
    tramcam: 'Bình thường',
  };
  if (feeling >= 9 && feeling <= 18) {
    state.tramcam = feeling >= 10 && feeling <= 13 ? 'Nhẹ' : state.tramcam;
    state.loau = feeling === 8 || feeling === 9 ? 'Nhẹ' : state.loau;
    state.stress = feeling >= 15 && feeling <= 18 ? 'Nhẹ' : state.stress;
  }
  if (feeling >= 10 && feeling <= 25) {
    state.tramcam = feeling >= 14 && feeling <= 20 ? 'Vừa' : state.tramcam;
    state.loau = feeling >= 10 && feeling <= 14 ? 'Vừa' : state.loau;
    state.stress = feeling >= 19 && feeling <= 25 ? 'Vừa' : state.stress;
  }
  if (feeling >= 15 && feeling <= 33) {
    state.tramcam = feeling >= 21 && feeling <= 27 ? 'Nặng' : state.tramcam;
    state.loau = feeling >= 15 && feeling <= 19 ? 'Nặng' : state.loau;
    state.stress = feeling >= 26 && feeling <= 33 ? 'Nặng' : state.stress;
  }
  if (feeling >= 20) {
    state.tramcam = feeling >= 28 ? 'Rất nặng' : state.tramcam;
    state.loau = feeling >= 20 ? 'Rất nặng' : state.loau;
    state.stress = feeling >= 34 ? 'Rất nặng' : state.stress;
  }
  console.log(state);
  return state;
};
