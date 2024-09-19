// MyDirection.js
import React, {useState} from "react";
import {Button} from "antd";
import MainLayout from "../Layout/MainLayout";
import TableComponent from "../../components/Table/Table";
import AddActivityModal from "../../components/Modal/AddMission";

const MyDirection = () => {
  const [isAddActivityModalVisible, setIsAddActivityModalVisible] =
    useState(false);

  const showAddActivityModal = () => {
    setIsAddActivityModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsAddActivityModalVisible(false);
  };

  return (
    <MainLayout>
      <div>
        <h2>La direction </h2>
        <Button
          type="primary"
          style={{position: "fixed", left: "210px"}}
          onClick={showAddActivityModal}
        >
          Ajouter une Activité
        </Button>
        <TableComponent mode="mydirection" />
      </div>
      <AddActivityModal
        visible={isAddActivityModalVisible}
        onCancel={handleCloseModal}
      />
    </MainLayout>
  );
};

export default MyDirection;
