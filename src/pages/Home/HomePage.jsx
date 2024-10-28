import React, {lazy, useEffect, useState} from "react";
import MainLayout from "../Layout/MainLayout";
import {useActivitiesContext, useMissionContext} from "../../providers";

const TableComponent = lazy(() => import("../../components/Table/Table"));

const HomePage = () => {
  const {filteredMissions} = useMissionContext();
  const {filteredActivities} = useActivitiesContext();
  const [filterData, setFilterData] = useState([]);
  const [filtered, setFiltered] = useState(false); 
  
  const handleFilter = (data) => {
    setFilterData(data);
    setFiltered(true); 
  };

  const resetFilter =()=> {
    setFiltered(false)
  }

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
        filtered = {filtered}
        onReset = {resetFilter} 
        filterData={filterData} 
      />
    </MainLayout>
  );
};

export default HomePage;
