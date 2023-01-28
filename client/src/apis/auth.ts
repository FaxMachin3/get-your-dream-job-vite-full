import { API_METHOD, API_ROUTES } from '../constants';
import { axiosRequest } from '../utils/axios-utils';
import { getSpecificVersionApi } from '../utils/common';

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.LOGIN),
    method: API_METHOD.POST,
    data: payload
  });
};

export const getUserData = async () => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.LOGIN)
  });
};
