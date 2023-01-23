import { useQueryClient } from '@tanstack/react-query';
import { Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, STORE } from '../../constants';
import { useAppStore } from '../../stores';
import { navLinksWrapper } from '../../utils/common';

export const NavLinks = () => {
    const queryClient = useQueryClient();
    const { currentUser, setUserToken, setCurrentUser } = useAppStore(
        (state) => ({
            currentUser: state.currentUser,
            setUserToken: state.setUserToken,
            setCurrentUser: state.setCurrentUser,
        })
    );
    const navigate = useNavigate();

    const onLogout = () => {
        setUserToken(null);
        setCurrentUser(null);
        queryClient.clear();
        navigate(ROUTES.ROOT);
    };

    const navs = navLinksWrapper({ onLogout });

    if (!currentUser) {
        return (
            <>
                {navs.NON_USER_NAVS.map(({ title, to }) => (
                    <Typography.Text
                        key={title}
                        title={title}
                        className="sub-links"
                    >
                        <Link to={to}>{title}</Link>
                    </Typography.Text>
                ))}
            </>
        );
    }

    return (
        <>
            {navs.USER_NAVS.map(({ title, to, onClick }) => (
                <Typography.Text
                    key={title}
                    title={title}
                    className="sub-links"
                >
                    <Link to={to} onClick={onClick}>
                        {title}
                    </Link>
                </Typography.Text>
            ))}
        </>
    );
};
