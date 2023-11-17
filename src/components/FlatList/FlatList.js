import {
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function FlatList(props) {
  const {data, he} = props;
  console.log(he);
  const itemSize = width * 0.78;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nativgate = useNavigation();
  return (
    <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={item => item?.key}
      horizontal
      contentContainerStyle={{alignItems: 'center', paddingTop: 20}}
      decelerationRate={0}
      bounces={false}
      snapToInterval={itemSize * 1.12}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
      renderItem={({item, index}) => {
        const inputRange = [
          (index - 1) * itemSize,
          index * itemSize,
          (index + 1) * itemSize,
        ];
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0, 0],
        });
        return (
          <TouchableWithoutFeedback
            onPress={() => nativgate.navigate(item.link)}
            style={{width: itemSize}}
            key={index}>
            <Animated.View
              style={[
                {
                  transform: [{translateY}],
                  height: he,
                },
                styles.view,
              ]}>
              <Image
                source={item.img}
                style={{width: itemSize * 0.9, height: height * 0.2}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: 'black',
                  paddingTop: 5,
                  paddingBottom: 5,
                  textAlign: 'justify',
                  width: 250,
                  height: '50%',
                }}>
                {item.contex}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'green',
    width: width * 0.3,
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
  },
  view: {
    marginHorizontal: 10,
    padding: 10 * 2,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 10,
  },
});
