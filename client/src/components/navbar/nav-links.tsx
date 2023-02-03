import { useQueryClient } from '@tanstack/react-query';
import { Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useResetAppStore } from '../../hooks/common';
import { useAppStore } from '../../stores';
import { navLinksWrapper } from '../../utils/common';

export const NavLinks = () => {
  const queryClient = useQueryClient();
  const userToken = useAppStore((state) => state.userToken);
  const resetAppStores = useResetAppStore();
  const navigate = useNavigate();

  const onLogout = () => {
    resetAppStores();
    queryClient.clear();
    navigate(ROUTES.ROOT);
  };

  const navs = navLinksWrapper({ onLogout });

  if (!userToken) {
    return (
      <>
        {navs.NON_USER_NAVS.map(({ title, to }) => (
          <Typography.Text key={title} title={title} className="sub-links">
            <Link to={to}>{title}</Link>
          </Typography.Text>
        ))}
      </>
    );
  }

  return (
    <>
      {navs.USER_NAVS.map(({ title, to, onClick, customClass }) => (
        <Typography.Text
          key={title}
          title={title}
          className={`sub-links ${customClass}`}
        >
          <Link to={to} onClick={onClick}>
            {title}
          </Link>
        </Typography.Text>
      ))}
    </>
  );
};
