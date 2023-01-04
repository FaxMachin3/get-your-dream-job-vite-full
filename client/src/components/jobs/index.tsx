import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    notification,
    Typography,
    Modal,
    Collapse,
    Tag,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Job, updateJob } from '../../fake-apis/job-listing-apis';

import './styles.scss';
import { ERROR, SUCCESS } from '../../utils/fake-apis-utils';
import { getAppliedUsers, updateUser, User } from '../../fake-apis/user-apis';
import { UserContext } from '../../contexts/UserContext';
import { ROUTES, USER_TYPE } from '../../constants';
import { useLocation } from 'react-router-dom';
import Loader from '../loader';
import Profile from '../profile';

interface JobsProps {
    data: Array<Job>;
}

const EVENTS = {
    APPLY: 'Apply',
    NOT_INTERESTED: 'Not interested',
    APPLICANTS: 'Applicants',
    CARD: 'card',
};

const Jobs: React.FC<JobsProps> = ({ data }) => {
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
    const location = useLocation();
    const isRecruiter = currentUser?.userDetails.type === USER_TYPE.RECRUITER;
    const isProfileRoute = location.pathname === ROUTES.PROFILE;
    const [jobApplicants, setJobApplicants] = useState<string[]>([]);
    const [jobApplicantsData, setJobApplicantsData] = useState<User[]>([]);
    const [isApplicantsDataLoading, setIsApplicantsDataLoading] =
        useState<boolean>(true);
    const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
    const [isApplicantsModalOpen, setIsApplicantsModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        if (jobApplicants.length > 0) {
            getAppliedUsers(jobApplicants)
                .then((data) => {
                    setJobApplicantsData(data);
                    setIsApplicantsDataLoading(false);
                })
                .catch(() => setIsApplicantsDataLoading(false));
        }
    }, [jobApplicants]);

    const openJobModal = () => {
        setIsJobModalOpen(true);
    };

    const handleJobOk = () => {
        setIsJobModalOpen(false);
    };

    const handleJobCancel = () => {
        setIsJobModalOpen(false);
    };

    const openApplicantsModal = (
        e: React.MouseEvent<HTMLParagraphElement>,
        applicants: string[] = []
    ) => {
        e.stopPropagation();
        setJobApplicants(applicants);
        setIsApplicantsModalOpen(true);
    };

    const handleApplicantsOk = () => {
        setIsApplicantsModalOpen(false);
    };

    const handleApplicantsCancel = () => {
        setIsApplicantsDataLoading(true);
        setJobApplicants([]);
        setIsApplicantsModalOpen(false);
    };

    const onApplyClickHandler = async (
        e: React.MouseEvent<HTMLButtonElement>,
        jobId: string
    ) => {
        e.stopPropagation();

        const newPayload = {
            ...currentUser,
            userDetails: {
                ...currentUser?.userDetails,
                appliedTo: [
                    ...(currentUser?.userDetails.appliedTo as []),
                    jobId,
                ],
            },
        };

        setCurrentUserAndLocalStorage?.(newPayload as User);

        if (currentUser) {
            try {
                await updateUser(currentUser.email, newPayload as User);
                await updateJob(jobId, { applicants: [currentUser.id] });

                notification['success']({
                    message: '',
                    description: SUCCESS.JOB_APPLIED,
                    placement: 'bottomRight',
                });
            } catch (error) {}
        }
    };

    const onNotInterestedClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        _jobId: string
    ) => {
        e.stopPropagation();
        notification['info']({
            message: '',
            description: ERROR.FEATURE_INCOMING,
            placement: 'bottomRight',
        });
    };

    const onCardElementsClick = (e: any) => {
        const { target } = e;

        switch (target.dataset.event) {
            case EVENTS.APPLY:
                onApplyClickHandler(e, target.dataset.details);
                break;
            case EVENTS.NOT_INTERESTED:
                onNotInterestedClickHandler(e, target.dataset.details);
                break;
            case EVENTS.APPLICANTS:
                openApplicantsModal(e, target.dataset.details.split(','));
                break;
            default:
                openJobModal();
        }
    };

    return (
        <>
            <main className="job-listing" onClick={onCardElementsClick}>
                {data.map(
                    ({
                        id: jobId,
                        companyName,
                        contact,
                        location,
                        description,
                        title,
                        applicants,
                        tags,
                    }) => {
                        return (
                            <Card
                                className="job-card"
                                key={jobId}
                                hoverable
                                bordered={false}
                                data-event={EVENTS.CARD}
                            >
                                <div
                                    className={`content ${
                                        !isRecruiter && !isProfileRoute
                                            ? 'content-candidate'
                                            : ''
                                    }`}
                                >
                                    <div className="logo">
                                        <Avatar
                                            size="large"
                                            className="logo-image"
                                            icon={<UserOutlined />}
                                        />
                                    </div>
                                    <div className="job-details">
                                        <Typography.Paragraph className="title">
                                            <span>
                                                {companyName} - {title}
                                            </span>
                                            {isRecruiter &&
                                            applicants.length > 0 ? (
                                                <Typography.Text
                                                    className="applicants"
                                                    data-event={
                                                        EVENTS.APPLICANTS
                                                    }
                                                    data-details={applicants.join(
                                                        ','
                                                    )}
                                                >
                                                    ({applicants.length}{' '}
                                                    applicant
                                                    {applicants.length > 1
                                                        ? 's'
                                                        : ''}
                                                    )
                                                </Typography.Text>
                                            ) : null}
                                        </Typography.Paragraph>
                                        <Typography.Paragraph italic>
                                            Job available in {location}
                                            <Typography.Paragraph className="contact">
                                                {contact
                                                    ? `Contact - ${contact}`
                                                    : ''}
                                            </Typography.Paragraph>
                                        </Typography.Paragraph>
                                        <Typography.Paragraph
                                            ellipsis={{
                                                expandable: false,
                                                rows: 2,
                                            }}
                                        >
                                            {description}
                                        </Typography.Paragraph>
                                        <Typography.Paragraph
                                            className="tags"
                                            ellipsis
                                        >
                                            {tags.map((tag) => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </Typography.Paragraph>
                                    </div>
                                </div>
                                {!isRecruiter && !isProfileRoute ? (
                                    <div className="action-center">
                                        <Button
                                            type="primary"
                                            size="large"
                                            data-event={EVENTS.APPLY}
                                            data-details={jobId}
                                        >
                                            <span
                                                data-event={EVENTS.APPLY}
                                                data-details={jobId}
                                            >
                                                Apply
                                            </span>
                                        </Button>
                                        {/* Todo */}
                                        <Button
                                            type="link"
                                            size="large"
                                            data-event={EVENTS.NOT_INTERESTED}
                                            data-details={jobId}
                                        >
                                            <span
                                                data-event={
                                                    EVENTS.NOT_INTERESTED
                                                }
                                                data-details={jobId}
                                            >
                                                Not interested
                                            </span>
                                        </Button>
                                    </div>
                                ) : null}
                            </Card>
                        );
                    }
                )}
            </main>
            <Modal
                open={isJobModalOpen}
                onOk={handleJobOk}
                onCancel={handleJobCancel}
            >
                {/* Todo */}
                {ERROR.FEATURE_INCOMING}
            </Modal>
            <Modal
                className="applicants-modal"
                open={isApplicantsModalOpen}
                onOk={handleApplicantsOk}
                onCancel={handleApplicantsCancel}
                cancelText="Close"
                okButtonProps={{ className: 'applicantsOkButton' }}
            >
                {isApplicantsDataLoading ? (
                    <Loader />
                ) : (
                    <Collapse>
                        {jobApplicantsData.map((applicant) => (
                            <Collapse.Panel
                                header={applicant.name}
                                key={applicant.id}
                            >
                                <Profile applicant={applicant} />
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                )}
            </Modal>
        </>
    );
};

export default Jobs;
