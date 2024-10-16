// DirectionContext.tsx
import React, { createContext, useContext, ReactNode, FC } from "react";
import { useDirections } from "../../hooks/useDirection";

const DirectionContext = createContext<unknown>(undefined);

export const DirectionProvider = ({ children }) => {
  const {
    fetchActualDirection,
    fetchServices,
    fetchDirections,
    fetchUserInformation,
    fetchAllResponsibles,
    isLoading,
    isError,
    saveNewUser,
    isResponsibleLoading,
    isUserLoading,
    saveNewResponsible
  } = useDirections();

  return (
    <DirectionContext.Provider
      value={{
        fetchAllDirection: fetchDirections,
        fetchAllService: fetchServices,
        fetchActualDirectionName: fetchActualDirection,
        fetchActualUserInformation: fetchUserInformation,
        fetchAllDirectionResponsibles: fetchAllResponsibles,
        saveNewUser,
        saveNewResponsible,
        isLoading,
        isResponsibleLoading,
        isUserLoading,
        isError: isError,
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirectionsContext = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error(
      "useDirectionsContext must be used within a DirectionProvider",
    );
  }

  return context;
};
