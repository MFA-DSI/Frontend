import React from "react";
import { ActivitieProvider } from "./context/ActivitiesContext";
import { MissionProvider } from "./context/MissionsContext";
import { DirectionProvider } from "./context/DirectionContext";
import { FilesProvider } from "./context/FilesContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ResponsibleProvider } from "./context/ReponsibleContext";

export const HackWebProviders = ({ children }) => (
  <NotificationProvider>
    <DirectionProvider>
      <ResponsibleProvider>
        <ActivitieProvider>
          <FilesProvider>
            <MissionProvider>{children}</MissionProvider>
          </FilesProvider>
        </ActivitieProvider>
      </ResponsibleProvider>
    </DirectionProvider>
  </NotificationProvider>
);
