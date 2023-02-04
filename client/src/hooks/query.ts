import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../apis/auth';
import { getAppliedJobs, getJobs } from '../apis/job';
import { getUserGitHubRepos } from '../apis/user';
import { STORE, _PAGE_SIZE } from '../constants';
import { FilterType, IUser } from '../types/common-types';

export const useGetUserData = (
  setCurrentUser: (user: Partial<IUser> | null) => void,
  enabled: boolean
) => {
  const queryClient = useQueryClient();

  return useQuery([STORE.SUB_STORE.CURRENT_USER], getUserData, {
    enabled,
    onSuccess: ({ data }) => {
      setCurrentUser(data);
      queryClient.invalidateQueries([STORE.SUB_STORE.USER_REPOS]);
    }
  });
};

export const useGetJobs = (
  offset: number,
  enabled: boolean,
  jobFilter: FilterType
) => {
  return useQuery(
    [STORE.SUB_STORE.JOBS, offset, jobFilter],
    () => getJobs({ offset, pageSize: _PAGE_SIZE, jobFilter }),
    {
      enabled
    }
  );
};

export const useGetAppliedJobs = (enabled: boolean) => {
  return useQuery(
    [STORE.SUB_STORE.APPLIED_JOBS],
    () => getAppliedJobs({ offset: 0, pageSize: 5 }),
    {
      enabled: enabled
    }
  );
};

export const usGetUserGitHubRepos = (
  githubUsername: string | undefined,
  enabled: boolean
) => {
  return useQuery(
    [STORE.SUB_STORE.USER_REPOS, githubUsername],
    () => getUserGitHubRepos(githubUsername),
    {
      enabled,
      retry: 0
    }
  );
};
