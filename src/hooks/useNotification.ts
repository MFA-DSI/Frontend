import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  deleteNotification,
  fetchNotification,
  updateNotificationStatus,
} from "../providers/notification-provider";
import { useAuthStore } from "./useAuthStore";
import { deleteMission } from "../providers/mission-provider";

export const useNotification = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore.getState().userId;
  const fetchNotifications = useQuery({
    queryKey: ["notification"],
    queryFn: ()=>fetchNotification(user),
  });

  const updateNotificationViewStatus = useMutation(updateNotificationStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("notification");
    },
  });

  const deleteUserNotification = useMutation(deleteNotification,{
    onSuccess: () => {
      queryClient.invalidateQueries("notification");
    },
  })

  return {
    fetchAllNotification: fetchNotifications.data,
    updateNotificationStatus: updateNotificationViewStatus.mutate,
    deleteSpecifiedNotification : deleteUserNotification.mutate,
    isLoading: fetchNotifications.isLoading,
    isError: fetchNotifications.isError,
  };
};
