import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES, _TOTAL_JOBS, _PAGE_SIZE, STORE } from '../../constants';
import Sidebar from '../sidebar';
import { JobsContainer } from './jobs-listing';
import { useAppStore } from '../../stores';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../apis/job';
import { getUserData } from '../../apis/auth';

import './styles.scss';

interface JobListingProps {}

const JobListing: React.FC<JobListingProps> = () => {
  const [offset, setOffset] = useState<number>(0);
  const { userToken, setCurrentUser } = useAppStore((state) => ({
    userToken: state.userToken,
    setCurrentUser: state.setCurrentUser
  }));

  useQuery([STORE.SUB_STORE.CURRENT_USER], getUserData, {
    enabled: !!userToken,
    onSuccess: ({ data }) => setCurrentUser(data)
  });
  const { data: jobs, isLoading: isJobLoading } = useQuery(
    [STORE.SUB_STORE.JOBS],
    () => getJobs({ offset, pageSize: _TOTAL_JOBS }),
    {
      enabled: !!userToken
    }
  );

  if (!userToken) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <section className="job-listing-wrapper">
      <Sidebar />
      <JobsContainer
        jobs={jobs?.data?.jobs ?? []}
        isLoading={isJobLoading}
        offset={offset}
        setOffset={setOffset}
      />
    </section>
  );
};

export default JobListing;
