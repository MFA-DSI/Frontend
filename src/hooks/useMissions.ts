import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchMissions,
  getByDirectionId,
  saveMission,
  deleteMission,
  fetchMissionsName,
  updateMission,
  getWeeklyAtivityByDirectionId,
  getMonthlyAtivityByDirectionId,
  getQuarterlyAtivityByDirectionId,
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

  const monthlyMissions =
    useMutation(getMonthlyAtivityByDirectionId,{
        onSuccess : ()=>{
          queryClient.invalidateQueries("missions");
        }
    } 
    );

  const weeklyMissions = useMutation(getWeeklyAtivityByDirectionId,{
    onSuccess : ()=>{
      queryClient.invalidateQueries("missions");
    }
} )

  const quarterMissions = useMutation(getQuarterlyAtivityByDirectionId,{
    onSuccess : ()=>{
      queryClient.invalidateQueries("missions");
    }
} )

  return {
    missions: missionsQuery.data,
    directionIdQuery,
    directionMissionsName,
    getWeeklyMissions : weeklyMissions.mutateAsync,
    getQuarterlyMissions : quarterMissions.mutateAsync,
    getMonthMissions : monthlyMissions.mutateAsync, 
    deleteMission: deleteMissionMutation.mutate,
    updateMission: updateMissionMutation.mutate,
    saveMission: saveMissionMutation.mutate,
    isLoading: missionsQuery.isLoading,
    error: missionsQuery.error,
  };
};
