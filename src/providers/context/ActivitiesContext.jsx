import React, {createContext, useContext, useState} from "react";
import {useActivities} from "../../hooks";

const ActivityContext = createContext();

export const ActivitieProvider = ({children}) => {
  const {
    activities,
    directionIdQuery,
    isLoading,
    deleteActivity,
    updateMissionActivity,
    addTask,
    addNextTask,
    addRecommendation,
    addPerformance,
    MissionsActivityIdQuery,
  } = useActivities();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = () => {
    if (!activities) return [];

    let filtered = activities;

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

    return filtered;
  };

  return (
    <ActivityContext.Provider
      value={{
        filteredActivities: filteredActivities(),
        directionIdQueryActvities: directionIdQuery().data,
        deleteActivity: deleteActivity,
        updateMissionActivity,
        addTaskToActivty: addTask,
        addNextTask: addNextTask,
        addPerformance: addPerformance,
        addRecommendation: addRecommendation,
        activityIdQuery: MissionsActivityIdQuery,
        isLoading,
        setFilterType,
        setSearchTerm,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivitiesContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "useActivitiesContext must be used within a DirectionProvider"
    );
  }

  return context;
};
