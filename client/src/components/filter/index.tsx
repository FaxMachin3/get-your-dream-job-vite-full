import { Button, Card, Input, message, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import { ERROR, USER_TYPE } from '../../constants';
import CreateJob from '../create-job';
import TagSelect from '../tag-select';
import { useAppStore } from '../../stores';
import { IJob } from '../../types/common-types';
import { useCreateJob } from '../../hooks/mutation';
import { useDebounce } from '../../hooks/common';

import './styles.scss';

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const { currentUser, setMinSalary, jobFilter, setTag } = useAppStore(
    (state) => ({
      currentUser: state.currentUser,
      jobFilter: state.jobFilter,
      setMinSalary: state.setMinSalary,
      setTag: state.setTag
    })
  );
  const [openCreateJobModal, setOpenCreateJobModal] = useState(false);
  const isRecruiter = currentUser?.userDetails?.type === USER_TYPE.RECRUITER;
  const [jobFormData, setJobFormData] = useState<Partial<IJob>>({
    companyName: currentUser?.userDetails?.companyName ?? '',
    title: '',
    contact: currentUser?.userDetails?.contact ?? '',
    description: '',
    requirement: '',
    location: '',
    createdBy: currentUser?._id,
    salaryRange: { min: 0, max: Number.MAX_SAFE_INTEGER },
    tags: []
  });

  const {
    mutate: createJob,
    isLoading: isCreatingJob,
    isError: isCreatingJobError
  } = useCreateJob(setOpenCreateJobModal);

  const onMinSalaryChange_Debounced = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinSalary(e.target.value ?? '');
    },
    300
  );

  const createJobHandler = () => {
    if (
      !jobFormData.companyName ||
      !jobFormData.title ||
      !jobFormData.description ||
      !jobFormData.requirement ||
      !jobFormData.location
    ) {
      message.error({
        content: ERROR.CHECK_FORM_DATA
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
        <TagSelect onTagChange={setTag} defaultValue={jobFilter.tags} />
        <label>
          <Typography.Paragraph>Minimum Salary</Typography.Paragraph>
          <Input
            defaultValue={jobFilter.minSalary}
            title="Enter minimum salary"
            placeholder="e.g. 1500000"
            name="minSalary"
            onChange={onMinSalaryChange_Debounced}
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
