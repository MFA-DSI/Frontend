import React, {createContext, useContext, useState} from "react";
import {useActivities} from "../../hooks";

const ActivityContext = createContext();

export const ActivitieProvider = ({children}) => {
  const {activities, directionIdQuery, isLoading} = useActivities();
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
  return useContext(ActivityContext);
};
