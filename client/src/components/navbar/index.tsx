import { Typography } from 'antd';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { NavLinks } from './nav-links';

import './styles.scss';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const location = useLocation();
    const isRoot = location.pathname === ROUTES.ROOT;

    return (
        <nav id="navbar" className={`navbar ${isRoot ? 'white-text' : ''}`}>
            <div className="logo">
                <Typography.Text>
                    <Link to="/">GYDJ</Link>
                </Typography.Text>
            </div>
            <div className="links">
                <NavLinks />
            </div>
        </nav>
    );
};

export default Navbar;
