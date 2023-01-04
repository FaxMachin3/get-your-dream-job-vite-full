import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { notification } from 'antd';
import { FilterType, ROUTES, _TOTAL_JOBS, _PAGE_SIZE } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { getJobs, Job } from '../../fake-apis/job-listing-apis';
import Sidebar from '../sidebar';
import { JobsContainer } from './jobs-listing';

import './styles.scss';

interface JobListingProps {}

const JobListing: React.FC<JobListingProps> = () => {
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [jobs, setJobs] = useState<Array<Job>>([]);
    const [initialFetching, setInitialFetching] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(1);
    const [totalJobs, setTotalJobs] = useState<number>(_TOTAL_JOBS);

    const getJobsForUser = useCallback(
        (
            jobFilter: FilterType = {
                tags: [],
                minSalary: '',
            }
        ) => {
            setIsLoading(true);
            currentUser &&
                getJobs(currentUser.email, jobFilter, {
                    pageSize: _PAGE_SIZE,
                    offset: offset - 1,
                })
                    .then((data) => {
                        setTotalJobs(data.totalJobs);
                        delete data.totalJobs;
                        setJobs(data.jobs);
                        setIsLoading(false);
                        setInitialFetching(false);
                    })
                    .catch((errorMessage) => {
                        setIsLoading(false);
                        setJobs([]);
                        notification['error']({
                            message: '',
                            description: errorMessage,
                            placement: 'bottomRight',
                        });
                    });
        },
        [currentUser, offset]
    );

    useEffect(() => {
        getJobsForUser();
    }, [currentUser, offset, getJobsForUser]);

    if (!currentUser) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return (
        <section className="job-listing-wrapper">
            <Sidebar getJobsForUser={getJobsForUser} />
            <JobsContainer
                jobs={jobs}
                isLoading={isLoading}
                initialFetching={initialFetching}
                offset={offset}
                setOffset={setOffset}
                totalJobs={totalJobs}
            />
        </section>
    );
};

export default JobListing;
