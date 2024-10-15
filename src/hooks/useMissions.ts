import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchMissions,
  getByDirectionId,
  saveMission,
  deleteMission,
  fetchMissionsName,
  updateMission,
} from "../providers/mission-provider";
import { useAuthStore } from "./useAuthStore";
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
        getByDirectionId(sessionStorage.getItem("directionId") || "")
      
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

  return {
    missions: missionsQuery.data,
    directionIdQuery,
    directionMissionsName,
    deleteMission: deleteMissionMutation.mutate,
    updateMission: updateMissionMutation.mutate,
    saveMission: saveMissionMutation.mutate,
    isLoading: missionsQuery.isLoading,
    error: missionsQuery.error,
  };
};
