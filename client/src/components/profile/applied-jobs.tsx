import React from 'react';
import { Empty } from 'antd';
import Jobs from '../jobs';
import { AxiosResponse } from 'axios';
import CustomSkeleton from '../skeleton';

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
    return (
      <CustomSkeleton
        heights={{
          large: '228.562px',
          medium: '298.562px',
          small: '298.562px'
        }}
        totalSkeletons={5}
      />
    );
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
