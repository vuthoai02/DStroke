import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContextProvider from './src/context/AuthContext';
import UserContextProvider from './src/context/UserContext';
import SplashScreen from 'react-native-splash-screen';
import API_URL from './src/api/constant/index';
import routes from './src/routes';

const Stack = createNativeStackNavigator();

import BackgroundFetch from 'react-native-background-fetch';
import axios from 'axios';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';


function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // useEffect(() => {
  //   initBackgroundFetch();

  //   //onDisplayNotification();
  // }, []);

  // async function onDisplayNotification() {
  //   try {
  //     const channelId = await notifee.createChannel({
  //       id: 'linhtinh',
  //       name: 'SOS Channel',
  //       sound: 'notisound',
  //     });

  //     await notifee.displayNotification({
  //       title: 'Người thân của bạn đang gặp nguy hiểm!!!',
  //       android: {
  //         channelId,
  //         pressAction: {
  //           id: 'default',
  //         },
  //         category: AndroidCategory.CALL,
  //         importance: AndroidImportance.HIGH,
  //         fullScreenAction: {
  //           id: 'default',
  //         },
  //         showTimestamp: true,
  //         largeIcon: require('./src/assets/Vector/android/mipmap-hdpi/ic_launcher_foreground.png'),
  //         sound: 'notisound',
  //         smallIcon: 'ic_stat_name',
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const initBackgroundFetch = async () => {
  //   // BackgroundFetch event handler.
  //   const onEvent = async taskId => {
  //     console.log('[BackgroundFetch] task: ', taskId);
  //     // Do your background work...
  //     const res = await axios.get(API_URL.GET_SOS_STATUS);

  //     const relationship = res.data.nguoi_than;

  //     if (relationship.length == 0) {
  //       return;
  //     }

  //     if (relationship[0].SOS === true) {
  //       console.log(relationship[0].SOS);
  //       await onDisplayNotification();
  //     }
  //     // IMPORTANT:  You must signal to the OS that your task is complete.
  //     BackgroundFetch.finish(taskId);
  //   };

  //   // Timeout callback is executed when your Task has exceeded its allowed running-time.
  //   // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
  //   const onTimeout = async taskId => {
  //     console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
  //     BackgroundFetch.finish(taskId);
  //   };

  //   // Initialize BackgroundFetch only once when component mounts.
  //   let status = await BackgroundFetch.configure(
  //     {minimumFetchInterval: 15},
  //     onEvent,
  //     onTimeout,
  //   );

  //   console.log('[BackgroundFetch] configure status: ', status);
  // };

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {routes.map((ele, index) => {
              return (
                <Stack.Screen
                  key={index}
                  options={{...ele?.options, headerTitleAlign: 'center'}}
                  name={ele.name}
                  component={ele.component}
                />
              );
            })}
          </Stack.Navigator>
          {/* <NavBar/> */}
        </NavigationContainer>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
