// DirectionContext.tsx
import React, {createContext, useContext, ReactNode, FC} from "react";
import {useDirections} from "../../hooks/useDirection";

interface Direction {
  id: string;
  name: string;
}

interface DirectionContextProps {
  data: unknown;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}

const DirectionContext = createContext<DirectionContextProps | undefined>(
  undefined
);

export const DirectionProvider: FC<{children: ReactNode}> = ({children}) => {
  const {data, isLoading, isError} = useDirections();

  return (
    <DirectionContext.Provider value={{data, isLoading, isError}}>
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
