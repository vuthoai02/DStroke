import React from 'react';
import {createContext, useReducer, useState, useEffect} from 'react';
import axios from 'axios';
import API_URL from '../api/constant/index';
import OneSignal from 'react-native-onesignal';

export const UserContext = createContext(null);

const UserContextProvider = ({children}) => {
  const [displaySOSView, setDisplaySOSView] = useState(true);
  const [onesignalId, setOnesignalId] = useState(null);

  const update = async payload => {
    try {
      const res = await axios.post(API_URL.UPDATE_USER, payload);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getOnesignalId = async () => {
    const state = await OneSignal.getDeviceState();
    setOnesignalId(state.userId);
  };

  useEffect(() => {
    getOnesignalId();
  }, []);

  const value = {
    update,
    displaySOSView,
    setDisplaySOSView,
    onesignalId,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
