import { API_METHOD, API_ROUTES } from '../constants';
import { axiosRequest } from '../utils/axios-utils';

export const getJobs = async ({
  offset,
  pageSize
}: {
  offset: number;
  pageSize: number;
}) => {
  return axiosRequest({
    url: API_ROUTES.JOB.GET,
    params: {
      offset,
      pageSize
    }
  });
};

export const getAppliedJobs = async ({
  offset,
  pageSize
}: {
  offset: number;
  pageSize: number;
}) => {
  return axiosRequest({
    url: API_ROUTES.JOB.GET_APPLIED,
    params: {
      offset,
      pageSize
    }
  });
};

export const applyJob = async (jobId: string) => {
  return axiosRequest({
    url: `${API_ROUTES.USER.APPLY}/${jobId}`,
    method: API_METHOD.PUT
  });
};
