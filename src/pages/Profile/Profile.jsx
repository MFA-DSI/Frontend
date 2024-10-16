import React, { lazy } from "react";
import MainLayout from "../Layout/MainLayout";

const ProfileComponent = lazy(
  () => import("../../components/Profile/ProfileComponent"),
);
const Profile = () => {
  return (
    <MainLayout>
      <ProfileComponent />
    </MainLayout>
  );
};

export default Profile;
