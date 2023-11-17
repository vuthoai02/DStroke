import React from 'react';
import {Text, StyleSheet} from 'react-native';

function CustomText({content, styles}) {
  return <Text style={{..._styles.style, ...styles}}>{content}</Text>;
}

const _styles = StyleSheet.create({
  style: {
    fontFamily: 'Inter-Regular',
  },
});

export default CustomText;
