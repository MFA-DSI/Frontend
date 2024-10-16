import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

  const updateNotification = useMutation({
    mutationFn: (id: string) => updateNotificationStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries("notification");
    },
  });

  return {
    fetchAllNotification: fetchNotifications.data,
    updateNotificationViewStatus: updateNotification.mutate,
    isLoading: fetchNotifications.isLoading,
    isError: fetchNotifications.isError,
  };
};
