import { toast } from "react-toastify";
import environment from "../conf/environment";
import { CreateMission, Service } from "../types";

// Define interfaces
interface Mission {
  id: string;
  description: string;
  serviceId: string;
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

interface MissionFilterWeek {
  directionId: string;
  weekStartDate: string;
  page: number;
  pageSize: number;
}

interface MissionFilterMonth {
  directionId: string;
  month: string;
  year: string;
  page: number;
  pageSize: number;
}

interface MissionFilterQuarter {
  directionId: string;
  quarter: string;
  year: string;
  page: number;
  pageSize: number;
}

// Base API URL
const BASE_URL = environment.apiBaseUrl;

// Helper function for error handling and toast notification
const handleError = async (response: Response, defaultMessage: string) => {
  const errorData = await response.json();
  const errorMessage = errorData.message || defaultMessage;
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

// Helper function to fetch data with error handling
const fetchData = async <T>(
  url: string,
  options: RequestInit,
  errorMessage: string,
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    await handleError(response, errorMessage);
  }
  return response.json();
};

// Fetch all missions
export const fetchMissions = async (): Promise<Mission[]> => {
  const url = `${BASE_URL}/direction/mission/all?page=1&page_size=100`;
  return fetchData<Mission[]>(
    url,
    { method: "GET" },
    "Erreur lors de la récupération des activités",
  );
};

// Fetch mission names by direction ID
export const fetchMissionsName = async (
  directionId: string,
): Promise<MissionName[]> => {
  const url = `${BASE_URL}/direction/mission/name?directionId=${directionId}`;
  return fetchData<MissionName[]>(
    url,
    { method: "GET" },
    "Erreur lors de la récupération des noms des missions",
  );
};

// Fetch missions by direction ID
export const getByDirectionId = async (
  directionId: string,
): Promise<Mission[]> => {
  const url = `${BASE_URL}/direction/mission/directions?directionId=${directionId}&page=1&page_size=100`;
  return fetchData<Mission[]>(
    url,
    { method: "GET" },
    "Erreur lors de la récupération des missions par direction",
  );
};

// Save a new mission
export const saveMission = async (mission: CreateMission): Promise<Mission> => {
  const directionId = localStorage.getItem("directionId");
  const userId = localStorage.getItem("userId");
  const url = `${BASE_URL}/direction/mission/create?directionId=${directionId}&userId=${userId}`;

  console.log(mission);

  return fetchData<Mission>(
    url,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    },
    "Erreur lors de l'enregistrement de la mission",
  );
};

// Delete a mission by ID
export const deleteMission = async (id: string): Promise<void> => {
  const userId = localStorage.getItem("userId");
  const url = `${BASE_URL}/direction/mission/delete?userId=${userId}&missionId=${id}`;

  await fetchData<void>(
    url,
    { method: "DELETE" },
    "Erreur lors de la suppression de la mission",
  );
};

// Update an existing mission
export const updateMission = async (mission: MissionName): Promise<Mission> => {
  const directionId = localStorage.getItem("directionId");
  const userId = localStorage.getItem("userId");
  const url = `${BASE_URL}/direction/mission/update?directionId=${directionId}&userId=${userId}&missionId=${mission.id}`;

  return fetchData<Mission>(
    url,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    },
    "Erreur lors de la mise à jour de la mission",
  );
};

// Fetch weekly activities by direction ID
export const getWeeklyActivityByDirectionId = async (
  params: MissionFilterWeek,
): Promise<Mission[]> => {
  const url = `${BASE_URL}/direction/activities/week?directionId=${params.directionId}&weekStartDate=${params.weekStartDate}&page=${params.page}&page_size=${params.pageSize}`;
  return fetchData<Mission[]>(
    url,
    { method: "GET" },
    "Erreur lors de la récupération des missions par semaine",
  );
};

// Fetch monthly activities by direction ID
export const getMonthlyActivityByDirectionId = async (
  params: MissionFilterMonth,
): Promise<Mission[]> => {
  const url = `${BASE_URL}/direction/mission/month?directionId=${params.directionId}&year=${params.year}&month=${params.month}&page=${params.page}&pageSize=${params.pageSize}`;
  return fetchData<Mission[]>(
    url,
    { method: "GET" },
    "Erreur lors de la récupération des missions par mois",
  );
};

// Fetch quarterly activities by direction ID
export const getQuarterlyActivityByDirectionId = async (
  params: MissionFilterQuarter,
): Promise<Mission[]> => {
  const url = `${BASE_URL}/direction/mission/quarter?directionId=${params.directionId}&quarter=${params.quarter}&year=${params.year}&page=${params.page}&pageSize=${params.pageSize}`;
  return fetchData<Mission[]>(
    url,
    { method: "GET" },
    "Erreur lors de la récupération des missions par trimestre",
  );
};
