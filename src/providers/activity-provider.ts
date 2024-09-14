import {toast} from "react-toastify";
import environment from "../conf/environment"; // Adjust the path as necessary

export interface Activity {
  id: string;
  description: string;
  observation: string;
  dueDatetime: string;
  task: ActivityItem[];
  nextTask: ActivityItem[];
  performanceRealizationDTO: PerformanceRealization[];
}

export interface ActivityItem {
  id: string;
  description: string;
  dueDatetime: string;
}

export interface PerformanceRealization {
  id: string;
  indicators: number;
  realization: string;
}

export const fetchActivities = async (): Promise<unknown> => {
  try {
    const url =
      "http://localhost:8080/direction/activities/all?page=1&page_size=10";

    // Manually retrieve the token from session storage
    const token = sessionStorage.getItem("token");
    const directionId = sessionStorage.getItem("directionId");

    // Set up the request options
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

    // Parse the JSON response
    const data: Activity[] = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    // Handle any other errors
    console.error("Error fetching missions:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};
