import { toast } from "react-toastify";
import { saveAs } from "file-saver";


interface reportDetails {
  directionId : string,
  date : string,
  pageSize : string
}

export const exportMissionToXLS = async (id: string[]) => {
  try {
    const url = "http://localhost:8080/direction/mission/export/excel";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des fichiers";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const blob = await response.blob();
    saveAs(blob, "missions.xlsx");
    return blob;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const exportMissionToPDF = async (id: string[]) => {
  try {
    const url = "http://localhost:8080/direction/mission/export/pdf";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des fichiers";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: Blob[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

export const exportMissionToDOC = async (id: string[]) => {
  try {
    const url = "http://localhost:8080/direction/mission/export/doc";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des fichiers";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: Blob[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.error("Une erreur inattendue est survenue.");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};


export const ExportReportMissionWeek = async (id: reportDetails) => {
  try {
    const url = `http://localhost:8080/direction/mydirection/mission/export/week/excel?directionId=${id.directionId}&date=${id.date}&pageSize=${id.pageSize}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        "Erreur inconnue lors de la récupération des fichiers";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const contentDisposition = response.headers.get('Content-Disposition');

    let filename = 'missions.xlsx';
  
    if (contentDisposition && contentDisposition.includes('filename=')) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, ''); 
        }
    }
    
    // Convert the response to a blob
    const blob = await response.blob();
    
    // Use the filename in the saveAs function
    saveAs(blob, filename);
    
    return blob;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
    throw new Error(error instanceof Error ? error.message : "Erreur inconnue");
  }
};
