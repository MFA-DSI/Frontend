import {useQuery, useMutation, useQueryClient} from "react-query";
import {
  deleteActivity,
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
      queryKey: ["activities"],
      queryFn: () =>
        getActivityByDirectionId(sessionStorage.getItem("directionId") || ""),
    });

  const deleteActivityMutation = useMutation(deleteActivity, {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    });

  return {
    activities: activitiesQuery.data,
    directionIdQuery,
    deleteActivityMutation,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
  };
};
