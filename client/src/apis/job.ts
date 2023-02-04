import { API_METHOD, API_ROUTES } from '../constants';
import { FilterType, IJob } from '../types/common-types';
import { axiosRequest } from '../utils/axios-utils';
import { getSpecificVersionApi } from '../utils/common';

export const getJobs = async ({
  offset,
  pageSize,
  jobFilter
}: {
  offset: number;
  pageSize: number;
  jobFilter: FilterType;
}) => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.JOB.GET),
    method: API_METHOD.POST,
    params: {
      offset: offset - 1,
      pageSize
    },
    data: jobFilter
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
    url: getSpecificVersionApi(API_ROUTES.JOB.GET_APPLIED),
    params: {
      offset,
      pageSize
    }
  });
};

export const applyJob = async (jobId: string) => {
  return axiosRequest({
    url: getSpecificVersionApi(`${API_ROUTES.USER.APPLY}/${jobId}`),
    method: API_METHOD.PUT
  });
};

export const createJob = async (payload: IJob) => {
  return axiosRequest({
    url: getSpecificVersionApi(API_ROUTES.JOB.CREATE),
    method: API_METHOD.POST,
    data: payload
  });
};
