// ActivityContext.js
import React, { createContext, useContext, useState } from "react";
import { useMissions } from "../../hooks/useMissions";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { data: activities, isLoading } = useMissions(); // Fetch activities here
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = () => {
    if (!activities) return [];
    
    let filtered = activities;

    // Filter by description or performance realization based on the search term
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.activityList.some(a =>
          a.performanceRealization.some(r =>
            r.realization.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }

    // Additional filter logic could be applied here based on filterType

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

export const useActivityContext = () => {
  return useContext(ActivityContext);
};