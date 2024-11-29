import { message } from "antd";
import { useAuthStore } from "../hooks";
import { Notification } from "../types";

const API_URL: string = import.meta.env.VITE_API_URL;

interface DeleteNotificationParams {
  id: string;
  userId: string;
}

// Fonction utilitaire pour récupérer le token d'authentification
const getAuthToken = (): string | null => {
  return localStorage.getItem("token"); // ou utilisez votre gestionnaire d'état pour le token
};

// Récupère les notifications pour un utilisateur
export const fetchNotification = async (userId: string): Promise<Notification[]> => {
  if (!userId) {
    throw new Error("User ID is not available in session storage");
  }

  const token = getAuthToken(); // Récupère le token d'authentification

  try {
    const url = new URL(`${API_URL}/direction/notification/user`);
    url.searchParams.append("userId", userId);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête Authorization
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching notifications: ${response.statusText}`);
    }

    const data: Notification[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch notifications", error);
    throw error;
  }
};

// Met à jour le statut de la notification
export const updateNotificationStatus = async (id: string): Promise<void> => {
  const directionId = localStorage.getItem("directionId");

  if (!directionId) {
    throw new Error("Direction ID is not available in session storage");
  }

  const token = getAuthToken(); // Récupère le token d'authentification

  try {
    const url = new URL(`${API_URL}/direction/notification/update`);
    url.searchParams.append("id", id);

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête Authorization
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error updating notification status: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update notification status", error);
    throw error;
  }
};

// Supprime une notification
export const deleteNotification = async (id: DeleteNotificationParams): Promise<unknown> => {
  const token = getAuthToken(); // Récupère le token d'authentification

  try {
    const url = new URL(
      `${API_URL}/direction/notification/delete?id=${id.id}&userId=${id.userId}`
    );
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête Authorization
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting notification: ${response.statusText}`);
    }

    message.success("Notification supprimée avec succès");
    return null;
  } catch (error) {
    console.error("Failed to delete notification", error);
    throw error;
  }
};
