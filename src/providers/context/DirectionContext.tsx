// DirectionContext.tsx
import React, {createContext, useContext, ReactNode, FC} from "react";
import {useDirections} from "../../hooks/useDirection";

const DirectionContext = createContext<unknown>(
  undefined
);

export const DirectionProvider = ({children}) => {
  const {fetchServices,fetchDirections, isLoading,isError} = useDirections();

  return (
    <DirectionContext.Provider value={
      {
        fetchDirectionName : fetchDirections,
        fetchAllService : fetchServices.data,
        isLoading : isLoading,
        isError : isError
      }
    }>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirectionsContext = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error(
      "useDirectionsContext must be used within a DirectionProvider"
    );
  }

  return context;
};
