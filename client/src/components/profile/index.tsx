import {
    Avatar,
    Button,
    Card,
    Empty,
    Modal,
    notification,
    Skeleton,
    Tag,
    Typography,
} from 'antd';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES, STORE, USER_TYPE } from '../../constants';
import { UserOutlined } from '@ant-design/icons';
import EditJob from '../edit-profile';
import { ERROR } from '../../utils/fake-apis-utils';
import { validateEmail } from '../../utils/common';
import Jobs from '../jobs';
import { useAppStore } from '../../stores';
import { IUser } from '../../types/common-types';

import './styles.scss';
import { useQuery } from '@tanstack/react-query';
import { getUserGitHubRepos } from '../../apis/user';
import { getAppliedJobs } from '../../apis/job';

interface ProfileProps {
    applicant?: IUser;
}

const Profile: React.FC<ProfileProps> = ({ applicant }) => {
    const currentUser = useAppStore((state) => state.currentUser);
    const {
        data: appliedJobs,
        isLoading: isAppliedJobLoading,
        isError: isAppliedJobError,
    } = useQuery(
        [STORE.SUB_STORE.APPLIED_JOBS],
        () => getAppliedJobs({ offset: 0, pageSize: 5 }),
        {
            enabled: !!currentUser,
        }
    );
    const currentUserProfile = applicant ?? currentUser;
    const isRecruiter =
        currentUserProfile?.userDetails?.type === USER_TYPE.RECRUITER;
    const {
        data: gitHubRepos,
        isLoading: isFetchingRepos,
        isError: isRepoFetchingError,
    } = useQuery(
        [STORE.SUB_STORE.USER_REPOS],
        () => getUserGitHubRepos(currentUser?.userDetails?.githubUsername),
        {
            enabled: !!currentUser && !isRecruiter,
            retry: 0,
        }
    );
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [isOkLoading, setIsOkLoading] = useState(false);
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
            githubUsername:
                currentUserProfile?.userDetails?.githubUsername ?? '',
            skills: currentUserProfile?.userDetails?.skills ?? [],
            appliedTo: currentUserProfile?.userDetails?.appliedTo ?? [],
            companyName: currentUserProfile?.userDetails?.companyName ?? '',
        },
    });

    if (!currentUserProfile) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    console.log(appliedJobs);

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

        if (
            isRepoFetchingError ||
            !gitHubRepos ||
            gitHubRepos.data?.length === 0
        ) {
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

    const createJobHandler = () => {
        if (!validateEmail(editProfileFormData.email as string)) {
            notification['error']({
                message: '',
                description: ERROR.INVALID_EMAIL,
                placement: 'topRight',
            });
            return;
        }

        if (!editProfileFormData.name || !editProfileFormData.email) {
            notification['error']({
                message: '',
                description: ERROR.CHECK_FORM_DATA,
                placement: 'topRight',
            });
            return;
        }

        if (
            editProfileFormData.password !== editProfileFormData.confirmPassword
        ) {
            notification['error']({
                message: '',
                description: ERROR.PASSWORD_MISMATCH,
                placement: 'topRight',
            });
            return;
        }

        setIsOkLoading(true);

        const payload = {
            ...editProfileFormData,
        };

        delete payload.confirmPassword;
        if (!payload.password) delete payload.password;

        // updateUser(currentUserProfile.email, payload)
        //     .then(() => {
        //         setOpenEditProfileModal(false);
        //         setIsOkLoading(false);
        //         setCurrentUserAndLocalStorage?.({
        //             ...payload,
        //             id: currentUserProfile.id,
        //         } as User);
        //         notification['info']({
        //             message: '',
        //             description: SUCCESS.PROFILE_SAVED,
        //             placement: 'bottomRight',
        //         });
        //     })
        //     .catch(() => {
        //         setOpenEditProfileModal(false);
        //         setIsOkLoading(false);
        //     });
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
                        onOk={createJobHandler}
                        onCancel={cancelHandler}
                        okText="Save"
                        cancelButtonProps={{
                            size: 'large',
                            className: 'cancel-button',
                        }}
                        okButtonProps={{
                            loading: isOkLoading,
                            size: 'large',
                            className: 'create-button',
                        }}
                    >
                        <EditJob
                            editProfileFormData={editProfileFormData}
                            setEditProfileFormData={setEditProfileFormData}
                        />
                    </Modal>
                </div>
                <Typography.Paragraph>
                    {currentUserProfile.email}
                </Typography.Paragraph>
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
                        <Typography.Paragraph
                            strong
                            className="applied-jobs-title"
                        >
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
                        <Typography.Paragraph
                            strong
                            className="github-repos-title"
                        >
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
