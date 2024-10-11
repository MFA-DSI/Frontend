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
    isLoading,
    isError,
  } = useDirections();

  return (
    <DirectionContext.Provider
      value={{
        fetchAllDirection: fetchDirections.data,
        fetchAllService: fetchServices.data,
        fetchActualDirectionName: fetchActualDirection,
        fetchActualUserInformation: fetchUserInformation,
        isLoading: isLoading,
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
