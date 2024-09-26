import { useActivitiesContext, useMissionContext } from "../../../providers";
import react from "react";
const {
    filteredActivities,
    isLoading: isActivityLoading,
    directionIdQueryActivities,
  } = useActivitiesContext();
  const {
    filteredMissions,
    isLoading: isMissionLoading,
    MissionByDirectionId,
  } = useMissionContext();

export const getDataSource = (activityType: string,mode : string) => {
    if (mode === "mydirection") {
      return activityType === "weekly" ? directionIdQueryActivities : MissionByDirectionId;
    }
    return activityType === "weekly" ? filteredActivities : filteredMissions;
  };
  
