import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SceneMap} from 'react-native-tab-view';
import Tab from '../../../components/Tab';

import PhongNgua from './PhongNgua';
import PhucHoi from './PhucHoi';

const renderScene = SceneMap({
  first: PhongNgua,
  second: PhucHoi,
});

export default function AnUong() {
  const [routes] = React.useState([
    {key: 'first', title: 'Phòng ngừa'},
    {key: 'second', title: 'Phục hồi'},
  ]);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          // height: Dimensions.get('window').height,
          height: 1300,
        }}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Nội dung</Text>
          <Text style={styles.contentBoxText}>
            {
              'Ăn gì phòng ngừa đột quỵ và bệnh tim?\nChế độ ăn với người phục hồi sau đột quỵ'
            }
          </Text>
        </View>
        <Tab routes={routes} renderScene={renderScene} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentBox: {
    backgroundColor: '#1E90FF',
    width: '90%',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  contentBoxText: {
    color: '#fff',
    lineHeight: 30,
    marginLeft: 15,
  },
});
