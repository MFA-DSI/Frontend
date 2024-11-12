import { toast } from "react-toastify";
import { message } from "antd";
import environment from "../conf/environment";
import { PerformanceRealization, Recommendation, Task } from "../types";

export interface Activity {
  id: string;
  description: string;
  observation: string;
  dueDatetime: string;
  prediction: string;
  task: ActivityItem[];
  nextTask: ActivityItem[];
  performanceRealizationDTO: PerformanceRealization[];
  recommendation: Recommendation[];
}

export interface ActivityItem {
  id: string;
  description: string;
  dueDatetime: string;
}

interface UpdateActivityItem {
  id: string;
  task: ActivityItem[];
  type: string;
}

interface UpdatePerformance {
  id: string;
  performance: PerformanceRealization;
}

interface RecommendationUpdate {
  activityId: string;
  committerId: string;
  description: string;
}
export interface FetchActivitiesForDirectionParams {
  weekStartDate: string;
  page?: number; // Paramètre optionnel
  pageSize?: number; // Paramètre optionnel
}

export interface FetchOwnDirectionStatisticsParams {
  directionId: string;
  year: number; // Utilisation de string pour simplifier la gestion des dates au niveau de l'API
  page?: number; // Paramètre optionnel, par défaut 1
  pageSize?: number; // Paramètre optionnel, par défaut 15
}

const BASE_URL = environment.apiBaseUrl || "http://localhost:8080";

const handleErrorResponse = async (
  response: Response,
  defaultMessage: string,
) => {
  const errorData = await response.json();
  const errorMessage = errorData.message || defaultMessage;
  message.error("une erreur s'est produite");
  throw new Error(errorMessage);
};

export const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/direction/activities/all?page=1&page_size=1000`,
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la récupération des activités",
      );
    return await response.json();
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const getActivityByDirectionId = async (
  directionId: string,
): Promise<Activity[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/direction/activity/direction?directionId=${directionId}&page=1&page_size=1000`,
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la récupération des missions par direction",
      );
    return await response.json();
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const getActivityById = async (id: string): Promise<Activity> => {
  try {
    const response = await fetch(`${BASE_URL}/direction/activity?id=${id}`);
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la récupération de l'activité",
      );
    return await response.json();
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const updateActivity = async (activity: Activity): Promise<Activity> => {
  try {
    const response = await fetch(`${BASE_URL}/direction/activity/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la mise à jour de l'activité",
      );
    return await response.json();
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const deleteActivity = async (id: string): Promise<void> => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${BASE_URL}/direction/activity/delete?userId=${userId}&activityId=${id}`,
      { method: "DELETE" },
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la suppression de l'activité",
      );
    message.success("Activité supprimée avec succès !");
  } catch (error) {
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const addTaskToActivity = async (
  taskDetails: UpdateActivityItem,
): Promise<void> => {
  try {
    const type = taskDetails.type === "task" ? "task" : "nextTask";
    const response = await fetch(
      `${BASE_URL}/direction/${type}?activityId=${taskDetails.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([taskDetails.task]),
      },
    );
    if (!response.ok)
      await handleErrorResponse(response, "Erreur lors de l'ajout de la tâche");
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const detachTaskFromActivity = async (taskId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/direction/nextTask/delete?id=${taskId}`,
      { method: "DELETE" },
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la suppression de la tâche",
      );
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const addPerformanceToActivity = async (
  performance: UpdatePerformance,
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/direction/performanceRealization?activityId=${performance.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([performance.performance]),
      },
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de l'ajout de la performance",
      );
    message.success("Performance ajoutée avec succès !");
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const detachPerformanceFromActivity = async (
  id: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/direction/performanceRealization/delete?id=${id}`,
      { method: "DELETE" },
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la suppression de la performance",
      );
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const addRecommendationToActivity = async (
  recommendation: RecommendationUpdate,
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/direction/activity/recommendation?activityId=${recommendation.activityId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: recommendation.description,
          committerId: recommendation.committerId,
        }),
      },
    );
    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de l'ajout de la recommandation",
      );
    message.success("Recommandation envoyée avec succès !");
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const fetchActivitiesStatistics = async (
  params: FetchActivitiesForDirectionParams,
): Promise<Activity[]> => {
  const { weekStartDate, page = 1, pageSize = 15 } = params;

  try {
    const response = await fetch(
      `${BASE_URL}/direction/activities/top?weekStartDate=${weekStartDate}&page=${page}&pageSize=${pageSize}`,
    );

    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la récupération des activités",
      );

    return await response.json();
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};

export const fetchOwnDirectionStatistics = async (
  params: FetchOwnDirectionStatisticsParams,
): Promise<any> => {
  const { directionId, year, page = 1, pageSize = 15 } = params;

  try {
    const response = await fetch(
      `${BASE_URL}/direction/activities/statistics?year=${year}&directionId=${directionId}&page=${page}&pageSize=${pageSize}`,
    );

    if (!response.ok)
      await handleErrorResponse(
        response,
        "Erreur lors de la récupération des statistiques",
      );
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    toast.error("Une erreur inattendue est survenue.");
    throw error instanceof Error ? error : new Error("Erreur inconnue");
  }
};
