import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Input, Form, Typography, Button, message, Card } from 'antd';
import { Link } from 'react-router-dom';
import { ERROR, ROUTES, USER_TYPE } from '../../constants';
import { useAppStore } from '../../stores';
import { IUser, IUserDetails } from '../../types/common-types';
import { useSignUp } from '../../hooks/mutation';

import './styles.scss';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const { userToken, setUserToken } = useAppStore((state) => ({
    setUserToken: state.setUserToken,
    userToken: state.userToken
  }));
  const {
    mutate: signUpMutate,
    isError: isSignUpError,
    isLoading: isSignUpLoading
  } = useSignUp(setUserToken);

  const location = useLocation();
  const isRecruiter: boolean = location.pathname === ROUTES.RECRUITER_SIGN_UP;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    githubUsername: ''
  });
  const {
    name,
    email,
    password,
    confirmPassword,
    githubUsername,
    companyName
  } = formData;

  if (userToken) {
    return <Navigate to={ROUTES.JOB_LISTING} />;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const getUserDetails = () => {
    if (isRecruiter) {
      return {
        type: USER_TYPE.RECRUITER,
        companyName
      };
    }

    return {
      type: USER_TYPE.CANDIDATE,
      appliedTo: [],
      skills: [],
      githubUsername
    };
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (password !== confirmPassword) {
      return message.error({
        content: ERROR.PASSWORD_MISMATCH
      });
    }

    const payload: Partial<IUser> = {
      name,
      email,
      password,
      userDetails: { ...getUserDetails() } as IUserDetails
    };

    signUpMutate(payload as IUser);
  };

  return (
    <div className="sign-up-wrapper">
      <Card className="sign-up-content" bordered={false}>
        <Typography.Title className="title">Sign Up</Typography.Title>
        <Form
          name="sign-up"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="on"
        >
          <Form.Item label="Name" name="name">
            <Input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={name}
              onChange={onChange}
              size="large"
              required
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              name="email"
              placeholder="e.g. john.doe@xyz.com"
              value={email}
              onChange={onChange}
              size="large"
              required
            />
          </Form.Item>
          {isRecruiter ? (
            <Form.Item label="Your Company Name" name="companyName">
              <Input
                type="text"
                name="companyName"
                placeholder="e.g. Intuit or Zerodha"
                value={companyName}
                onChange={onChange}
                size="large"
                required
              />
            </Form.Item>
          ) : (
            <Form.Item label="Github Username" name="githubUsername">
              <Input
                type="text"
                name="githubUsername"
                placeholder="Your GitHub username"
                value={githubUsername}
                size="large"
                onChange={onChange}
              />
            </Form.Item>
          )}
          <Form.Item label="Password" name="password">
            <Input.Password
              type="password"
              className="password-input"
              name="password"
              placeholder="Set a password"
              minLength={6}
              value={password}
              onChange={onChange}
              size="large"
              required
            />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword">
            <Input.Password
              type="password"
              className="password-input"
              name="confirmPassword"
              placeholder="Retype to confirm"
              minLength={6}
              value={confirmPassword}
              onChange={onChange}
              size="large"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSignUpLoading}
              title="Sign up"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <div className="sign-up-footer">
          <Typography.Paragraph>
            Already have an account?{' '}
            <Link title="Login" to={ROUTES.LOGIN}>
              Login
            </Link>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Link
              title={isRecruiter ? 'Candidate Sign-up' : 'Recruiter Sign-up'}
              to={
                isRecruiter
                  ? ROUTES.CANDIDATE_SIGN_UP
                  : ROUTES.RECRUITER_SIGN_UP
              }
            >
              {isRecruiter ? 'Candidate Sign-up' : 'Recruiter Sign-up'}
            </Link>
          </Typography.Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
