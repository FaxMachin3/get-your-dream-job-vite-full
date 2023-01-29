import {
  Avatar,
  Button,
  Card,
  Empty,
  Modal,
  message,
  Skeleton,
  Tag,
  Typography
} from 'antd';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ERROR, ROUTES, USER_TYPE } from '../../constants';
import { UserOutlined } from '@ant-design/icons';
import EditJob from '../edit-profile';
import { validateEmail } from '../../utils/common';
import Jobs from '../jobs';
import { useAppStore } from '../../stores';
import { IUser } from '../../types/common-types';
import { useEditProfileMutation } from '../../hooks/mutation';
import {
  useGetAppliedJobs,
  useGetUserData,
  usGetUserGitHubRepos
} from '../../hooks/query';

import './styles.scss';

interface ProfileProps {
  applicant?: IUser;
  isProfileViewer?: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  applicant,
  isProfileViewer = false
}) => {
  const { currentUser, setCurrentUser, userToken } = useAppStore((state) => ({
    currentUser: state.currentUser,
    setCurrentUser: state.setCurrentUser,
    userToken: state.userToken
  }));
  const currentUserProfile = applicant ?? currentUser;
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const isRecruiter =
    currentUserProfile?.userDetails?.type === USER_TYPE.RECRUITER;

  useGetUserData(setCurrentUser, !!userToken);
  const {
    data: appliedJobs,
    isLoading: isAppliedJobLoading,
    isError: isAppliedJobError
  } = useGetAppliedJobs(!!currentUser && !isProfileViewer && !isRecruiter);
  const {
    data: gitHubRepos,
    isLoading: isFetchingRepos,
    isError: isRepoFetchingError
  } = usGetUserGitHubRepos(
    currentUserProfile?.userDetails?.githubUsername,
    !!currentUser &&
      !!currentUserProfile?.userDetails?.githubUsername &&
      (isProfileViewer || !isRecruiter)
  );
  const {
    mutate: editProfileMutate,
    isLoading: isEditProfileLoading,
    isError: isEditProfileError
  } = useEditProfileMutation(setOpenEditProfileModal);

  const [editProfileFormData, setEditProfileFormData] = useState<
    Partial<IUser & { confirmPassword: string }>
  >({
    name: currentUserProfile?.name,
    email: currentUserProfile?.email,
    password: '',
    confirmPassword: '',
    userDetails: {
      type: currentUserProfile?.userDetails?.type as USER_TYPE,
      contact: currentUserProfile?.userDetails?.contact ?? '',
      location: currentUserProfile?.userDetails?.location ?? '',
      githubUsername: currentUserProfile?.userDetails?.githubUsername ?? '',
      skills: currentUserProfile?.userDetails?.skills ?? [],
      appliedTo: currentUserProfile?.userDetails?.appliedTo ?? [],
      companyName: currentUserProfile?.userDetails?.companyName ?? ''
    }
  });

  if (!currentUserProfile) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  const renderJobs = () => {
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

  const renderSkills = () => {
    if (currentUserProfile.userDetails?.skills?.length === 0) {
      return null;
    }

    return (
      <Typography.Paragraph>
        {currentUserProfile.userDetails?.skills?.map((skill) => (
          <Tag title={skill} key={skill}>
            {skill}
          </Tag>
        ))}
      </Typography.Paragraph>
    );
  };

  const renderRepos = () => {
    if (isFetchingRepos) {
      return <Skeleton active />;
    }

    if (isRepoFetchingError || !gitHubRepos || gitHubRepos.data?.length === 0) {
      return (
        <div key="no-repo" className="no-repo">
          <Empty description="No GitHub profile/ repo found." />
        </div>
      );
    }

    return (
      <div>
        {gitHubRepos.data.map((repo: any) => (
          <Card
            type="inner"
            key={repo.id}
            className="git-card"
            hoverable
            onClick={() => window.open(repo.html_url)}
            bordered={false}
          >
            <div className="left">
              <Typography.Link
                title={repo.name}
                className="link"
                strong
                ellipsis
              >
                {repo.name}
              </Typography.Link>
              {repo.description ? (
                <Typography.Paragraph className="repo-description">
                  {repo.description}
                </Typography.Paragraph>
              ) : null}
            </div>
            <div className="right">
              <Typography.Paragraph>
                <Tag title={`Stars: ${repo.stargazers_count}`}>
                  Stars: {repo.stargazers_count}
                </Tag>
              </Typography.Paragraph>
              <Typography.Paragraph>
                <Tag title={`Watchers: ${repo.watchers_count}`}>
                  Watchers: {repo.watchers_count}
                </Tag>
              </Typography.Paragraph>
              <Typography.Paragraph>
                <Tag title={`Forks: ${repo.forks_count}`}>
                  Forks: {repo.forks_count}
                </Tag>
              </Typography.Paragraph>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const editProfileHandler = () => {
    setOpenEditProfileModal(true);
  };

  const saveProfileHandler = () => {
    if (!validateEmail(editProfileFormData.email as string)) {
      message.error({
        content: ERROR.INVALID_EMAIL
      });
      return;
    }

    if (!editProfileFormData.name || !editProfileFormData.email) {
      message.error({
        content: ERROR.CHECK_FORM_DATA
      });
      return;
    }

    if (editProfileFormData.password !== editProfileFormData.confirmPassword) {
      message.error({
        content: ERROR.PASSWORD_MISMATCH
      });
      return;
    }

    const payload = {
      ...editProfileFormData
    };

    delete payload.confirmPassword;
    if (!payload.password) delete payload.password;

    editProfileMutate(payload as IUser);
  };

  const cancelHandler = () => {
    setOpenEditProfileModal(false);
  };

  return (
    <div className="profile-wrapper">
      <Card className="profile-details-top profile-card" bordered={false}>
        <div>
          <div className="avatar-container">
            <Avatar
              size="large"
              className="avatar"
              icon={<UserOutlined size={120} />}
            />
          </div>
          <Typography.Title className="title">
            {currentUserProfile.name}
          </Typography.Title>
          {!applicant ? (
            <Button
              type="link"
              className="edit-profile"
              onClick={editProfileHandler}
              title="Edit profile"
            >
              Edit profile
            </Button>
          ) : null}
          <Modal
            className="edit-profile-modal"
            open={openEditProfileModal}
            onOk={saveProfileHandler}
            onCancel={cancelHandler}
            okText="Save"
            cancelButtonProps={{
              size: 'large',
              className: 'cancel-button'
            }}
            okButtonProps={{
              loading: isEditProfileLoading,
              size: 'large',
              className: 'create-button'
            }}
          >
            <EditJob
              editProfileFormData={editProfileFormData}
              setEditProfileFormData={setEditProfileFormData}
            />
          </Modal>
        </div>
        <Typography.Paragraph>{currentUserProfile.email}</Typography.Paragraph>
        {currentUserProfile.userDetails?.contact ? (
          <Typography.Paragraph>
            {currentUserProfile.userDetails?.contact}
          </Typography.Paragraph>
        ) : null}
        {currentUserProfile.userDetails?.location ? (
          <Typography.Paragraph>
            {currentUserProfile.userDetails?.location}
          </Typography.Paragraph>
        ) : null}
        {currentUserProfile.userDetails?.companyName ? (
          <Typography.Paragraph>
            {currentUserProfile.userDetails?.companyName}
          </Typography.Paragraph>
        ) : null}
        {renderSkills()}
      </Card>
      {!isRecruiter && !applicant ? (
        <Card
          title={
            <Typography.Paragraph strong className="applied-jobs-title">
              Applied Jobs
            </Typography.Paragraph>
          }
          className="applied-jobs profile-card"
        >
          {renderJobs()}
        </Card>
      ) : null}
      {!isRecruiter ? (
        <Card
          title={
            <Typography.Paragraph strong className="github-repos-title">
              GitHub Repos
            </Typography.Paragraph>
          }
          className="github-repos profile-card"
        >
          {renderRepos()}
        </Card>
      ) : null}
    </div>
  );
};

export default Profile;
