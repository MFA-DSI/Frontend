import React from "react";
import MainLayout from "../Layout/MainLayout";
import { lazy } from "react";

const ReportComponent = lazy(
  () => import("../../components/ReportMission/ReportComponent"),
);
const ReportMission = () => {
  return (
    <MainLayout>
      <ReportComponent />
    </MainLayout>
  );
};

export default ReportMission;
