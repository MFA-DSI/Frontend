import React, { createContext, useContext } from "react";
import { useNotification } from "../../hooks";


const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const {  fetchAllNotification,
    updateNotificationViewStatus,isLoading,isError} = useNotification();

    const getAllNotification = ()=>{
      console.log(fetchAllNotification);
      
        return fetchAllNotification.data
    }

  return (
    <NotificationContext.Provider
      value={{
        fetchNotifications: getAllNotification(),
        updateNotification: updateNotificationViewStatus.mutate,
        isLoading : isLoading,
        isError : isError
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};
