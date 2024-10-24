// MyDirection.js
import React, { useState } from "react";
import { Button } from "antd";
import MainLayout from "../Layout/MainLayout";
import TableComponent from "../../components/Table/Table";
import AddActivityModal from "../../components/Modal/AddMission";
import { useActivitiesContext, useDirectionsContext, useMissionContext } from "../../providers";
import { DirectionName } from "../../components";

const MyDirection = () => {
  const [isAddActivityModalVisible, setIsAddActivityModalVisible] =
    useState(false);
    const {MissionByDirectionId} = useMissionContext();
    const {directionIdQueryActvities} = useActivitiesContext();
  const showAddActivityModal = () => {
    setIsAddActivityModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsAddActivityModalVisible(false);
  };

  return (
    <MainLayout>
      <div>
        <DirectionName></DirectionName>
        <Button
          type="primary"
          style={{ position: "fixed", left: "210px" }}
          onClick={showAddActivityModal}
        >
          Ajouter une Activité
        </Button>
        <TableComponent mode="mydirection" dataMission={MissionByDirectionId} dataActivities={directionIdQueryActvities} />
      </div>
      <AddActivityModal
        visible={isAddActivityModalVisible}
        onCancel={handleCloseModal}
      />
    </MainLayout>
  );
};

export default MyDirection;
