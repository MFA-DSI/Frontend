import React,{lazy} from "react";
import MainLayout from "../Layout/MainLayout";


const NotificationComponenents = lazy(() => import("../../components/Notification/Notification")); 
const Notification = () => {
  return (
    <MainLayout>
      <NotificationComponenents />
    </MainLayout>
  );
};

export default Notification;
