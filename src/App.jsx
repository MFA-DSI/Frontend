// App.js
import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthWrapper } from './components/Auth/auth-wrapper';
import { PrivateWrapper } from './components/Auth/private-wrapper';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; 
import { Skeleton} from 'antd';
import HomePage from './pages/Home/HomePage';
import MyDirection from './pages/MyDirection/MyDirection';
import Notification from './pages/Notification/Notification';
import Profile from './pages/Profile/Profile';
import LoginPage from './pages/Login/LoginPage';
const queryClient = new QueryClient();

function App() {
    const location = useLocation();

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
                            <Routes location={location}>
                                <Route path="/" element={<AuthWrapper />}>
                                    <Route index element={<HomePage />} />
                                    <Route path="myDirection" element={<MyDirection />} />
                                    <Route path="notifications" element={<Notification />} />
                                    <Route path="profile" element={<Profile />} />
                                </Route>
                                <Route path="/login" element={
                                    <PrivateWrapper>
                                        <LoginPage />
                                    </PrivateWrapper>
                                } />
                            </Routes>
            
        </QueryClientProvider>
    );
}

export default App;