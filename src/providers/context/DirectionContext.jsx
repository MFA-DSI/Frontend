import React, { createContext, useContext} from "react";
import { useDirections } from "../../hooks/useDirection";

const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const {
    fetchActualDirection,
    fetchServices,
    fetchDirections,
    fetchUserInformation,
    isLoading,
    isError,
    isUserLoading,
  } = useDirections();

  return (
    <DirectionContext.Provider
      value={{
        fetchAllDirection: fetchDirections,
        fetchAllService: fetchServices,
        fetchActualDirectionName: fetchActualDirection,
        fetchActualUserInformation: fetchUserInformation,
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
