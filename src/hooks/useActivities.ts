import {useQuery, useMutation, useQueryClient} from "react-query";
import {
  addPerformanceToActivity,
  addRecommendationToActivity,
  addTaskToActivity,
  deleteActivity,
  fetchActivities,
  getActivityByDirectionId,
  getActivityById,
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
      queryKey: ["activity"],
      queryFn: () =>
        getActivityByDirectionId(sessionStorage.getItem("directionId") || ""),
    });

  const activityIdQuery = (id: string) =>
    useQuery({
      queryKey: ["activity"],
      queryFn: () => getActivityById(id),
    });

  const deleteActivityMutation = useMutation(deleteActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
      queryClient.invalidateQueries("activity");
    },
  });

  const udpateActivityMutation = useMutation(updateActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
      queryClient.invalidateQueries("activity");
    },
  });

  const udpateActivityTaskMutation = useMutation(addTaskToActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
      queryClient.invalidateQueries("activity");
    },
  });
  const udpatePerformanceRealizationMutation = useMutation(
    addPerformanceToActivity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
        queryClient.invalidateQueries("activity");
      },
    }
  );

  const udpateRecommendationMutation = useMutation(addRecommendationToActivity,
    {
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
      queryClient.invalidateQueries("activity");
    },}
  );

  return {
    activities: activitiesQuery.data,
    directionIdQuery,
    MissionsActivityIdQuery: activityIdQuery,
    deleteActivity: deleteActivityMutation.mutate,
    updateMissionActivity: udpateActivityMutation.mutate,
    addTask: udpateActivityTaskMutation.mutate,
    addPerformance: udpatePerformanceRealizationMutation.mutate,
    addRecommendation: udpateRecommendationMutation.mutate,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
  };
};
