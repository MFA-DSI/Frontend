import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "react-query";
import {
  exportMissionToDOC,
  exportMissionToPDF,
  exportMissionToXLS,
  ExportReportMissionMonth,
  ExportReportMissionQuarter,
  ExportReportMissionWeek,
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


  const exportWeeklyReportToMissionXLS = useMutation(ExportReportMissionWeek, {
    onSuccess: () => {
      message.success("votre rapport XLS est prêt");
    },
  });
  const exportMonthlyReportToMissionXLS = useMutation(ExportReportMissionMonth, {
    onSuccess: () => {
      message.success("votre rapport XLS est prêt");
    },
  });

  const exportQuarterlyReportToMissionXLS = useMutation(ExportReportMissionQuarter, {
    onSuccess: () => {
      message.success("votre rapport XLS est prêt");
    },
  });



  return {
    missionToPDF: exportToMissionPDF.mutate,
    missionToDOC: exportToMissionDOC.mutate,
    missionToXLS: exportToMissionXLS.mutate,
    reportMissionWeekly: exportWeeklyReportToMissionXLS.mutate,
    reportMissionMonthly : exportMonthlyReportToMissionXLS.mutate,
    reportMissionQuarterly : exportQuarterlyReportToMissionXLS.mutate,
  };
};
