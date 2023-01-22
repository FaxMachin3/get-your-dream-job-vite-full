import { useState } from 'react';
import { Input, Button, Typography, Form, Card } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLoginUser } from '../../hooks/useUserFetch';
import { useAppStore } from '../../stores';

import './styles.scss';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const { userToken, setUserToken } = useAppStore((state) => ({
        setUserToken: state.setUserToken,
        userToken: state.userToken,
    }));
    const { mutate, isLoading } = useLoginUser(setUserToken);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    if (userToken) {
        return <Navigate to={ROUTES.JOB_LISTING} />; // Todo: check why redirect doesn't work
    }

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (_event: React.FormEvent<HTMLFormElement>) => {
        mutate(formData);
    };

    return (
        <div className="login-wrapper">
            <Card className="login-content" bordered={false}>
                <Typography.Title className="title">Login</Typography.Title>
                <Form
                    name="login"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    autoComplete="on"
                >
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
                    <Form.Item label="Password" name="password">
                        <Input.Password
                            type="password"
                            className="password-input"
                            name="password"
                            placeholder="e.g. not your phone number"
                            minLength={6}
                            value={password}
                            onChange={onChange}
                            size="large"
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            loading={isLoading}
                            size="large"
                            htmlType="submit"
                            title="Login"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Typography.Paragraph>
                    Don't have an account?{' '}
                    <Link title="Sign-up" to={ROUTES.CANDIDATE_SIGN_UP}>
                        Sign-up
                    </Link>
                </Typography.Paragraph>
            </Card>
        </div>
    );
};

export default Login;
