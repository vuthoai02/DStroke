import React, {useState, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Button,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as Progress from 'react-native-progress';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const inputRender = [
  {
    name: 'phone',
    placeholder: 'Số điện thoại',
    keyboardType: 'numeric',
    icon: 'phone',
  },
  {name: 'password', placeholder: 'Mật khẩu', icon: 'key'},
];

const initValue = {
  phone: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .min(9, 'Số điện thoại không hợp lệ!')
    .max(11, 'Số điện thoại không hợp lệ!')
    .required('Số điện thoại không được để trống!'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 kí tự!')
    .required('Mật khẩu không được để trống!'),
});

function Login() {
  const navigate = useNavigation();
  const [fetching, setFetching] = useState(false);
  const {login} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const Login = async payload => {
    Keyboard.dismiss();
    try {
      setFetching(true);
      const res = await login(payload);
      // console.log(res);
      if (res.success === true) {
        navigate.navigate('Home');
        setFetching(false);
      } else {
        setFetching(false);
        Alert.alert(res.message)
      }
    } catch (err) {
      setFetching(false);
    }
  };
  return (
    <Formik
      initialValues={initValue}
      validationSchema={validationSchema}
      onSubmit={values => Login(values)}>
      {({handleChange, handleBlur, handleSubmit, errors, touched, values}) => (
        <SafeAreaView style={styles.container}>
          <CustomText content="Đừng đột quỵ nữa" styles={styles.title} />
          <View>
            {inputRender.map((ele, index) => {
              return (
                <View key={index}>
                  <View style={styles.inputBox}>
                    <Icon name={ele.icon} size={24} color="gray" />
                    <TextInput
                      style={styles.input}
                      placeholder={ele.placeholder}
                      placeholderTextColor={'gray'}
                      keyboardType={ele?.keyboardType}
                      onChangeText={handleChange(ele.name)}
                      onBlur={handleBlur(ele.name)}
                      value={values?.[ele.name]}
                      secureTextEntry={ele.name === 'password' && !showPassword}
                    />
                    {showPassword && ele.name === 'password' && (
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}>
                        <Icon name="eye" size={20} />
                      </TouchableOpacity>
                    )}
                    {!showPassword && ele.name === 'password' && (
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}>
                        <Icon name="eye-slash" size={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {errors?.[ele.name] && touched?.[ele.name] ? (
                    <Text style={styles.errText}>{errors?.[ele.name]}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: 300,
            }}>
            <CustomText
              styles={{
                textAlign: 'left',
                // width: 306,
                color: 'black',
                fontWeight: 'bold',
              }}
              content={'Quên mật khẩu?'}
            />
            <TouchableOpacity onPress={() => navigate.navigate('Register')}>
              <CustomText
                styles={{
                  textAlign: 'left',
                  // width: 306,
                  color: 'black',
                  fontWeight: 'bold',
                }}
                content={'Đăng kí tài khoản mới'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            {fetching === false && (
              <Button
                style={styles.btn}
                title="Tiếp tục"
                onPress={handleSubmit}
              />
            )}
            {fetching === true && (
              <View style={styles.btn}>
                <Progress.Circle color="white" size={20} indeterminate={true} />
              </View>
            )}
          </View>
          <ImageBackground
            style={styles.image}
            source={require('../../assets/images/login.png')}
          />
          <CustomText
            styles={{marginTop: 10, color: 'gray'}}
            content="Vì sức khỏe cộng đồng"
          />
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: 'black',
    fontSize: 23,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    borderRadius: 10,
    color: '#000',
    padding: 10,
  },
  image: {
    width: 360,
    height: 253,
  },
  bottom: {
    marginTop: 20,
    width: 300,
  },
  btn: {
    backgroundColor: '#2B7FFF',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  errText: {
    color: 'red',
    marginTop: '-3%',
    marginBottom: '7%',
  },
  eye: {
    position: 'absolute',
    top: '25%',
    right: '10%',
    color: 'black',
  },
  inputBox: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    width: 300,
    marginBottom: 12,
    borderColor: '#7A6868',
    borderRadius: 10,
    paddingLeft: 15,
  },
});

export default Login;
