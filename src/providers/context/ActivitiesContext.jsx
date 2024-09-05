// ActivityContext.js
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

// Sample activities data
const activityData = [
  {
    id: 1,
    mission: "Mission 1",
    activity: "Complete project report",
    dueDatetime: "2023-10-20T12:00:00Z",
    observation: "Ensure all sections are filled out.",
    type: "monthly",
    direction: "Sales",
  },
  {
    id: 2,
    mission: "Mission 2",
    activity: "Submit timesheet",
    dueDatetime: "2023-10-15T17:00:00Z",
    observation: "Submit by end of the day.",
    type: "weekly",
    direction: "HR",
  },
  {
    id: 3,
    mission: "Mission 3",
    activity: "Prepare for team meeting",
    dueDatetime: "2023-10-18T10:00:00Z",
    observation: "Gather all necessary documents.",
    type: "weekly",
    direction: "IT",
  },
  {
    id: 4,
    mission: "Mission 4",
    activity: "Quarterly financial review",
    dueDatetime: "2023-12-31T12:00:00Z",
    observation: "Review all financial statements.",
    type: "quarterly",
    direction: "Finance",
  },
  {
    id: 5,
    mission: "Mission 4",
    activity: "Quarterly financial review",
    dueDatetime: "2023-12-31T12:00:00Z",
    observation: "Review all financial statements.",
    type: "quarterly",
    direction: "Finance",
  },{
    id: 6,
    mission: "Mission 4",
    activity: "Quarterly financial review",
    dueDatetime: "2023-12-31T12:00:00Z",
    observation: "Review all financial statements.",
    type: "quarterly",
    direction: "Finance",
  },{
    id: 7,
    mission: "Mission 4",
    activity: "Quarterly financial review",
    dueDatetime: "2023-12-31T12:00:00Z",
    observation: "Review all financial statements.",
    type: "quarterly",
    direction: "Finance",
  }
];

// Function to simulate fetching activities from an API
const fetchActivities = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(activityData);
    }, 1000);
  });
};

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { data: activities, isLoading } = useQuery("activities", fetchActivities);
  const [filterType, setFilterType] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");

  const filteredActivities = () => {
    if (!activities) return [];
    return activities.filter(activity => {
      const typeMatch = filterType === "all" || activity.type === filterType;
      const directionMatch = directionFilter === "all" || activity.direction === directionFilter;
      return typeMatch && directionMatch;
    });
  };

  return (
    <ActivityContext.Provider value={{ filteredActivities: filteredActivities(), isLoading, setFilterType, setDirectionFilter }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  return useContext(ActivityContext);
};