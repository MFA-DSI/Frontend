// HomePage.jsx
import React, {lazy, Suspense} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MainLayout from "../Layout/MainLayout";
import {Skeleton} from "antd"; // Import Skeleton from Ant Design
import {useLocation} from "react-router-dom";

const TableComponent = lazy(() => import("../../components/Table/Table")); // Lazy load TableComponent

const HomePage = () => {
  return (
    <MainLayout>
      <h2>Toutes les  Directions</h2>
      <TableComponent mode="all" />
    </MainLayout>
  );
};

export default HomePage;
