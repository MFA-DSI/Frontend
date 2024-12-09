// MyDirection.js
import React, { useState, lazy } from "react";
import { Button } from "antd";

import AddMissionModal from "../../components/Modal/AddMission";
import { useActivitiesContext, useMissionContext } from "../../providers";
import { DirectionName } from "../../components";

const TableComponent = lazy(() => import("../../components/Table/Table"));
const MainLayout = lazy(() => import("../Layout/MainLayout"));
const MyDirection = () => {
  const [isAddMissionModalVisible, setIsAddMissionModalVisible] =
    useState(false);
  const { MissionByDirectionId } = useMissionContext();
  const { directionIdQueryActvities } = useActivitiesContext();
  const [filterData, setFilterData] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const handleFilter = (data) => {
    setFilterData(data);
    setFiltered(true);
  };

  const resetFilter = () => {
    setFiltered(false);
  };

  const showAddMissionModal = () => {
    setIsAddMissionModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsAddMissionModalVisible(false);
  };

  return (
    <MainLayout>
      <div>
        <DirectionName></DirectionName>
        <Button
          type="primary"
          style={{ position: "fixed", left: "210px" }}
          onClick={showAddMissionModal}
        >
          Ajouter une Activité
        </Button>
        <TableComponent
          mode="mydirection"
          dataMission={filtered ? filterData : MissionByDirectionId}
          dataActivities={filtered ? filterData : directionIdQueryActvities}
          onFilter={handleFilter}
          filtered={filtered}
          onReset={resetFilter}
          filterData={filterData}
        />
      </div>
      <AddMissionModal
        visible={isAddMissionModalVisible}
        onCancel={handleCloseModal}
      />
    </MainLayout>
  );
};

export default MyDirection;
