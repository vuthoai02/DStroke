import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import avatar from '../../assets/images/avatar.png';
import {Formik} from 'formik';
import {useState, useContext, useRef} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {UserContext} from '../../context/UserContext';
import * as Progress from 'react-native-progress';
import {useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

const inputs = [
  {name: 'fullname', label: 'Họ và tên'},
  {
    name: 'sex',
    label: 'Giới tính',
    type: 'sexCheckBox',
    data: ['Nam', 'Nữ'],
  },
  {name: 'phone', label: 'Số điện thoại'},
  {name: 'birthOfDate', label: 'Ngày sinh', type: 'date'},
];

export default function HoSoCaNhan() {
  const [gioiTinh, setGioiTinh] = useState(user?.sex);
  const [fetching, setFetching] = useState(false);
  const [edit, setEdit] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {
    authState: {user},
    loadUser,
  } = useContext(AuthContext);
  const [bod, setBod] = useState(user?.birthOfDate || '');

  const {update} = useContext(UserContext);

  // useEffect(() => {
  //   loadUser();
  // }, []);

  const _update = async payload => {
    setFetching(true);
    //console.log(payload);
    try {
      const res = await update({...payload, sex: gioiTinh, birthOfDate: bod});
      if (res.success === false) {
        Alert.alert('Cập nhật không thành công');
        return;
      }
      Alert.alert('Cập nhật thành công');
      await loadUser();
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <Formik onSubmit={values => _update(values)} initialValues={user}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => {
          return (
            <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
              {inputs.map((input, index) => {
                if (input?.type === 'sexCheckBox') {
                  return (
                    <View style={styles.checkBox} key={index}>
                      <Text style={{color: 'black', fontSize: 20}}>
                        Giới tính:{' '}
                      </Text>

                      <SelectDropdown
                        buttonStyle={{
                          borderRadius: 10,
                          borderWidth: 1,
                          backgroundColor: 'white',
                        }}
                        data={input.data}
                        onSelect={(selectedItem, index) => {
                          setGioiTinh(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                        defaultButtonText={user?.sex || 'Chọn giới tính'}
                      />
                    </View>
                  );
                }
                if (input.type === 'date') {
                  return (
                    <View key={index} style={styles.inputView}>
                      <Text style={styles.label}>{input.label}</Text>
                      <Text
                        style={{
                          ...styles.input,
                          height: 50,
                          paddingTop: 15,
                          fontSize: 15,
                        }}
                        onPress={() => setShowDatePicker(true)}>
                        {bod}
                      </Text>

                      <DateTimePickerModal
                        isVisible={showDatePicker}
                        mode="date"
                        display="spinner"
                        onConfirm={date => {
                          setShowDatePicker(false);
                          setBod(dayjs(date).format('DD/MM/YYYY'));
                        }}
                        onCancel={() => setShowDatePicker(false)}
                      />
                    </View>
                  );
                }
                return (
                  <View style={styles.inputView} key={index}>
                    <Text style={styles.label}>{input.label}</Text>

                    <TextInput
                      style={styles.input}
                      value={values?.[input.name]}
                      editable={edit}
                      onChangeText={handleChange(input.name)}
                      onBlur={handleBlur(input.name)}
                    />
                  </View>
                );
              })}
              <View style={styles.bottom}>
                {fetching === false && (
                  <Button
                    style={styles.btn}
                    title="Cập nhật"
                    onPress={handleSubmit}
                  />
                )}
                {fetching === true && (
                  <View style={styles.btn}>
                    <Progress.Circle
                      color="white"
                      size={30}
                      indeterminate={true}
                    />
                  </View>
                )}
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    marginBottom: 15,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    position: 'absolute',
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  label: {
    position: 'absolute',
    top: -15,
    left: 10,
    zIndex: 10,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    color: 'black',
  },
  inputView: {
    width: 306,
    height: 45,
    marginBottom: 40,
  },
  bottom: {
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  btn: {
    backgroundColor: '#2B7FFF',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 999,
  },
  checkBox: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    width: 306,
    height: 45,
    justifyContent: 'space-between',
  },
});
