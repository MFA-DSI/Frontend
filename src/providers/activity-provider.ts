import {toast} from "react-toastify";
import environment from "../conf/environment";
import {PerformanceRealization, Recommendation, Task} from "../types";
import { message } from "antd";

export interface Activity {
  id: string;
  description: string;
  observation: string;
  dueDatetime: string;
  prediction: string;
  task: ActivityItem[];
  nextTask: ActivityItem[];
  performanceRealizationDTO: PerformanceRealization[];
  recommenation: Recommendation[];
}

export interface ActivityItem {
  id: string;
  description: string;
  dueDatetime: string;
}
interface updateActivityItem {
  id: string;
  task: ActivityItem[];
  type: string;
}

interface udpatePerformance {
  id: string;
  performance: PerformanceRealization;
}

interface recommendationUpdate {
  activityId : string;
  committerId : string;
  description : string;
}

export const fetchActivities = async (): Promise<unknown> => {
  try {
    const url =
      "http://localhost:8080/direction/activities/all?page=1&page_size=1000";
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

    const data: Activity[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching missions:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const getActivityByDirectionId = async (
  directionId: string
): Promise<unknown> => {
  try {
    const url = `http://localhost:8080/direction/activity/direction?directionId=${directionId}&page=1&page_size=1000`;
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

    const data: Activity[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const getActivityById = async (id: string) => {
  try {
    const url = `http://localhost:8080/direction/activity?id=${id}`;
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

    const data: Activity = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};
export const updateActivity = async (
  activities: Activity
): Promise<Activity> => {
  const activityToUpdate = {
    id: activities.id,
    description: activities.description,
    observation: activities.observation,
    prediction: activities.prediction,
    dueDatetime: activities.dueDatetime,
  };

  try {
    const url = "http://localhost:8080/direction/activity/update";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityToUpdate),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de l'enregistrement de la mission";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: Activity = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving mission:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const deleteActivity = async (id: string): Promise<void> => {
  const userId = sessionStorage.getItem("userId");
  try {
    const url = `http://localhost:8080/direction/activity/delete?userId=${userId}&activityId=${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la suppression de cette activité";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    message.success("Activity supprimée avec succès !");
  } catch (error) {
    console.error("Error deleting delete:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const addTaskToActivity = async (taskDetails: updateActivityItem) => {
  const type = taskDetails.type === "task" ? "task" : "nextTask";
  try {
    const url = `http://localhost:8080/direction/${type}?activityId=${taskDetails.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([taskDetails.task]),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la création de cette tache";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error deleting delete:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const DetachTaskToActivity = async (taskId: string) => {
  try {
    const url = `http://localhost:8080/direction/nextTask/delete?id=${taskId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la création de cette tache";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error deleting delete:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const addPerformanceToActivity = async (
  performanceRealization: udpatePerformance
) => {
  try {
    const url = `http://localhost:8080/direction/performanceRealization?activityId=${performanceRealization.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([performanceRealization.performance]),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la création de cette indicateur de performance";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    message.success("Performance modifié avec succès !");
  } catch (error) {
    console.error("Error deleting delete:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};
export const detachPerformanceFromActivity = async (id: string) => {
  try {
    const url = `http://localhost:8080/direction/performanceRealization/delete?id=${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la création de la suppression de cette performance";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error deleting delete:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const addRecommendationToActivity = async (
  recommendation: recommendationUpdate
) => {

  try {
    const url = `http://localhost:8080/direction/activity/recommendation?activityId=${recommendation.activityId}`;
    
    const recommendationBody = {
      description : recommendation.description,
      committerId : sessionStorage.getItem("userId")
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recommendationBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la création de cette indicateur de performance";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    message.success("recommendation envoyée avec succès !");
  } catch (error) {
    console.error("Error deleting delete:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};
