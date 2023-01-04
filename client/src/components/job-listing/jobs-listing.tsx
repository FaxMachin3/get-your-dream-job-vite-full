import { Pagination, Skeleton, Typography } from 'antd';
import Jobs from '../jobs';
import React, { useRef } from 'react';
import { Job } from '../../fake-apis/job-listing-apis';
import { ROUTES, _PAGE_SIZE } from '../../constants';
import { Link } from 'react-router-dom';

interface JobsContainerInterface {
    jobs: Job[];
    isLoading: boolean;
    initialFetching: boolean;
    totalJobs: number;
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const JobsContainer: React.FC<JobsContainerInterface> = ({
    jobs,
    isLoading,
    initialFetching,
    totalJobs,
    offset,
    setOffset,
}) => {
    const dummyTop = useRef<HTMLAnchorElement>(null);

    if (isLoading) return <Skeleton active />;

    if (!initialFetching && jobs.length === 0) {
        return (
            <Typography.Paragraph className="no-jobs">
                Sorry! No jobs available currently.{' '}
                {offset > 1 ? (
                    <Link to={ROUTES.JOB_LISTING} onClick={() => setOffset(1)}>
                        Please click here.
                    </Link>
                ) : (
                    ''
                )}
            </Typography.Paragraph>
        );
    }

    const onPageChange = (page: number, _pageSize: number) => {
        setOffset(page);
        // move to navbar
        dummyTop.current?.click();
    };

    return (
        <div className="jobs-wrapper">
            <Jobs data={jobs} />
            {totalJobs / _PAGE_SIZE > 1 ? (
                <Pagination
                    className="pagination-container"
                    total={totalJobs}
                    defaultCurrent={offset}
                    showSizeChanger={false}
                    showQuickJumper
                    onChange={onPageChange}
                />
            ) : null}
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a ref={dummyTop} href="#navbar"></a>
        </div>
    );
};
