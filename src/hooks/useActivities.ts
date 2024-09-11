import { useQuery } from "react-query";
import { fetchActivities } from "../providers/activity-provider";


// Custom hook for using activities
export const useActivities = () => {
    return useQuery({
      queryKey : ["activities"], 
      queryFn : fetchActivities
    }
      );
};