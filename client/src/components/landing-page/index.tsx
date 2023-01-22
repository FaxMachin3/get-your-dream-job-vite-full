import React, { useContext } from 'react';
import { Button, Typography, Image } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import backdrop from '../../assets/job-offer.svg';
import { useAppStore } from '../../stores';

import './styles.scss';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
    const userToken = useAppStore((state) => state.userToken);
    const navigate = useNavigate();

    if (userToken) {
        return <Navigate to={ROUTES.JOB_LISTING} />;
    }

    const onSignUpClick = (route: string) => () => navigate(route);

    return (
        <section className="landing">
            <div className="landing-text">
                <div className="landing-content">
                    <Typography.Title>
                        Join us to get your dream job now!
                    </Typography.Title>
                    <Typography.Paragraph className="sub-title">
                        The voyage of discovery is not in looking for new
                        landscapes, but in looking with new eyes.
                    </Typography.Paragraph>
                    <div className="button-container">
                        <Button
                            type="default"
                            className="sign-up-btn"
                            size="large"
                            title="Recruiter sign-up"
                            onClick={onSignUpClick(ROUTES.RECRUITER_SIGN_UP)}
                        >
                            Recruiter sign-up
                        </Button>
                        <Button
                            type="primary"
                            className="sign-up-btn"
                            size="large"
                            title="Candidate sign-up"
                            onClick={onSignUpClick(ROUTES.CANDIDATE_SIGN_UP)}
                        >
                            Candidate sign-up
                        </Button>
                    </div>
                </div>
            </div>
            <div className="backdrop">
                <Image
                    loading="eager"
                    src={backdrop}
                    preview={false}
                    alt="backdrop"
                />
            </div>
        </section>
    );
};

export default LandingPage;
