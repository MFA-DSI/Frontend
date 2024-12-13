import React, { createContext, useContext } from "react";
import { useNotification } from "../../hooks";
import { deleteNotification } from "../notification-provider";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const {
    fetchAllNotification,
    updateNotificationStatus,
    deleteSpecifiedNotification,
    isLoading,
    isError,
  } = useNotification();

  return (
    <NotificationContext.Provider
      value={{
        fetchNotifications: fetchAllNotification,
        updateNotification: updateNotificationStatus,
        deleteNotification: deleteSpecifiedNotification,
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
