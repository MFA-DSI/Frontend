import React, { lazy } from "react";
import MainLayout from "../Layout/MainLayout";

const StatisticsComponent = lazy(
  () => import("../../components/Statistics/StatisticsComponent"),
);
const Statistics = () => {
  return (
    <MainLayout>
      <StatisticsComponent />
    </MainLayout>
  );
};

export default Statistics;
