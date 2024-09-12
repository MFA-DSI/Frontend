// ActivityContext.js
import React, {createContext, useContext, useState} from "react";
import {useMissions} from "../../hooks/useMissions";

const MissionContext = createContext();

export const MissionProvider = ({children}) => {
  const {data: missions, isLoading} = useMissions();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMissions = () => {
    if (!missions) return [];

    let filtered = missions;

    // Filter by description or performance realization based on the search term
    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          activity.activityList.some((a) =>
            a.performanceRealization.some((r) =>
              r.realization.toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
      );
    }

    // Additional filter logic could be applied here based on filterType

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
