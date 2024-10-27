import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchNotification,
  updateNotificationStatus,
} from "../providers/notification-provider";

export const useNotification = () => {
  const queryClient = useQueryClient();

  const fetchNotifications = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
  });

  const updateNotificationViewStatus = useMutation(updateNotificationStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("notification");
    },
  });

  return {
    fetchAllNotification: fetchNotifications.data,
    updateNotificationStatus: updateNotificationViewStatus.mutate,
    isLoading: fetchNotifications.isLoading,
    isError: fetchNotifications.isError,
  };
};
