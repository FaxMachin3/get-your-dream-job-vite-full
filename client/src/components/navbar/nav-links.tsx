import { Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { navLinksWrapper } from '../../utils/common';

export const NavLinks = () => {
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
    const navigate = useNavigate();

    const onLogout = () => {
        setCurrentUserAndLocalStorage?.(null);
        navigate(ROUTES.ROOT);
    };

    const navs = navLinksWrapper({ onLogout });

    if (!currentUser) {
        return (
            <>
                {navs.NON_USER_NAVS.map(({ title, to }) => (
                    <Typography.Text className="sub-links">
                        <Link to={to}>{title}</Link>
                    </Typography.Text>
                ))}
            </>
        );
    }

    return (
        <>
            {navs.USER_NAVS.map(({ title, to, onClick }) => (
                <Typography.Text className="sub-links">
                    <Link to={to} onClick={onClick}>
                        {title}
                    </Link>
                </Typography.Text>
            ))}
        </>
    );
};
