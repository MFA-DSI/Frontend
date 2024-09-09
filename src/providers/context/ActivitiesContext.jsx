import React, { createContext, useContext, useState } from "react";
import { useActivities } from "../../hooks/useActivities";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
    const { data: activities, isLoading } = useActivities(); // Fetch activities here

    const filteredActivities = () => {
        if (!activities) return [];
        return activities; // Returning all activities as we are ignoring filters
    };

    return (
        <ActivityContext.Provider
            value={{
                filteredActivities: filteredActivities(),
                isLoading,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivityContext = () => {
    return useContext(ActivityContext);
};