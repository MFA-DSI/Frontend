import React, { lazy } from "react";
import MainLayout from "../Layout/MainLayout";

const NotificationComponent = lazy(
  () => import("../../components/Notification/Notification"),
);
const Notification = () => {
  return (
    <MainLayout>
      <NotificationComponent />
    </MainLayout>
  );
};

export default Notification;
