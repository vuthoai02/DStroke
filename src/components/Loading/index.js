import {
  View,
} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

export default function Loading() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Progress.Circle color="gray" size={40} indeterminate={true} />
      </View>
    );
}

