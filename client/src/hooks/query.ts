import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../apis/auth';
import { getAppliedJobs, getJobs } from '../apis/job';
import { getUserGitHubRepos } from '../apis/user';
import { STORE, _TOTAL_JOBS } from '../constants';
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
  jobFilters: FilterType
) => {
  return useQuery(
    [STORE.SUB_STORE.JOBS, jobFilters],
    () => getJobs({ offset, pageSize: _TOTAL_JOBS, jobFilters }),
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
