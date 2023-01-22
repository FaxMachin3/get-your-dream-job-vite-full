import { API_ROUTES } from '../constants';
import { axiosRequest } from '../utils/axios-utils';

export const getServerHealth = async () => {
    return axiosRequest({ url: API_ROUTES.HEALTH });
};
