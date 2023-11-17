import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TabView} from 'react-native-tab-view';

export default function Tab(props) {
  const {renderScene, routes} = props;
  const [index, setIndex] = React.useState(0);
  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.4,
            ),
          });
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{
                  opacity,
                  color: 'black',
                  padding: 10,
                }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: Dimensions.get('window').width}}
        style={{marginTop: 10, width: 320}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
