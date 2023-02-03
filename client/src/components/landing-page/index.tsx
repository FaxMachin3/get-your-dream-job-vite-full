import React from 'react';
import { Button, Typography } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAppStore } from '../../stores';
import LandingSvg from '../../svg/landing-svg';

import './styles.scss';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const navigate = useNavigate();

  if (currentUser) {
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
            The voyage of discovery is not in looking for new landscapes, but in
            looking with new eyes.
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
        <LandingSvg />
      </div>
    </section>
  );
};

export default LandingPage;
