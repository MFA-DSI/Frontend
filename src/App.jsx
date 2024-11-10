import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthWrapper } from "./components/Auth/auth-wrapper";
import {
  PrivateWrapper,
  SuperAdminWrapper,
} from "./components/Auth/private-wrapper";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import MyDirection from "./pages/MyDirection/MyDirection";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/LoginPage";
import ReportMission from "./pages/ReportMission/ReportMission";
import FirstLoginPage from "./pages/Login/FirstLoginPage";
import { HackWebProviders } from "./providers";
import Statistics from "./pages/Statistics/Statistics";
import { useAuthStore } from "./hooks";
import StaffWrapper, { AdminWrapper, RoleWrapper } from "./components/Auth/admin-wrapper";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const role = useAuthStore.getState().role;
  const isStaff = useAuthStore.getState().isStaff;
  return (
    <QueryClientProvider client={queryClient}>
      <HackWebProviders>
        <ToastContainer />

        <Routes location={location}>
          <Route path="/" element={<AuthWrapper />}>
            <Route
              index
              path="/"
              element={
                <AdminWrapper role={role}>
                  <HomePage />
                </AdminWrapper>
              }
            />
            <Route
              path="allDirection"
              element={
                <RoleWrapper role={role}>
                  <HomePage />
                </RoleWrapper>
              }
            />
            <Route path="myDirection" element={<MyDirection />} />
            <Route path="reports" element={<ReportMission />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="statistics"
              element={
                <StaffWrapper isStaff={isStaff}>
                    <Statistics />
                </StaffWrapper>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <PrivateWrapper>
                <LoginPage />
              </PrivateWrapper>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <PrivateWrapper>
                <FirstLoginPage />
              </PrivateWrapper>
            }
          ></Route>
        </Routes>
      </HackWebProviders>
    </QueryClientProvider>
  );
}

export default App;
