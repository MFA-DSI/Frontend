import { useQuery } from "react-query";
import { Activity, fetchActivities } from "../providers/activities-provider";

// Custom hook for using activities
export const useActivities = () => {
    return useQuery({
      queryKey : ["directionId"], 
      queryFn : fetchActivities
    }
      );
};