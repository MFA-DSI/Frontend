import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotification, updateNotificationStatus } from "../providers/notification-provider";

export const useNotification = () => {
    const queryClient = useQueryClient();
    
    // Récupère les notifications
    const fetchNotifications = useQuery({
        queryKey: ["notification"],
        queryFn: ()=>fetchNotification(),
    });

    // Mutation pour mettre à jour le statut d'une notification
    const updateNotification = useMutation({
        mutationFn: (id: string) => updateNotificationStatus(id),
        onSuccess: () => {
            // Invalide la requête pour rafraîchir les notifications
            queryClient.invalidateQueries(["notification"]);
        },
    });

    return {
        fetchAllNotification: fetchNotifications,  
        updateNotificationViewStatus: updateNotification.mutate,  
        isLoading: fetchNotifications.isLoading,
        isError: fetchNotifications.isError,
    };
};
