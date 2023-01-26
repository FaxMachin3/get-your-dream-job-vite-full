import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES, _TOTAL_JOBS, _PAGE_SIZE } from '../../constants';
import Sidebar from '../sidebar';
import { JobsContainer } from './jobs-listing';
import { useAppStore } from '../../stores';
import { useGetJobs, useGetUserData } from '../../hooks/query';

import './styles.scss';

interface JobListingProps {}

const JobListing: React.FC<JobListingProps> = () => {
  const [offset, setOffset] = useState<number>(0);
  const { userToken, setCurrentUser } = useAppStore((state) => ({
    userToken: state.userToken,
    setCurrentUser: state.setCurrentUser
  }));

  useGetUserData(setCurrentUser, !!userToken);

  const { data: jobs, isLoading: isJobLoading } = useGetJobs(
    offset,
    !!userToken
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
