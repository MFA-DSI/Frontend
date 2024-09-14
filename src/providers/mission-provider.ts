import {toast} from "react-toastify";
import environment from "../conf/environment"; // Adjust the path as necessary

// Define the type for Activity
export interface Mission {
  id: string;
  description: string;
  activityList: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  description: string;
  performanceRealization: PerformanceRealization[];
}

export interface PerformanceRealization {
  id: string;
  indicators: number;
  realization: string;
}

// Fetching all missions from an API
export const fetchMissions = async (): Promise<Mission[]> => {
  try {
    const url =
      "http://localhost:8080/direction/mission/all?page=1&page_size=50";
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des activités";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: Mission[] = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching missions:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

// Fetching missions by directionId
export const getByDirectionId = async (
  directionId: string
): Promise<Mission[]> => {
  try {
    const url = `http://localhost:8080/direction/mission/byDirectionId/${directionId}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des missions par direction";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: Mission[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

// Save a new mission
export const saveMission = async (mission: Mission): Promise<Mission> => {
  try {
    const url = "http://localhost:8080/direction/mission/save";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mission),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de l'enregistrement de la mission";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: Mission = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving mission:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

// Delete a mission
export const deleteMission = async (id: string): Promise<void> => {
  try {
    const url = `http://localhost:8080/direction/mission/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la suppression de la mission";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error deleting mission:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};
