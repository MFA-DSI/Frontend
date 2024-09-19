import {useQuery, useMutation, useQueryClient} from "react-query";
import {
  fetchMissions,
  getByDirectionId,
  saveMission,
  deleteMission,
  fetchMissionsName,
} from "../providers/mission-provider";

export const useMissions = () => {
  const queryClient = useQueryClient();

  const missionsQuery = useQuery({
    queryKey: ["missions"],
    queryFn: fetchMissions,
  });

  const directionIdQuery = () =>
    useQuery({
      queryKey: ["missions"],
      queryFn: () =>
        getByDirectionId(sessionStorage.getItem("directionId") || ""),
    });

  const directionMissionsName = () =>
    useQuery({
      queryKey: ["missions"],
      queryFn: () =>
        fetchMissionsName(sessionStorage.getItem("directionId") || ""),
    });

  const saveMissionMutation = useMutation(saveMission, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const deleteMissionMutation = useMutation(deleteMission, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  return {
    missions: missionsQuery.data,
    directionIdQuery,
    directionMissionsName,
    saveMission: saveMissionMutation.mutate,
    deleteMission: deleteMissionMutation.mutate,
    isLoading: missionsQuery.isLoading,
    error: missionsQuery.error,
  };
};
