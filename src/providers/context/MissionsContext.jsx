import React, { createContext, useContext, useState } from "react";
import { useMissions } from "../../hooks/useMissions"; // Adjust the path as necessary

const MissionContext = createContext();

export const MissionProvider = ({ children }) => {
  const { missions, isLoading } = useMissions();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMissions = () => {
    if (!missions) return [];

    let filtered = missions;

    if (searchTerm) {
      filtered = filtered.filter(
        (mission) =>
          mission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mission.activityList.some((activity) =>
            activity.performanceRealization.some((realization) =>
              realization.realization.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <MissionContext.Provider
      value={{
        filteredMissions: filteredMissions(),
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