import { toast } from "react-toastify";
import { saveAs } from "file-saver";

interface reportDetailsForWeek {
  directionId: string;
  date: string;
  pageSize: string;
}

interface reportDetailsForMonth {
  directionId: string;
  year: number;
  month: number;
  pageSize: string;
}

interface reportDetailsForQuarter {
  directionId: string;
  year: number;
  quarter: number;
  pageSize: string;
}

// Utility function to handle fetch requests and download files
const fetchAndDownloadFile = async (
  url: string,
  requestData: any,
  defaultFilename: string,
  toastMessage: string
) => {
  const loadingToastId = toast.loading(toastMessage);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Erreur inconnue lors de la récupération des fichiers";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = defaultFilename;

    if (contentDisposition && contentDisposition.includes("filename=")) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }

    const blob = await response.blob();
    saveAs(blob, filename);
    toast.dismiss(loadingToastId);
    return blob;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
    toast.dismiss(loadingToastId);
    throw error;
  }
};

// Export functions for different reports
export const exportMissionToXLS = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/mission/export/excel",
    id,
    "missions.xlsx",
    "Génération du rapport en cours..."
  );

export const exportMissionToPDF = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/mission/export/pdf",
    id,
    "missions.pdf",
    "Génération du rapport en cours..."
  );

export const exportMissionToDOC = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/mission/export/doc",
    id,
    "missions.doc",
    "Génération du rapport en cours..."
  );

export const exportReportMissionWeek = async (id: reportDetailsForWeek) =>
  fetchAndDownloadFile(
    `http://localhost:8080/direction/mydirection/mission/export/week/excel?directionId=${id.directionId}&date=${id.date}&pageSize=${id.pageSize}`,
    id,
    "missions_week.xlsx",
    "Génération du rapport hebdomadaire en cours..."
  );

export const exportReportMissionMonth = async (id: reportDetailsForMonth) =>
  fetchAndDownloadFile(
    `http://localhost:8080/direction/mydirection/mission/export/monthly/excel?directionId=${id.directionId}&year=${id.year}&month=${id.month}&pageSize=${id.pageSize}`,
    id,
    "missions_month.xlsx",
    "Génération du rapport mensuel en cours..."
  );

export const exportReportMissionQuarter = async (id: reportDetailsForQuarter) =>
  fetchAndDownloadFile(
    `http://localhost:8080/direction/mydirection/mission/export/quarter/excel?directionId=${id.directionId}&year=${id.year}&quarter=${id.quarter}&pageSize=${id.pageSize}`,
    id,
    "missions_quarter.xlsx",
    "Génération du rapport trimestriel en cours..."
  );

export const exportActivityToXLS = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/activity/export/excel",
    id,
    "activities.xlsx",
    "Génération du rapport d'activités en cours..."
  );
