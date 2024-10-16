import React, { createContext, useContext } from "react";
import { useNotification } from "../../hooks";

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const {
    fetchAllNotification,
    updateNotificationViewStatus,
    isLoading,
    isError,
  } = useNotification();



  return (
    <NotificationContext.Provider
      value={{
        fetchNotifications: fetchAllNotification,
        updateNotification: updateNotificationViewStatus.mutate,
        isLoading,
       isError,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};
