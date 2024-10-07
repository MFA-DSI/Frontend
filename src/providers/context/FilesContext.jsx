import React, { createContext, useContext, ReactNode, FC } from "react";
import { useFiles } from "../../hooks";

const FilesContext = createContext<unknown>(undefined);

export const FilesProvider = ({ children }) => {
  const {

    missionToPDF,
    missionToDOC,
    missionTOXLS ,
        
  } = useFiles();

  return (
    <FilesContext.Provider
      value={{
        fetchMissionPDF: missionToPDF,
        fetchMissionDOC:missionToDOC,
        fetchMissionXLS: missionTOXLS,
       // TODO :add loading and error here 
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error(
      "useFilessContext must be used within a FilesProvider",
    );
  }

  return context;
};
