import {toast} from "react-toastify";
import environment from "../conf/environment"; // Adjust the path as necessary
import {CreateMission} from "../types";

// Define the type for Activity
interface Mission {
  id: string;
  description: string;
  activityList: ActivityItem[];
}

interface ActivityItem {
  id: string;
  description: string;
  performanceRealization: PerformanceRealization[];
}

interface PerformanceRealization {
  id: string;
  indicators: number;
  realization: string;
}

interface MissionName {
  id: string;
  name: string;
}
// Fetching all missions from an API
export const fetchMissions = async (): Promise<Mission[]> => {
  try {
    const url =
      "http://localhost:8080/direction/mission/all?page=1&page_size=100";
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

export const fetchMissionsName = async (
  directionId: string
): Promise<MissionName[]> => {
  try {
    const url = `http://localhost:8080/direction/mission/name?directionId=${directionId}`;
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

    const data: MissionName[] = await response.json();
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
    const url = `http://localhost:8080/direction/mission/directions?directionId=${directionId}`;
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
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

// Save a new mission
export const saveMission = async (mission: CreateMission): Promise<Mission> => {
  try {
    const directionId= sessionStorage.getItem("directionId")
    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/direction/mission/create?directionId=${directionId}&userId=${userId}`;
    const response = await fetch(url, {
      method: "PUT",
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
