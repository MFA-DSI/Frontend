import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchActivities,
  getActivityByDirectionId,
} from "../providers/activity-provider";

export const useActivities = () => {
  const queryClient = useQueryClient();

  const activitiesQuery = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });

  const directionIdQuery = () =>
    useQuery({
      queryKey: ["directionActivities"],
      queryFn: () =>
        getActivityByDirectionId(sessionStorage.getItem("directionId") || ""),
    });

  return {
    activities: activitiesQuery.data,
    directionIdQuery,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
  };
};