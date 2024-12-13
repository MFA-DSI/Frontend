import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import environment from "../conf/environment";
import { message } from "antd";

// Assume `API_BASE_URL` is defined in the environment configuration file
const API_BASE_URL = environment.apiBaseUrl;

interface ReportDetailsForWeek {
  directionId: string;
  date: string;
  pageSize: string;
}

interface ReportDetailsForMonth {
  directionId: string;
  year: number;
  month: number;
  pageSize: string;
}

interface ReportDetailsForQuarter {
  directionId: string;
  year: number;
  quarter: number;
  pageSize: string;
}

interface ReportForOtherDirection {
  requestId: string;
}

// Utility function to handle fetch requests and download files
const fetchAndDownloadFile = async (
  url: string,
  requestData: any,
  toastMessage: string,
) => {
  const loadingToastId = toast.loading(toastMessage);
  const token = localStorage.getItem("token"); // Récupérer le token Bearer

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des fichiers";
      message.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Extract the filename from the Content-Disposition header

    const filename = response.headers
      .get("content-disposition")
      .split(";")
      .find((n) => n.includes("filename="))
      .replace("filename=", "")
      .trim();
    // If no filename is found, throw an error or use a default
    if (!filename) {
      const errorMessage = "Nom du fichier non trouvé dans le header";
      message.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Get the file as a Blob and trigger the download
    const blob = await response.blob();
    saveAs(blob, filename); // Use the filename from Content-Disposition
    toast.dismiss(loadingToastId);
    return blob;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.dismiss(loadingToastId);
    throw error;
  }
};

// Helper to generate export URLs based on report type
const buildUrl = (path: string, params?: Record<string, any>) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
  }
  return url.toString();
};

// Export functions for different reports
export const exportMissionToXLS = async (id: string[]) =>
  fetchAndDownloadFile(
    buildUrl("/direction/mission/export/excel"),
    id,
    "Génération du rapport en cours...",
  );

export const exportMissionToPDF = async (id: string[]) =>
  fetchAndDownloadFile(
    buildUrl("/direction/mission/export/pdf"),
    id,
    "Génération du rapport en cours...",
  );

export const exportMissionToDOC = async (id: string[]) =>
  fetchAndDownloadFile(
    buildUrl("/direction/mission/export/doc"),
    id,
    "Génération du rapport en cours...",
  );

export const exportReportMissionWeek = async (details: ReportDetailsForWeek) =>
  fetchAndDownloadFile(
    buildUrl("/direction/mydirection/mission/export/week/excel", details),
    details,
    "Génération du rapport hebdomadaire en cours...",
  );

export const exportReportMissionMonth = async (
  details: ReportDetailsForMonth,
) =>
  fetchAndDownloadFile(
    buildUrl("/direction/mydirection/mission/export/monthly/excel", details),
    details,
    "Génération du rapport mensuel en cours...",
  );

export const exportReportMissionQuarter = async (
  details: ReportDetailsForQuarter,
) =>
  fetchAndDownloadFile(
    buildUrl("/direction/mydirection/mission/export/quarter/excel", details),
    details,
    "Génération du rapport trimestriel en cours...",
  );

export const exportActivityToXLS = async (id: string[]) =>
  fetchAndDownloadFile(
    buildUrl("/direction/activity/export/excel"),
    id,
    "Génération du rapport d'activités en cours...",
  );

export const exportReportToXLS = async (id: ReportForOtherDirection) =>
  fetchAndDownloadFile(
    buildUrl("/direction/other_direction/mission/export/week/excel", {
      directionId: id.requestId,
    }),
    id,
    "Génération du rapport d'activités en cours...",
  );
