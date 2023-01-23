import { Switch, Typography } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAppStore } from '../../stores';
import { NavLinks } from './nav-links';

import './styles.scss';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const location = useLocation();
  const isRoot = location.pathname === ROUTES.ROOT;

  return (
    <nav id="navbar" className={`navbar ${isRoot ? 'white-text' : ''}`}>
      <div className="logo">
        <Typography.Text title="Get your dream job :)">
          <Link to={ROUTES.ROOT}>GYDJ</Link>
        </Typography.Text>
      </div>
      <div className="links">
        <NavLinks />
        <Switch onClick={toggleTheme} checked title="Change theme" disabled />
      </div>
    </nav>
  );
};

export default Navbar;
