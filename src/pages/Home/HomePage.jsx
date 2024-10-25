import React, {lazy, useState} from "react";
import MainLayout from "../Layout/MainLayout";
import {useActivitiesContext, useMissionContext} from "../../providers";

const TableComponent = lazy(() => import("../../components/Table/Table"));

const HomePage = () => {
  const {filteredMissions} = useMissionContext();
  const {filteredActivities} = useActivitiesContext();
  const [filterData, setFilterData] = useState([]);
  const [filtered, setFiltered] = useState(false); // Boolean to track filter status

  // Handle setting filtered data and update filter status
  const handleFilter = (data) => {
    setFilterData(data);
    setFiltered(true); // Enable filtered mode
  };

  return (
    <MainLayout>
      <h2 style={{marginTop: "20px", paddingTop: "20px"}}>
        Toutes les Directions
      </h2>
      <TableComponent 
        mode="all" 
        dataMission={filtered ? filterData : filteredMissions} 
        dataActivities={filtered ? filterData : filteredActivities} 
        onFilter={handleFilter} 
        filterData={filterData} 
      />
    </MainLayout>
  );
};

export default HomePage;
