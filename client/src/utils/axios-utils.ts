import axios from 'axios';
import { CUSTOM_HEADER, STORE } from '../constants';

export const axiosRequest = axios.create({
    baseURL: 'http://localhost:8080',
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
        // Do something with request error
        return Promise.reject(error);
    }
);
