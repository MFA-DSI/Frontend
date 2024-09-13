import { useQuery } from "react-query";
import { fetchActivities } from "../providers/activity-provider";

export const useActivities = () => {
    return useQuery({
      queryKey : ["activities"], 
      queryFn : fetchActivities
    }
);
};