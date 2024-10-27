import React, { lazy } from "react";
import MainLayout from "../Layout/MainLayout";

const NotificationComponenent = lazy(
  () => import("../../components/Notification/Notification"),
);
const Notification = () => {
  return (
    <MainLayout>
      <NotificationComponenent />
    </MainLayout>
  );
};

export default Notification;
