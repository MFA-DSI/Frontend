import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "react-query";
import {
  exportMissionToDOC,
  exportMissionToPDF,
  exportMissionToXLS,
} from "../providers";
import { message } from "antd";

export const useFiles = () => {
  const exportToMissionPDF = useMutation(exportMissionToPDF, {
    onSuccess: () => {
      message.success("votre fichier PDF est prêt");
    },
  });

  const exportToMissionXLS = useMutation(exportMissionToXLS, {
    onSuccess: () => {
      message.success("votre fichier Excel est prêt");
    },
  });

  const exportToMissionDOC = useMutation(exportMissionToDOC, {
    onSuccess: () => {
      message.success("votre fichier DOC est prêt");
    },
  });

  return {
    missionToPDF: exportToMissionPDF.mutate,
    missionToDOC: exportToMissionDOC.mutate,
    missionToXLS: exportToMissionXLS.mutate, // Changer "missionTOXLS" en "missionToXLS"
  };
};
