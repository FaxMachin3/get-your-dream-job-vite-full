import { Button, Card, Input, Modal, notification, Typography } from 'antd';
import React, { useState } from 'react';
import { FilterType, USER_TYPE } from '../../constants';
import CreateJob from '../create-job';
import TagSelect from '../tag-select';
import { ERROR } from '../../utils/fake-apis-utils';
import { useAppStore } from '../../stores';
import { IJob } from '../../types/common-types';
import { useCreateJob } from '../../hooks/mutation';

import './styles.scss';

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const [openCreateJobModal, setOpenCreateJobModal] = useState(false);
  const isRecruiter = currentUser?.userDetails?.type === USER_TYPE.RECRUITER;
  const [filter, setFilter] = useState<FilterType>({
    tags: [],
    minSalary: ''
  });
  const [jobFormData, setJobFormData] = useState<Partial<IJob>>({
    companyName: currentUser?.userDetails?.companyName ?? '',
    title: '',
    contact: currentUser?.userDetails?.contact ?? '',
    description: '',
    requirement: '',
    location: '',
    createdBy: currentUser?._id,
    salaryRange: [0, Number.MAX_SAFE_INTEGER],
    tags: []
  });

  const {
    mutate: createJob,
    isLoading: isCreatingJob,
    isError: isCreatingJobError
  } = useCreateJob(setOpenCreateJobModal);

  // useEffect(() => {
  //     memoizedGetJobsForUser();
  // }, [filter, getJobsForUser]);

  const onMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      minSalary: e.target.value
    }));
  };

  const onTagChange = (value: string[]) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      tags: value
    }));
  };

  const createJobHandler = () => {
    if (
      !jobFormData.companyName ||
      !jobFormData.title ||
      !jobFormData.description ||
      !jobFormData.requirement ||
      !jobFormData.location
    ) {
      notification['error']({
        message: '',
        description: ERROR.CHECK_FORM_DATA,
        placement: 'topRight'
      });
      return;
    }

    createJob(jobFormData as IJob);
  };

  const cancelHandler = () => {
    setOpenCreateJobModal(false);
  };

  return (
    <>
      {isRecruiter ? (
        <div className="create-job">
          <Button
            type="primary"
            size="large"
            onClick={() => setOpenCreateJobModal(true)}
            title="Create new job posting"
          >
            Create new job posting
          </Button>
          <Modal
            className="create-job-modal"
            open={openCreateJobModal}
            onOk={createJobHandler}
            onCancel={cancelHandler}
            okText="Create"
            cancelButtonProps={{
              size: 'large',
              className: 'cancel-button'
            }}
            okButtonProps={{
              loading: isCreatingJob,
              size: 'large',
              className: 'create-button'
            }}
          >
            <CreateJob
              jobFormData={jobFormData}
              setJobFormData={setJobFormData}
            />
          </Modal>
        </div>
      ) : null}
      <Card className="filter-container" bordered={false}>
        <Typography.Paragraph className="filter-title" strong>
          Filter
        </Typography.Paragraph>
        <TagSelect onTagChange={onTagChange} />
        <label>
          <Typography.Paragraph>Minimum Salary</Typography.Paragraph>
          <Input
            title="Enter minimum salary"
            placeholder="e.g. 1500000"
            value={filter.minSalary}
            name="minSalary"
            onChange={onMinSalaryChange}
            className="min-salary-input"
            type="number"
            size="large"
          />
        </label>
      </Card>
    </>
  );
};

export default Filter;
