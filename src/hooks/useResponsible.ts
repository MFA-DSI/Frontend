import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchNotification,
  updateNotificationStatus,
} from "../providers/notification-provider";
import { getDirectionResponsiblesInformation } from "../providers";
import {
  addResponsibleToDirection,
  addUserToDirection,
  approveUserToDirection,
} from "../providers/direction-provider";

export const useResponsible = () => {
  const queryClient = useQueryClient();

  const directionId = localStorage.getItem("directionId");

  const fetchAllDirectionResponsible = useQuery({
    queryKey: ["responsible", directionId],
    queryFn: () => getDirectionResponsiblesInformation(directionId),
    enabled: !!directionId,
  });

  const saveNewUserMutation = useMutation(addUserToDirection, {
    onSuccess: () => {
      queryClient.invalidateQueries("responsible");
      queryClient.invalidateQueries("notification");
    },
  });

  const saveNewResponsibleToDirection = useMutation(addResponsibleToDirection, {
    onSuccess: () => {
      queryClient.invalidateQueries("responsible");
      queryClient.invalidateQueries("notification");
    },
  });

  const approveUser = useMutation(approveUserToDirection, {
    onSuccess: () => {
      queryClient.invalidateQueries("responsible");
    },
  });

  return {
    fetchAllResponsibles: fetchAllDirectionResponsible.data,
    saveNewUser: saveNewUserMutation.mutateAsync,
    saveNewResponsible: saveNewResponsibleToDirection.mutateAsync,
    approveUserToDirectionMember: approveUser.mutateAsync,
    isLoading: fetchAllDirectionResponsible.isLoading,
    isResponsibleLoading: fetchAllDirectionResponsible.isLoading,
    isError: fetchAllDirectionResponsible.isError,
  };
};
