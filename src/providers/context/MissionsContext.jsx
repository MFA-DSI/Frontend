import React, { createContext, useContext, useState } from "react";
import { useMissions } from "../../hooks/useMissions"; 

const MissionContext = createContext();

export const MissionProvider = ({ children }) => {
  const {
    missions,
    isLoading,
    deleteMission,
    directionIdQuery,
    directionMissionsName,
    getWeeklyMissions,
    getMonthMissions,
    getQuarterlyMissions,
    saveMission,
    updateMission,
  } = useMissions();

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
                .includes(searchTerm.toLowerCase()),
            ),
          ),
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

  const directionMission = () => {
    return directionIdQuery().data;
  };
  const missionName = () => {
    return directionMissionsName().data;
  };

  return (
    <MissionContext.Provider
      value={{
        filteredMissions: filteredMissions(),
        MissionByDirectionId: directionMission(),
        MissionNameByDirectionId: missionName(),
        getQuarterlyMissions,
        getMonthMissions,
        getWeeklyMissions,
        deleteMission,
        saveMission,
        updateMission,
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
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error(
      "useMissionContext must be used within a DirectionProvider",
    );
  }

  return context;
};
