import { toast } from "react-toastify";
import environment from "../conf/environment";
import { CreateMission, Service } from "../types";

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

interface missionFilterWeek {
  directionId: string;
  weekStartDate: string;
  page: number;
  pageSize: number;
}
interface missionFilterMonth {
  directionId: string;
  month: string;
  year: string;
  page: number;
  pageSize: number;
}

interface missionFilterQuarter {
  directionId: string;
  quarter: string;
  year: string;
  page: number;
  pageSize: number;
}

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
  directionId: string,
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
  directionId: string,
): Promise<Mission[]> => {
  try {
    const url = `http://localhost:8080/direction/mission/directions?directionId=${directionId}&page=1&page_size=100`;
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
    console.log("mission ", data);

    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const saveMission = async (mission: CreateMission): Promise<Mission> => {
  try {
    const directionId = localStorage.getItem("directionId");
    const userId = localStorage.getItem("userId");
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

export const deleteMission = async (id: string): Promise<void> => {
  const userId = localStorage.getItem("userId");
  try {
    const url = `http://localhost:8080/direction/mission/delete?userId=${userId}&missionId=${id}`;
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

export const updateMission = async (mission: MissionName): Promise<Mission> => {
  try {
    const directionId = localStorage.getItem("directionId");
    const userId = localStorage.getItem("userId");
    const url = `http://localhost:8080/direction/mission/update?directionId=${directionId}&userId=${userId}&missionId=${mission.id}`;
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
export const getWeeklyAtivityByDirectionId = async (
  params: missionFilterWeek,
): Promise<Mission[]> => {
  try {
    const url = `http://localhost:8080/direction/mission/directions?directionId=${params.directionId}&weekStartDate=${params.weekStartDate}}&page=${params.page}&page_size=${params.pageSize}`;
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
    console.log("mission ", data);

    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const getMonthlyAtivityByDirectionId = async (
  params: missionFilterMonth,
): Promise<Mission[]> => {
  try {
    const url = `http://localhost:8080/direction/mission/directions?directionId=${params.directionId}&year=${params.year}}&month=${params.month}&page=${params.page}&page_size=${params.pageSize}`;
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
    console.log("mission ", data);

    return data;
  } catch (error) {
    console.error("Error fetching missions by directionId:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const getQuarterlyAtivityByDirectionId = async (
  params: missionFilterQuarter,
): Promise<Mission[]> => {
  try {
    const url = `http://localhost:8080/direction/mission/directions?directionId=${params.directionId}&quarter=${params.quarter}}&year=${params.year}&page=${params.page}&page_size=${params.pageSize}`;
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
