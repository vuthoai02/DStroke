import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import Swiper from 'react-native-swiper';

function CustomSlider({bannerList}) {
  return (
    <View style={styles.swiper}>
      <Swiper
        showsPagination={false}
        paginationStyle={{bottom: 70}}
        autoplay={true}
        autoplayTimeout={10}
        loop={true}>
        {bannerList.map((elm, index) => (
          <View style={styles.slide} key={index}>
            <TouchableWithoutFeedback>
              <Image
                style={styles.image}
                source={{uri: elm}}
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  swiper: {
    width: '100%',
    height:230
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CustomSlider;
