import React, {createContext, useContext, useState} from "react";
import {useActivities} from "../../hooks";

const ActivityContext = createContext();

export const ActivitieProvider = ({children}) => {
  const {data: activities, isLoading} = useActivities();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = () => {
    if (!activities) return [];

    let filtered = activities;

    console.log("filtered: " + filtered);

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

    return filtered;
  };

  return (
    <ActivityContext.Provider
      value={{
        filteredActivities: filteredActivities(),
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
