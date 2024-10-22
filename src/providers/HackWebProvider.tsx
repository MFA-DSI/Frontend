import React from "react";
import { ActivitieProvider } from "./context/ActivitiesContext";
import { MissionProvider } from "./context/MissionsContext";
import { DirectionProvider } from "./context/DirectionContext";
import { FilesProvider } from "./context/FilesContext";
import { NotificationProvider } from "./context/NotificationContext";

export const HackWebProviders = ({ children }) => (
  <NotificationProvider>
    <DirectionProvider>
      <ActivitieProvider>
        <FilesProvider>
          <MissionProvider>{children}</MissionProvider>
        </FilesProvider>
      </ActivitieProvider>
    </DirectionProvider>
  </NotificationProvider>
);
