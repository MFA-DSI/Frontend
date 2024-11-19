import React, { createContext, useContext } from "react";
import { useDirections } from "../../hooks/useDirection";

const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const {
    fetchActualDirection,
    fetchServices,
    fetchDirections,
    fetchUserInformation,
    updateUserInformation,
    fetchAllSubDirectionsBydirectionId,
    isLoading,
    isError,
    isUserLoading,
    isSubDirectionLoading
  } = useDirections();

  return (
    <DirectionContext.Provider
      value={{
        fetchAllDirection: fetchDirections,
        fetchAllService: fetchServices,
        fetchActualDirectionName: fetchActualDirection,
        fetchActualUserInformation: fetchUserInformation,
        fetchAllSubDirections: fetchAllSubDirectionsBydirectionId,
        updateUser: updateUserInformation.mutateAsync,
        isSubDirectionLoading,
        isLoading,
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
