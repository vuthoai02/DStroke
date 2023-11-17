import axios from 'axios';
import API_URL from '../constant/index';

const login = async data => {
  try {
    const res = await axios.post(API_URL.LOGIN_URL, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const register = async data => {
  try {
    const res = await axios.post(API_URL.REGISTER_URL, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default {login, register};
