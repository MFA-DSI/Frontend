import {useQuery, useMutation, useQueryClient} from "react-query";
import {
  addNextTaskTActivity,
  addPerformanceToActivity,
  addRecommendationToActivity,
  addTaskToActivity,
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

  const udpateActivityTaskMutation = useMutation(addTaskToActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
    },
  });

  const udpateActivityNextTaskMutation = useMutation(addNextTaskTActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
    },
  });

  const udpatePerformanceRealizationMutation = useMutation(
    addPerformanceToActivity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    }
  );

  const udpateRecommendationMutation = useMutation(
    addRecommendationToActivity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    }
  );

  return {
    activities: activitiesQuery.data,
    directionIdQuery,
    deleteActivity: deleteActivityMutation.mutate,
    updateMissionActivity: udpateActivityMutation.mutate,
    addTask: udpateActivityTaskMutation.mutate,
    addNextTask: udpateActivityNextTaskMutation.mutate,
    addPerformance: udpatePerformanceRealizationMutation.mutate,
    addRecommendation: udpateRecommendationMutation.mutate,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
  };
};
