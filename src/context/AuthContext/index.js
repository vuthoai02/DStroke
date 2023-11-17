import React from 'react';
import {createContext, useReducer, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from '../../reducer/authReducer';
import API_URL from '../../api/constant/index';
import OneSignal from 'react-native-onesignal';

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
  const [sosStatus, setSosStatus] = useState(false);
  const [SOSPerson, setSosPerson] = useState({});
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: false,
    isAuthenticated: false,
    user: null,
  });
  const [userRelationships, setUserRelationships] = useState(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      getSosStatus();
    }, 2000);

    //clean up
    return () => clearInterval(timerId);
  }, [authState.isAuthenticated]);

  useEffect(() => {
    loadUser();
  }, []);

  const getSosStatus = async () => {
    if (authState.isAuthenticated === false) return;
    try {
      const res = await axios.get(API_URL.GET_SOS_STATUS);
      if (res.data.nguoi_than) {
        let relationship = res.data.nguoi_than;

        if (relationship.length == 0) {
          setSosStatus(false);
          setSosPerson(null);
          return;
        }

        setSosStatus(relationship[0].SOS);
        setSosPerson(relationship[0]);
        await AsyncStorage.setItem(
          'SosPerson',
          JSON.stringify(relationship[0]),
        );
        console.log('LOAD_SOS_STATUS_SUCCESSFULL');
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(SOSPerson);

  const updateSOSStatus = async curPoisition => {
    if (authState.user.SOS === false) {
      //send notification
      const notificationObj = {
        contents: {en: 'Người thân của bạn bâng gặp nguy hiểm'},
        include_player_ids: authState.user?.onesignalIdRelationship,
      };
      const jsonString = JSON.stringify(notificationObj);
      OneSignal.postNotification(
        jsonString,
        success => {
          console.log('gui thong bao thanh cong', success);
        },
        error => {
          console.log('Error:', error);
        },
      );
    }
    try {
      await axios.post(API_URL.CHANGE_SOS_STATUS, {curPoisition});
      await loadUser();
      console.log('UPDATE_SOS_STATUS_SUCCESS');
    } catch (err) {
      console.log(err);
      console.log('UPDATE_SOS_STATUS_FAIL');
    }
  };

  const register = async userForm => {
    try {
      const res = await axios.post(API_URL.REGISTER_URL, userForm);
      await AsyncStorage.setItem('accessToken', res.data.accessToken);
      await loadUser();
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async userForm => {
    try {
      const res = await axios.post(API_URL.LOGIN_URL, userForm);
      // console.log(res);
      if (res.data.success) {
        await AsyncStorage.setItem('accessToken', res.data.data.accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.data.user));
        dispatch({
          type: 'SET_AUTH',
          payload: {isAuthenticated: true, user: res.data.data.user},
        });
        await loadUser();
      }
      return res.data;
    } catch (err) {
      return {success: false, message: err.response.data.message};
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');

      await loadUser();
      dispatch({
        type: 'SET_AUTH',
        payload: {isAuthenticated: false, user: null},
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getRelationships = async () => {
    try {
      const relationships = await axios.get(API_URL.GET_RELATIONSHIPS);
      setUserRelationships(relationships?.data.nguoi_than);
    } catch (error) {
      console.log(error);
    }
  };

  const addPhone = async payload => {
    try {
      const res = await axios.post(API_URL.ADD_PHONE, payload);
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  };

  const update = async payload => {
    try {
      const res = await axios.post(API_URL.UPDATE_USER, payload);
      console.log('update success');
      return res.data;
    } catch (err) {
      console.log('update fail');
    }
  };

  //authenticate user
  const loadUser = async () => {
    const state = await OneSignal.getDeviceState();

    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      setAuthToken(accessToken);
    }

    try {
      const res = await axios.get(API_URL.GET_USER);
      if (res.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {isAuthenticated: true, user: res.data.user},
        });

        console.log('LOAD_USER_SUCCESSFULL');
      } else {
        await AsyncStorage.removeItem('accessToken');

        await loadUser();
        dispatch({
          type: 'SET_AUTH',
          payload: {isAuthenticated: false, user: null},
        });
        console.log('LOAD_USER_FAIL');
      }
      await update({onesignalId: state.userId});
    } catch (err) {
      console.log('LOAD_USER_FAIL');
    }
  };

  // const _getLink = async () =>{
  //   const initLink = await Linking.getInitialURL();
  //   setLink(initLink);
  // }

  // const Call = async () => {
  //   try {
  //     console.log(link);
  //     const sos = link.split('//')[1];
  //     if (sos === 'sos') {
  //       Geolocation.getCurrentPosition(pos => {
  //         setCurPoisition(pos.coords);
  //       });
  //       await updateSOSStatus([curPoisition.longitude, curPoisition.latitude]);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const change = AppState.addEventListener('change', async () => {
  //     if(AppState.currentState ==='active'){
  //      await _getLink();
  //     }
  //   });

  //   return () => change.remove();
  //   // getlink();
  // }, []);

  // useEffect(()=>{
  //   if(link !== null){
  //     Call();
  //   }
  // }, [link])

  const value = {
    login,
    register,
    authState,
    logout,
    updateSOSStatus,
    sosStatus,
    setSosStatus,
    SOSPerson,
    getRelationships,
    userRelationships,
    addPhone,
    getSosStatus,
    loadUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
