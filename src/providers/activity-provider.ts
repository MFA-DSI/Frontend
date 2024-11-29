import axios, { AxiosRequestConfig } from "axios";
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
  page?: number;
  pageSize?: number;
}

export interface FetchOwnDirectionStatisticsParams {
  directionId: string;
  year: number;
  page?: number;
  pageSize?: number;
}

const BASE_URL = environment.apiBaseUrl || "http://localhost:8080";

/**
 * Centralise la gestion des erreurs pour les réponses HTTP.
 */
const handleErrorResponse = (error: any, defaultMessage: string) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  message.error(errorMessage || "Une erreur s'est produite");
  throw new Error(errorMessage);
};

/**
 * Fonction utilitaire pour effectuer des requêtes HTTP avec un Bearer Token.
 */
const httpRequest = async <T>(
  url: string,
  options: AxiosRequestConfig,
  errorMessage: string,
  successMessage?: string
): Promise<T> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "", // Ajout du Bearer Token
      },
    });

    if (successMessage) {
      message.success(successMessage);
    }

    return response.data;
  } catch (error) {
    handleErrorResponse(error, errorMessage);
  }
};

/**
 * Récupère toutes les activités.
 */
export const fetchActivities = async (): Promise<Activity[]> => {
  return httpRequest(
    `${BASE_URL}/direction/activities/all?page=1&page_size=1000`,
    { method: "GET" },
    "Erreur lors de la récupération des activités"
  );
};

/**
 * Récupère les activités associées à une direction donnée.
 */
export const getActivityByDirectionId = async (directionId: string): Promise<Activity[]> => {
  return httpRequest(
    `${BASE_URL}/direction/activity/direction?directionId=${directionId}&page=1&page_size=1000`,
    { method: "GET" },
    "Erreur lors de la récupération des missions par direction"
  );
};

/**
 * Récupère une activité par son ID.
 */
export const getActivityById = async (id: string): Promise<Activity> => {
  return httpRequest(
    `${BASE_URL}/direction/activity?id=${id}`,
    { method: "GET" },
    "Erreur lors de la récupération de l'activité"
  );
};

/**
 * Met à jour une activité.
 */
export const updateActivity = async (activity: Activity): Promise<Activity> => {
  return httpRequest(
    `${BASE_URL}/direction/activity/update`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(activity),
    },
    "Erreur lors de la mise à jour de l'activité"
  );
};

/**
 * Supprime une activité par son ID.
 */
export const deleteActivity = async (id: string): Promise<void> => {
  const userId = localStorage.getItem("userId");
  return httpRequest(
    `${BASE_URL}/direction/activity/delete?userId=${userId}&activityId=${id}`,
    { method: "DELETE" },
    "Erreur lors de la suppression de l'activité",
    "Activité supprimée avec succès !"
  );
};

/**
 * Ajoute une tâche à une activité.
 */
export const addTaskToActivity = async (taskDetails: UpdateActivityItem): Promise<void> => {
  const type = taskDetails.type === "task" ? "task" : "nextTask";
  return httpRequest(
    `${BASE_URL}/direction/${type}?activityId=${taskDetails.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify([taskDetails.task]),
    },
    "Erreur lors de l'ajout de la tâche"
  );
};

/**
 * Supprime une tâche d'une activité.
 */
export const detachTaskFromActivity = async (taskId: string): Promise<void> => {
  return httpRequest(
    `${BASE_URL}/direction/nextTask/delete?id=${taskId}`,
    { method: "DELETE" },
    "Erreur lors de la suppression de la tâche"
  );
};

/**
 * Ajoute une performance à une activité.
 */
export const addPerformanceToActivity = async (performance: UpdatePerformance): Promise<void> => {
  return httpRequest(
    `${BASE_URL}/direction/performanceRealization?activityId=${performance.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify([performance.performance]),
    },
    "Erreur lors de l'ajout de la performance",
    "Performance ajoutée avec succès !"
  );
};

/**
 * Supprime une performance d'une activité.
 */
export const detachPerformanceFromActivity = async (id: string): Promise<void> => {
  return httpRequest(
    `${BASE_URL}/direction/performanceRealization/delete?id=${id}`,
    { method: "DELETE" },
    "Erreur lors de la suppression de la performance"
  );
};

/**
 * Ajoute une recommandation à une activité.
 */
export const addRecommendationToActivity = async (
  recommendation: RecommendationUpdate
): Promise<void> => {
  return httpRequest(
    `${BASE_URL}/direction/activity/recommendation?activityId=${recommendation.activityId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        description: recommendation.description,
        committerId: recommendation.committerId,
      }),
    },
    "Erreur lors de l'ajout de la recommandation",
    "Recommandation envoyée avec succès !"
  );
};

/**
 * Récupère des statistiques des activités d'une direction.
 */
export const fetchActivitiesStatistics = async (
  params: FetchActivitiesForDirectionParams
): Promise<Activity[]> => {
  const { weekStartDate, page = 1, pageSize = 15 } = params;

  return httpRequest(
    `${BASE_URL}/direction/activities/top?weekStartDate=${weekStartDate}&page=${page}&pageSize=${pageSize}`,
    { method: "GET" },
    "Erreur lors de la récupération des activités"
  );
};

/**
 * Récupère des statistiques pour une direction spécifique.
 */
export const fetchOwnDirectionStatistics = async (
  params: FetchOwnDirectionStatisticsParams
): Promise<any> => {
  const { directionId, year, page = 1, pageSize = 15 } = params;

  return httpRequest(
    `${BASE_URL}/direction/activities/statistics?year=${year}&directionId=${directionId}&page=${page}&pageSize=${pageSize}`,
    { method: "GET" },
    "Erreur lors de la récupération des statistiques"
  );
};
