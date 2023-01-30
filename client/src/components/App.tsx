import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '../stores';
import { THEME } from '../types/common-types';
import LandingPageContainer from './landing-page/landing-page-container';
import Navbar from './navbar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1800000, refetchOnWindowFocus: false }
  }
});

// Todo: add dark theme support
function App() {
  const isDarkTheme = useAppStore((state) => state.isDarkTheme);

  const antConfig: ThemeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: '#6C63FF',
        colorLink: '#6C63FF',
        fontFamily: 'Montserrat, "Open Sans", Helvetica, Arial, sans-serif',
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
        colorBorderSecondary: '#6961ff1a'
        // Todo: change modal box shadow
        // Todo: add card hover mod
      },
      algorithm:
        isDarkTheme === THEME.DARK
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm
    }),
    [isDarkTheme]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antConfig}>
        <Navbar />
        <LandingPageContainer />
        <Outlet />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
