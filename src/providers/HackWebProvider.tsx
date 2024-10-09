import React from "react";
import { ActivitieProvider } from "./context/ActivitiesContext";
import { MissionProvider } from "./context/MissionsContext";
import { DirectionProvider } from "./context/DirectionContext";
import { FilesProvider } from "./context/FilesContext";

export const HackWebProviders = ({ children }) => (
  <DirectionProvider>
    <ActivitieProvider>
      <FilesProvider>
        <MissionProvider>{children}</MissionProvider>
      </FilesProvider>
    </ActivitieProvider>
  </DirectionProvider>
);
