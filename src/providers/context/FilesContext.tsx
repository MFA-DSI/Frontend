import React, { createContext, useContext } from "react";
import { useFiles } from "../../hooks";

const FilesContext = createContext<unknown>(undefined);

export const FilesProvider = ({ children }) => {
  const {
    missionToPDF,
    missionToDOC,
    missionToXLS ,      
  } = useFiles();

  return (
    <FilesContext.Provider
      value={{
        fetchMissionPDF: missionToPDF,
        fetchMissionDOC: missionToDOC,
        fetchMissionXLS: missionToXLS,  
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
      "useFilesContext must be used within a FilesProvider",
    );
  }

  return context;
};
