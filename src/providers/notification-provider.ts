import { message } from "antd";
import { useAuthStore } from "../hooks";
import { Notification } from "../types";

const API_URL: string = import.meta.env.VITE_API_URL;

interface DeleteNotificationParams {
  id: string;
  userId: string;
}
export const fetchNotification = async (userId): Promise<Notification[]> => {
  if (!userId) {
    throw new Error("User ID is not available in session storage");
  }

  try {
    const url = new URL(`${API_URL}/direction/notification/user`);
    url.searchParams.append("userId", userId);

    const response = await fetch(url.toString(), {
      method: "GET",
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

export const updateNotificationStatus = async (id: string) => {
  const directionId = localStorage.getItem("directionId");

  if (!directionId) {
    throw new Error("Direction ID is not available in session storage");
  }

  try {
    const url = new URL(`${API_URL}/direction/notification/update`);
    url.searchParams.append("id", id);

    const response = await fetch(url.toString(), {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error(
        `Error updating notification status: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update notification status", error);
    throw error;
  }
};
export const deleteNotification = async (id: DeleteNotificationParams) => {
  try {
    const url = new URL(
      `${API_URL}/direction/notification/delete?id=${id.id}&userId=${id.userId}`,
    );
    const response = await fetch(url.toString(), {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Error updating notification status: ${response.statusText}`,
      );
    }

   
    message.success("notification supprimé avec succées");
    return null
  } catch (error) {
    console.error("Failed to update notification status", error);
    throw error;
  }
};
