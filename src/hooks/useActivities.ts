import {useQuery, useMutation, useQueryClient} from "react-query";
import {
  deleteActivity,
  fetchActivities,
  getActivityByDirectionId,
  updateActivity,
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

  
    const udpateActivityMutation = useMutation(updateActivity, {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    });

  return {
    activities: activitiesQuery.data,
    directionIdQuery,
    deleteActivityMutation,
    updateMissionActivity: udpateActivityMutation.mutate,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
  };
};
