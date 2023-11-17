import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Formik} from 'formik';

export default function RawBottom(props) {
  const {refRBSheet, list, values, _update, hiddenLabel, note} = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType={'slide'}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderWidth: 1,
            borderTopColor: 'gray',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '60%',
          },
        }}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {note ? <Text style={{color: 'red'}}>{note}</Text> : null}
            <Formik onSubmit={values => _update(values)} initialValues={values}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => {
                return (
                  <>
                    {list.map((elm, index) => {
                      return (
                        <View key={index}>
                          {values?.[elm.key] || hiddenLabel ? (
                            <Text style={{color: 'gray'}}>{elm.label}</Text>
                          ) : null}
                          <TextInput
                            style={styles.input}
                            placeholder={hiddenLabel ? '' : elm.label}
                            keyboardType={elm.type}
                            placeholderTextColor={'gray'}
                            onChangeText={handleChange(elm.key)}
                            onBlur={handleBlur(elm.key)}
                            value={values?.[elm.key]}
                            editable={elm.edit}
                          />
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        refRBSheet.current.close();
                        handleSubmit();
                      }}>
                      <Text style={{color: '#fff'}}>Lưu thay đổi</Text>
                    </TouchableOpacity>
                  </>
                );
              }}
            </Formik>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  input: {
    width: 295,
    height: 45,
    borderWidth: 1,
    borderColor: '#7A6868',
    borderRadius: 10,
    marginBottom: 20,
    color: '#000',
  },
  btn: {
    backgroundColor: '#2B7FEE',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
