import { toast } from "react-toastify";
import { saveAs } from "file-saver";

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

// Utility function to handle fetch requests and download files
const fetchAndDownloadFile = async (
  url: string,
  requestData: any,
  defaultFilename: string,
  toastMessage: string,
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
        errorData.message ||
        "Erreur inconnue lors de la récupération des fichiers";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const contentDisposition = response.headers.get("Content-Disposition");
    const filename =
      contentDisposition
        ?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)?.[1]
        ?.replace(/['"]/g, "") || defaultFilename;

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
    "Génération du rapport en cours...",
  );

export const exportMissionToPDF = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/mission/export/pdf",
    id,
    "missions.pdf",
    "Génération du rapport en cours...",
  );

export const exportMissionToDOC = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/mission/export/doc",
    id,
    "missions.doc",
    "Génération du rapport en cours...",
  );

export const exportReportMissionWeek = async (details: ReportDetailsForWeek) =>
  fetchAndDownloadFile(
    `http://localhost:8080/direction/mydirection/mission/export/week/excel?directionId=${details.directionId}&date=${details.date}&pageSize=${details.pageSize}`,
    details,
    "missions_week.xlsx",
    "Génération du rapport hebdomadaire en cours...",
  );

export const exportReportMissionMonth = async (
  details: ReportDetailsForMonth,
) =>
  fetchAndDownloadFile(
    `http://localhost:8080/direction/mydirection/mission/export/monthly/excel?directionId=${details.directionId}&year=${details.year}&month=${details.month}&pageSize=${details.pageSize}`,
    details,
    "missions_month.xlsx",
    "Génération du rapport mensuel en cours...",
  );

export const exportReportMissionQuarter = async (
  details: ReportDetailsForQuarter,
) =>
  fetchAndDownloadFile(
    `http://localhost:8080/direction/mydirection/mission/export/quarter/excel?directionId=${details.directionId}&year=${details.year}&quarter=${details.quarter}&pageSize=${details.pageSize}`,
    details,
    "missions_quarter.xlsx",
    "Génération du rapport trimestriel en cours...",
  );

export const exportActivityToXLS = async (id: string[]) =>
  fetchAndDownloadFile(
    "http://localhost:8080/direction/activity/export/excel",
    id,
    "activities.xlsx",
    "Génération du rapport d'activités en cours...",
  );
