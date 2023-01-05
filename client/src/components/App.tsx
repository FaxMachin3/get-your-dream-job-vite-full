import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import { LadingPageContainer } from './landing-page/lading-page-container';
import Navbar from './navbar';

const antConfig = {
    token: {
        colorPrimary: '#6C63FF',
        colorLink: '#6C63FF',
        fontFamily: '"Montserrat", sans-serif',
        borderRadiusLG: 5,
        borderRadiusOuter: 5,
        borderRadiusSM: 5,
        borderRadiusXS: 5,
    },
};

function App() {
    return (
        <ConfigProvider theme={antConfig}>
            <Navbar />
            <LadingPageContainer />
            <Outlet />
        </ConfigProvider>
    );
}

export default App;
