import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addPerformanceToActivity,
  addRecommendationToActivity,
  addTaskToActivity,
  deleteActivity,
  fetchActivities,
  fetchActivitiesStatistics,
  fetchOwnDirectionStatistics,
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
        getActivityByDirectionId(localStorage.getItem("directionId") || ""),
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
    },
  );

  const udpateRecommendationMutation = useMutation(
    addRecommendationToActivity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
        queryClient.invalidateQueries("activity");
        queryClient.invalidateQueries("missions");
      },
    },
  );

  const fetchAllStatisticsMutation = useMutation(fetchActivitiesStatistics, {
    onSuccess: () => {
      queryClient.invalidateQueries("statistics");
    },
  });

  // Convert fetchOwnStatistics to a mutation
  const fetchOwnStatisticsMutation = useMutation(fetchOwnDirectionStatistics, {
    onSuccess: () => {
      queryClient.invalidateQueries("statistic");
    },
  });

  return {
    activities: activitiesQuery.data,
    directionIdQuery,
    MissionsActivityIdQuery: activityIdQuery,
    deleteActivity: deleteActivityMutation.mutate,
    updateMissionActivity: udpateActivityMutation.mutate,
    addTask: udpateActivityTaskMutation.mutate,
    addPerformance: udpatePerformanceRealizationMutation.mutate,
    addRecommendation: udpateRecommendationMutation.mutate,
    fetchAllDirectionStatistics: fetchAllStatisticsMutation.mutateAsync,
    fetchUserDirectionStatistics: fetchOwnStatisticsMutation.mutateAsync,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
  };
};
