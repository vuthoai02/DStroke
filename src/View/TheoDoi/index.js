import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RawBottom from '../../components/RawBottom';
import {AuthContext} from '../../context/AuthContext';
import dayjs from 'dayjs';
import Evaluate from './evaluate';
import {UserContext} from '../../context/UserContext';

export default function TheoDoi() {
  const refRBSheet = React.useRef();
  const [list, setList] = React.useState([]);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [listName, setListName] = React.useState(null);
  const [hiddenLabel, setHiddenLabel] = React.useState(false);
  const [note, setNote] = React.useState(null);
  const {
    authState: {user},
    loadUser,
  } = React.useContext(AuthContext);
  const {update} = React.useContext(UserContext);
  const heartList = [
    {
      key: 'tamThu',
      label: 'Áp lực tâm thu',
      value: user?.tamThu,
      type: 'numeric',
    },
    {
      key: 'tamTuong',
      label: 'Áp lực tâm trương',
      value: user?.tamTuong,
      type: 'numeric',
    },
    {
      key: 'heartSpeed',
      label: 'Nhịp tim',
      value: user?.heartSpeed,
      type: 'numeric',
    },
  ];
  const listBottom = [
    {
      key: 'blood_sugar',
      label: 'Đường máu',
      value: user?.daily.blood_sugar,
      icon: 'coffee',
      type: 'numeric',
    },
    {
      key: 'sleepingTime',
      label: 'Số giờ ngủ',
      value: user?.daily.sleepingTime,
      icon: 'bed',
      type: 'numeric',
    },
    {
      key: 'smokingAmount',
      label: 'Số điếu thuốc ',
      value: user?.daily.smoking.amount,
      icon: 'smoking',
      type: 'numeric',
    },
    {
      key: 'chucNangThiGiac',
      label: 'Chức năng thị giác',
      value: user?.daily.chucNangThiGiac,
      icon: '',
      type: 'text',
    },
  ];

  const _update = async payload => {
    try {
      const data = () => {
        if (listName === 'daily') {
          return {
            ...user,
            daily: {
              ...payload,
              smoking: {
                isSmoking: isEnabled,
                amount: isEnabled ? payload?.smokingAmount : 0,
              },
            },
          };
        }
        if (listName === 'dailyFeel') {
          let scorce = 0;
          for (var el in payload) {
            scorce += parseInt(payload[el]);
          }
          return {
            ...user,
            daily: {
              ...user.daily,
              feeling: scorce,
            },
          };
        }
        return payload;
      };
      const param = data();
      const res = await update(param);
      await loadUser();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    loadUser();
  }, []);

  React.useEffect(() => {
    setIsEnabled(user?.daily.smoking.isSmoking);
  }, [user]);

  const values = () => {
    if (listName === 'daily') {
      return user.daily;
    }
    if (listName === 'dailyFeel') {
      return {};
    }
    return user;
  };

  //console.log(user);

  return (
    <View style={styles.container}>
      <Text
        style={{color: '#000', padding: 10, fontWeight: '600', fontSize: 16}}>
        <Icon name="calendar" size={18} color="black" />
        {` Ngày cập nhật: ${dayjs(user?.updateAt).format('DD/MM/YYYY')}`}
      </Text>
      <TouchableOpacity
        style={styles.heart}
        onPress={() => {
          setList(heartList);
          setListName('heart');
          setNote('');
          refRBSheet.current.open();
        }}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
          Huyết áp & Nhịp tim
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="heartbeat" size={70} color="#fff" />
          <Text
            style={{
              color: '#fff',
              padding: 10,
              lineHeight: 20,
            }}>{`Huyết áp: ${user?.tamThu}/${user?.tamTuong} mmhg\nNhịp tim: ${user?.heartSpeed} Bpm`}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.eyeBtn}
        onPress={() => {
          setList(isEnabled ? listBottom : listBottom.slice(0, 2));
          setListName('daily');
          setNote('');
          refRBSheet.current.open();
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Chức năng thị giác:</Text>
        <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
          <Icon name="edit" size={20} color="#000" />
          {user?.daily.chucNangThiGiac}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Bạn có hút thuốc lá?</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '	#00FF00' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
          style={{width: 100}}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {listBottom.slice(0, 3).map(elm => (
          <TouchableOpacity
            key={elm.key}
            style={styles.btnBottom}
            onPress={() => {
              setList(isEnabled ? listBottom : listBottom.slice(0, 2));
              setListName('daily');
              setNote('');
              refRBSheet.current.open();
            }}>
            <Icon name={elm.icon} size={20} color="#fff" />
            <Text>{elm.label}</Text>
            <Text>{elm.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Evaluate
        user={user}
        open={() => refRBSheet.current.open()}
        setList={setList}
        setListName={setListName}
        setHiddenLabel={setHiddenLabel}
        setNote={setNote}
        feeling={{}}
      />
      <RawBottom
        refRBSheet={refRBSheet}
        list={list}
        values={values()}
        _update={_update}
        hiddenLabel={hiddenLabel}
        note={note}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bmiBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  bmiBtn: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 8,
  },
  heart: {
    backgroundColor: '#FF7F50',
    padding: 10,
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 8,
  },
  btnBottom: {
    backgroundColor: '#4682B4',
    padding: 5,
    width: '28%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 8,
  },
  eyeBtn: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
