import React from "react";
import { ActivitieProvider } from "./context/ActivitiesContext";
import { MissionProvider } from "./context/MissionsContext";
import { DirectionProvider } from "./context/DirectionContext";

export const HackWebProviders = ({ children }) => (
  <DirectionProvider>
    <ActivitieProvider>
      <MissionProvider>{children}</MissionProvider>
    </ActivitieProvider>
  </DirectionProvider>
);
