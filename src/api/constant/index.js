import BASE_URL from '../../constant/api';

const LOGIN_URL = `${BASE_URL}/auth/login`;

const REGISTER_URL = `${BASE_URL}/auth/register`;

const ADD_PHONE = `${BASE_URL}/sos/add-phone`;
const CHANGE_SOS_STATUS = `${BASE_URL}/sos/change-sos-status`;
const GET_SOS_STATUS = `${BASE_URL}/sos/get-sos-status`;
const GET_RELATIONSHIPS = `${BASE_URL}/user/get-relationships`;
const GET_USER = `${BASE_URL}/auth/get-user`;

const SET_ROLE = `${BASE_URL}/user/set-role`;

const UPDATE_USER = `${BASE_URL}/user/update`;

const CONVERSATION = `${BASE_URL}/conversation`;
const GET_MESSAGE = `${BASE_URL}/message`;
const CREATE_MESSAGE = `${BASE_URL}/message`;

const GET_HEALTH = `${BASE_URL}/user/health-info`;
const UPDATE_HEALTH = `${BASE_URL}/user/update`;

const GET_DOCTORS = `${BASE_URL}/user/doctors`;

export default {
  LOGIN_URL,
  REGISTER_URL,
  ADD_PHONE,
  CHANGE_SOS_STATUS,
  GET_SOS_STATUS,
  GET_RELATIONSHIPS,
  GET_USER,
  UPDATE_USER,
  SET_ROLE,
  CONVERSATION,
  GET_MESSAGE,
  CREATE_MESSAGE,
  GET_HEALTH,
  UPDATE_HEALTH,
  GET_DOCTORS,
};
