import { Notification } from "../types";

const API_URL: string = import.meta.env.VITE_API_URL;

export const fetchNotification = async (): Promise<Notification[]> => {
  const userId = sessionStorage.getItem("userId");

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
  const directionId = sessionStorage.getItem("directionId");

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

    const data: Notification = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update notification status", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
