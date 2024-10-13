import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthWrapper } from "./components/Auth/auth-wrapper";
import { PrivateWrapper } from "./components/Auth/private-wrapper";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import MyDirection from "./pages/MyDirection/MyDirection";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/LoginPage";
import ReportMission from "./pages/ReportMission/ReportMission";

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
          <Route path="reports" element={<ReportMission />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} /> 
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
