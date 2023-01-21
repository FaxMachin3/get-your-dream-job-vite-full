import { ConfigProvider, theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../stores/useThemeStore';
import { THEME } from '../types/common-types';
import LandingPageContainer from './landing-page/landing-page-container';
import Navbar from './navbar';

// Todo: add dark theme support

function App() {
    const isDarkTheme = useThemeStore((state) => state.isDarkTheme);

    const antConfig: ThemeConfig = useMemo(
        () => ({
            token: {
                colorPrimary: '#6C63FF',
                colorLink: '#6C63FF',
                fontFamily: '"Montserrat", sans-serif',
                borderRadiusLG: 5,
                borderRadiusOuter: 5,
                borderRadiusSM: 5,
                borderRadiusXS: 5,
                boxShadow: '0 0 10px 1px #f5f5ff',
                boxShadowSecondary: '0 0 10px 1px #f5f5ff',
                colorLinkHover: '#6C63FF',
                linkHoverDecoration: 'underline',
                colorInfoActive: '#6C63FF',
                colorBorder: '#6961ff1a',
                colorBorderSecondary: '#6961ff1a',
                // Todo: change modal box shadow
                // Todo: add card hover mod
            },
            algorithm:
                isDarkTheme === THEME.DARK
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
        }),
        [isDarkTheme]
    );

    return (
        <ConfigProvider theme={antConfig}>
            <Navbar />
            <LandingPageContainer />
            <Outlet />
        </ConfigProvider>
    );
}

export default App;
