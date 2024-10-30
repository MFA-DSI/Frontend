import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthWrapper } from "./components/Auth/auth-wrapper";
import { PrivateWrapper, SuperAdminWrapper } from "./components/Auth/private-wrapper";
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

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const role = useAuthStore.getState().role;
  return (
    <QueryClientProvider client={queryClient}>
      <HackWebProviders>
        <ToastContainer />

        <Routes location={location}>
          <Route path="/" element={<AuthWrapper />}>
            <Route
              index
              element={
                role === "SUPER_ADMIN" ? (
                  <Navigate to="/allDirection" replace />
                ) : (
                  <Navigate to="/myDirection" replace />
                )
              }
            />
            <Route path="allDirection" element={<HomePage />} />
            <Route path="myDirection" element={<MyDirection />} />
            <Route path="reports" element={<ReportMission />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<FirstLoginPage />} />
        </Routes>
      </HackWebProviders>
    </QueryClientProvider>
  );
}

export default App;
