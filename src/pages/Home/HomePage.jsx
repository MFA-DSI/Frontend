// HomePage.jsx
import React, {lazy, Suspense} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MainLayout from "../Layout/MainLayout";
import {Skeleton} from "antd"; // Import Skeleton from Ant Design
import {useLocation} from "react-router-dom";
import { useActivitiesContext, useMissionContext } from "../../providers";

const TableComponent = lazy(() => import("../../components/Table/Table")); 

const HomePage = () => {
  const {filteredMissions} = useMissionContext();
  const {filteredActivities} = useActivitiesContext();
  
  return (
    <MainLayout>
      <h2 style={{marginTop: "20px", paddingTop: "20px"}}>
        Toutes les Directions
      </h2>
      <TableComponent mode="all" dataMission={filteredMissions} dataActivities={filteredActivities} />
    </MainLayout>
  );
};

export default HomePage;
