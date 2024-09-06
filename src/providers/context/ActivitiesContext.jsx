// ActivityContext.js
import React, {createContext, useContext, useState} from "react";
import {useQuery} from "react-query";

// Sample activity data for demonstration
const activityData = [
  {
    id: 1,
    mission: "Mission 1",
    activity: "Complete project report",
    description: "Draft the project report for review.",
    dueDatetime: "2023-10-20T12:00:00Z",
    observation: "Ensure all sections are filled out.",
    type: "monthly",
    direction: "Sales",
    performanceIndicator: "80%",
    realization: "Completed",
  },
  {
    id: 2,
    mission: "Mission 1",
    activity: "Complete project report",
    description: "Finalize the project report.",
    dueDatetime: "2023-10-22T12:00:00Z",
    observation: "Awaiting final approval.",
    type: "monthly",
    direction: "Sales",
    performanceIndicator: "80%",
    realization: "In Progress",
  },
  {
    id: 3,
    mission: "Mission 1",
    activity: "Submit timesheet",
    description: "Ensure timesheet is submitted on time.",
    dueDatetime: "2023-10-15T17:00:00Z",
    observation: "Submit by end of the day.",
    type: "weekly",
    direction: "HR",
    performanceIndicator: "70%",
    realization: "Pending",
  },
  {
    id: 4,
    mission: "Mission 2",
    activity: "Prepare for team meeting",
    description: "Gather all necessary documents.",
    dueDatetime: "2023-10-18T10:00:00Z",
    observation: "Review agenda beforehand.",
    type: "weekly",
    direction: "IT",
    performanceIndicator: "85%",
    realization: "Completed",
  },
  {
    id: 5,
    mission: "Mission 2",
    activity: "Send meeting invites",
    description: "Distribute the meeting schedule to all members.",
    dueDatetime: "2023-10-17T10:00:00Z",
    observation: "Ensure timely distribution.",
    type: "weekly",
    direction: "IT",
    performanceIndicator: "60%",
    realization: "In Progress",
  },
  {
    id: 6,
    mission: "Mission 3",
    activity: "Quarterly financial review",
    description: "Review all financial statements for accuracy.",
    dueDatetime: "2023-12-31T12:00:00Z",
    observation: "Finalize before the quarterly meeting.",
    type: "quarterly",
    direction: "Finance",
    performanceIndicator: "90%",
    realization: "In Progress",
  },
  {
    id: 7,
    mission: "Mission 3",
    activity: "Prepare financial presentation",
    description: "Design slides based on last quarter's financial data.",
    dueDatetime: "2023-12-30T12:00:00Z",
    observation: "Use current data for accurate reporting.",
    type: "quarterly",
    direction: "Finance",
    performanceIndicator: "90%",
    realization: "Pending",
  },
  {
    id: 8,
    mission: "Mission 4",
    activity: "Client follow-up",
    description: "Reach out to client for feedback on the project.",
    dueDatetime: "2023-10-25T12:00:00Z",
    observation: "Ensure client satisfaction.",
    type: "weekly",
    direction: "Sales",
    performanceIndicator: "85%",
    realization: "In Progress",
  },
  {
    id: 9,
    mission: "Mission 4",
    activity: "Schedule client call",
    description: "Arrange a follow-up call with the client.",
    dueDatetime: "2023-10-26T12:00:00Z",
    observation: "Coordinate with the client's availability.",
    type: "weekly",
    direction: "Sales",
    performanceIndicator: "",
    realization: "Pending",
  },
  {
    id: 10,
    mission: "Mission 5",
    activity: "Server maintenance",
    description: "Conduct monthly maintenance on servers.",
    dueDatetime: "2023-11-01T09:00:00Z",
    observation: "Notify all teams about potential downtime.",
    type: "monthly",
    direction: "IT",
    performanceIndicator: "95%",
    realization: "Completed",
  },
  {
    id: 11,
    mission: "Mission 6",
    activity: "Recruitment drive",
    description: "Organize recruitment activities for Q4.",
    dueDatetime: "2023-10-28T17:00:00Z",
    observation: "Ensure all positions are filled.",
    type: "quarterly",
    direction: "HR",
    performanceIndicator: "70%",
    realization: "In Progress",
  },
  {
    id: 12,
    mission: "Mission 7",
    activity: "Budget planning for next quarter",
    description: "Allocate budgets to different departments.",
    dueDatetime: "2023-12-15T10:00:00Z",
    observation: "Review past budget performance.",
    type: "quarterly",
    direction: "Finance",
    performanceIndicator: "80%",
    realization: "Pending",
  },
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

export const ActivityProvider = ({children}) => {
  const {data: activities, isLoading} = useQuery("activities", fetchActivities);
  const [filterType, setFilterType] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");

  const filteredActivities = () => {
    if (!activities) return [];
    return activities.filter((activity) => {
      const typeMatch = filterType === "all" || activity.type === filterType;
      const directionMatch =
        directionFilter === "all" || activity.direction === directionFilter;
      return typeMatch && directionMatch;
    });
  };

  return (
    <ActivityContext.Provider
      value={{
        filteredActivities: filteredActivities(),
        isLoading,
        setFilterType,
        setDirectionFilter,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  return useContext(ActivityContext);
};
