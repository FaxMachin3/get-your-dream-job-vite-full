import React from 'react';
import { Empty, Skeleton } from 'antd';
import Jobs from '../jobs';
import { AxiosResponse } from 'axios';

interface AppliedJobsProps {
  isAppliedJobLoading: boolean;
  isAppliedJobError: boolean;
  appliedJobs: AxiosResponse<any, any> | undefined;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({
  isAppliedJobLoading,
  isAppliedJobError,
  appliedJobs
}) => {
  if (isAppliedJobLoading) {
    return <Skeleton active />;
  }

  if (
    isAppliedJobError ||
    !appliedJobs ||
    appliedJobs.data?.jobs.length === 0
  ) {
    return (
      <div key="no-repo" className="no-repo">
        <Empty description="No jobs applied!" />
      </div>
    );
  }

  return (
    <>
      <Jobs data={appliedJobs.data.jobs} />
    </>
  );
};

export default AppliedJobs;
