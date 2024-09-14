import React from "react";
import {ActivitieProvider} from "./context/ActivitiesContext";
import {MissionProvider} from "./context/MissionsContext";

export const HackWebProviders = ({children}) => (
  <ActivitieProvider>
    <MissionProvider>{children}</MissionProvider>
  </ActivitieProvider>
);
