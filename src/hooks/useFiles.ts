import { useQuery } from "@tanstack/react-query";
import {
  fetchDirectionName,
  fetchDirections,
  fetchDirectionServices,
} from "../providers/direction-provider";
import { useMutation, useQueryClient } from "react-query";
import { exportMissionToDOC, exportMissionToPDF, exportMissionToXLS } from "../providers";
import { message } from "antd";

export const useFiles = () => {
  const exportToMissionPDF =  useMutation(exportMissionToPDF, {
    onSuccess: () => {
     message.success("votre fichier PDF est prête")
    },
  });

  const exportToMissionXLS =  useMutation(exportMissionToXLS, {
    onSuccess: () => {
     message.success("votre fichier excel est prête")
    },
  });

  const exportToMissionDOC =  useMutation(exportMissionToDOC, {
    onSuccess: () => {
     message.success("votre fichier doc est prête")
    },
  });

  return {
    missionToPDF: exportToMissionPDF,
    missionToDOC: exportToMissionDOC,
    missionTOXLS : exportToMissionXLS  
  };
};
