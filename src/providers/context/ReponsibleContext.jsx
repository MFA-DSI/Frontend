import React, { createContext, useContext} from "react";
import { useResponsible } from "../../hooks/useResponsible";


const ResponsibleContext = createContext();

export const ResponsibleProvider = ({ children }) => {
  const {
    fetchAllResponsibles,
    saveNewUser,
    saveNewResponsible,
    approveUserToDirectionMember,
    isLoading,
    isResponsibleLoading,
    isError,
  } = useResponsible();

  return (
    <ResponsibleContext.Provider
      value={{
        fetchResponsibles : fetchAllResponsibles,
        saveNewUser,
        saveNewResponsible,
        approveUserToDirectionMember,
        isLoading,
        isResponsibleLoading,
        isError
       
      }}
    >
      {children}
    </ResponsibleContext.Provider>
  );
};

export const useResponsiblesContext = () => {
  const context = useContext(ResponsibleContext);
  if (!context) {
    throw new Error(
      "useResponsiblesContext must be used within a ResponsibleProvider",
    );
  }

  return context;
};
