import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DanhBa() {
  const {getRelationships, userRelationships, addPhone} =
    useContext(AuthContext);
  const [payload, setPayload] = useState(null);

  const onTextChange = (text, name) => {
    setPayload({...payload, [name]: text});
  };

  useEffect(() => {
    getRelationships();
  }, []);

  const addPhoneNumber = async () => {
    const res = await addPhone(payload);
    Alert.alert(res?.message);
    getRelationships();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm số</Text>
      <View style={styles.boxInput}>
        <TextInput
          style={styles.input}
          placeholder={'Thêm số điện thoại'}
          keyboardType={'numeric'}
          onChangeText={text => onTextChange(text, 'phoneNumber')}
          value={payload?.phoneNumber}
          placeholderTextColor="#888888"
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => {
            addPhoneNumber();
            setPayload(null);
          }}>
          <Icon name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Danh sách</Text>
      {userRelationships ? (
        <View>
          {userRelationships.map((elm, index) => (
            <Text style={styles.text} key={index}>
              {elm.fullname || elm.phone}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={{textAlign: 'center', color: 'gray', fontSize: 20}}>
          Danh sách trống!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 18,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
  },

  input: {
    color: '#000',
  },
  title: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    margin: 10,
  },
});
