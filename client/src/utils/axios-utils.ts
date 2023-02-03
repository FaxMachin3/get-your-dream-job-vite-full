import axios from 'axios';
import { CUSTOM_CLASS, CUSTOM_HEADER, ERROR_CODE, STORE } from '../constants';

export const axiosRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'
});

axiosRequest.interceptors.request.use(
  (config) => {
    const appStoreDeserialize = localStorage.getItem(STORE.APP_STORE);
    const token = appStoreDeserialize
      ? JSON.parse(appStoreDeserialize).state.userToken
      : null;
    config.headers[CUSTOM_HEADER.AUTH] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRequest.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error?.response?.status === ERROR_CODE.UNAUTHORIZED) {
      console.log(error?.response?.status);
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = '';
      (
        document.querySelector(`.${CUSTOM_CLASS.LOGOUT} a`) as HTMLAnchorElement
      )?.click(); // logging out when unauthorized
    }

    return Promise.reject(error);
  }
);
