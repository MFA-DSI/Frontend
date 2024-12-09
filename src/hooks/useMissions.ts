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
  createReportRequests,
  respondToRequest,
  fetchAllRequests,
  fetchAllTargetedRequests,
  deleteReportById,
  recallReportById,
} from "../providers/mission-provider";

export const useMissions = () => {
  const queryClient = useQueryClient();

  const missionsQuery = useQuery({
    queryKey: ["missions"],
    queryFn: fetchMissions,
    enabled: !!localStorage.getItem("directionId"),
  });

  const directionId = localStorage.getItem("directionId");

  const directionIdQuery = () =>
    useQuery({
      queryKey: ["mission"],
      queryFn: () =>
        getByDirectionId(localStorage.getItem("directionId") || ""),
      enabled:
        !!localStorage.getItem("userId") &&
        !!localStorage.getItem("directionId"),
    });

  const directionMissionsName = (id) =>
    useQuery({
      queryKey: ["mission"],
      queryFn: () => fetchMissionsName(id),
      enabled: !!localStorage.getItem("directionId"),
    });

  const deleteMissionMutation = useMutation(deleteMission, {
    onSuccess: () => {
      queryClient.invalidateQueries("activity");
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
      queryClient.invalidateQueries("activity");
      queryClient.invalidateQueries("mission");
      queryClient.invalidateQueries("notification");
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

  const requestReportToDirection = useMutation(createReportRequests, {
    onSuccess: () => {
      queryClient.invalidateQueries("report");
    },
  });

  const respondToDirectionRequest = useMutation(respondToRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("report");
    },
  });

  const fetchAllRequestsByDirectionId = useQuery({
    queryKey: ["report", "allRequests", directionId],
    queryFn: () => fetchAllRequests(localStorage.getItem("directionId")!),
    enabled: !!directionId,
  });

  const fetchAllTargetedRequestsByDirectionId = useQuery({
    queryKey: ["report", "allTargetedRequests", directionId],
    queryFn: () =>
      fetchAllTargetedRequests(localStorage.getItem("directionId")!),
    enabled: !!directionId,
  });

  const deleteReport = useMutation(deleteReportById, {
    onSuccess: () => {
      queryClient.invalidateQueries("report");
    },
  });

  const recallReport = useMutation(recallReportById, {
    onSuccess: () => {
      queryClient.invalidateQueries("report");
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
    requestReport: requestReportToDirection.mutateAsync,
    respondToDirectionReportRequest: respondToDirectionRequest.mutateAsync,
    deleteDirectionReport: deleteReport.mutate,
    recallDirectionReport: recallReport.mutate,
    fetchAllRequests: fetchAllRequestsByDirectionId.data,
    fetchAllTargets: fetchAllTargetedRequestsByDirectionId.data,
    isLoading: missionsQuery.isLoading,
    error: missionsQuery.error,
  };
};
