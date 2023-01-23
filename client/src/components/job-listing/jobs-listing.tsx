import { Pagination, Skeleton, Typography } from 'antd';
import Jobs from '../jobs';
import React, { useRef } from 'react';
import { ROUTES, _PAGE_SIZE, _TOTAL_JOBS } from '../../constants';
import { Link } from 'react-router-dom';
import { IJob } from '../../types/common-types';

interface JobsContainerInterface {
  jobs: IJob[];
  isLoading: boolean;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const JobsContainer: React.FC<JobsContainerInterface> = ({
  jobs,
  isLoading,
  offset,
  setOffset
}) => {
  const dummyTop = useRef<HTMLAnchorElement>(null);

  if (isLoading) return <Skeleton active />;

  if (jobs.length === 0) {
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
      {_TOTAL_JOBS / _PAGE_SIZE > 1 ? (
        <Pagination
          className="pagination-container"
          total={_TOTAL_JOBS}
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
