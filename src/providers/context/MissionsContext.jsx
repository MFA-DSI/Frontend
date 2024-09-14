import React, {createContext, useContext, useState} from "react";
import {useMissions} from "../../hooks/useMissions"; // Adjust the path as necessary

const MissionContext = createContext();
const directionId = sessionStorage.getItem("directionId")

export const MissionProvider = ({children}) => {
  const {missions, isLoading, directionIdQuery} = useMissions();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data :directionMissions, isFetching } = directionIdQuery(directionId);

  const filteredMissions = () => {
    if (!missions) return [];

    let filtered = missions;

    if (searchTerm) {
      filtered = filtered.filter(
        (mission) =>
          mission.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          mission.activityList.some((activity) =>
            activity.performanceRealization.some((realization) =>
              realization.realization
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          )
      );
    }

    // Additional filter logic could be applied here based on filterType
    // Example: Implementing filterType logic (e.g., filtering by status)
    if (filterType !== "all") {
      // Apply filter based on filterType if needed
      // This part can be customized based on the actual use case
    }

    return filtered;
  };

  const directionMission = ()=>{
      if(!directionMissions) return [];
      let missions = directionMissions;
console.log("misison : "+ directionMissions);

      return missions;
  }
 
  return (
    <MissionContext.Provider
      value={{
        filteredMissions: filteredMissions(),
        MissionByDirectionId: directionMission(),
        isLoading,
        setFilterType,
        setSearchTerm,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMissionContext = () => {
  return useContext(MissionContext);
};
