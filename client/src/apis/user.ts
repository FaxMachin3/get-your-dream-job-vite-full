import axios from 'axios';
import { API_METHOD, API_ROUTES } from '../constants';
import { IUser } from '../types/common-types';
import { axiosRequest } from '../utils/axios-utils';
import { getSpecificVersionApi } from '../utils/common';

export const getUserGitHubRepos = async (username: string = '') => {
  return axios(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
  );
};

export const getAllApplicantsProfile = async (payload: string[]) => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.USER.GET_APPLICANTS_DATA),
    method: API_METHOD.POST,
    data: payload
  });
};

export const signUp = async (payload: IUser) => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.USER.REGISTER),
    method: API_METHOD.POST,
    data: payload
  });
};

export const editProfile = async (payload: IUser) => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.USER.EDIT_PROFILE),
    method: API_METHOD.PUT,
    data: payload
  });
};
