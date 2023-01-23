import axios from 'axios';
import { API_METHOD, API_ROUTES } from '../constants';
import { axiosRequest } from '../utils/axios-utils';

export const getUserGitHubRepos = async (username: string = '') => {
  return axios(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
  );
};

export const getAllApplicantsProfile = async (payload: string[]) => {
  return axiosRequest({
    url: API_ROUTES.USER.GET_APPLICANTS_DATA,
    method: API_METHOD.POST,
    data: payload
  });
};
