import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchMissions,
  getByDirectionId,
  saveMission,
  deleteMission,
  fetchMissionsName,
  updateMission,
  getWeeklyActivityByDirectionId,
  getMonthlyActivityByDirectionId,
  getQuarterlyActivityByDirectionId,
} from "../providers/mission-provider";

export const useMissions = () => {
  const queryClient = useQueryClient();

  const missionsQuery = useQuery({
    queryKey: ["missions"],
    queryFn: fetchMissions,
  });

  const directionIdQuery = () =>
    useQuery({
      queryKey: ["mission"],
      queryFn: () =>
        getByDirectionId(localStorage.getItem("directionId") || ""),
      enabled : !!localStorage.getItem("userId")
    });

  const directionMissionsName = (id) =>
    useQuery({
      queryKey: ["mission"],
      queryFn: () => fetchMissionsName(id),
    });

  const deleteMissionMutation = useMutation(deleteMission, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
      queryClient.invalidateQueries("mission");
    },
  });

  const updateMissionMutation = useMutation(updateMission, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
      queryClient.invalidateQueries("mission");
    },
  });

  const saveMissionMutation = useMutation(saveMission, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
      queryClient.invalidateQueries("mission");
    },
  });

  const monthlyMissions = useMutation(getMonthlyActivityByDirectionId, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const weeklyMissions = useMutation(getWeeklyActivityByDirectionId, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const quarterMissions = useMutation(getQuarterlyActivityByDirectionId, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  return {
    missions: missionsQuery.data,
    directionIdQuery,
    directionMissionsName,
    getWeeklyMissions: weeklyMissions.mutateAsync,
    getQuarterlyMissions: quarterMissions.mutateAsync,
    getMonthMissions: monthlyMissions.mutateAsync,
    deleteMission: deleteMissionMutation.mutate,
    updateMission: updateMissionMutation.mutate,
    saveMission: saveMissionMutation.mutate,
    isLoading: missionsQuery.isLoading,
    error: missionsQuery.error,
  };
};
