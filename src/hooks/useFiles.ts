import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "react-query";
import {
  exportActivityToXLS,
  exportMissionToDOC,
  exportMissionToPDF,
  exportMissionToXLS,
  exportReportMissionMonth,
  exportReportMissionQuarter,
  exportReportMissionWeek,
  exportReportToXLS,
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

  const exportWeeklyReportToMissionXLS = useMutation(exportReportMissionWeek, {
    onSuccess: () => {
      message.success("votre rapport XLS est prêt");
    },
  });
  const exportMonthlyReportToMissionXLS = useMutation(
    exportReportMissionMonth,
    {
      onSuccess: () => {
        message.success("votre rapport XLS est prêt");
      },
    },
  );

  const exportQuarterlyReportToMissionXLS = useMutation(
    exportReportMissionQuarter,
    {
      onSuccess: () => {
        message.success("votre rapport XLS est prêt");
      },
    },
  );

  const exportDirectionActivitytToXLS = useMutation(exportActivityToXLS, {
    onSuccess: () => {
      message.success("votre rapport XLS est prêt");
    },
  });

  const exportDirectionReportToXLS = useMutation(exportReportToXLS, {
    onSuccess: () => {
      message.success("votre rapport XLS est prêt");
    },
  });

  return {
    missionToPDF: exportToMissionPDF.mutate,
    missionToDOC: exportToMissionDOC.mutate,
    missionToXLS: exportToMissionXLS.mutate,
    activitiesToXLS: exportDirectionActivitytToXLS.mutate,
    reportMissionWeekly: exportWeeklyReportToMissionXLS.mutate,
    reportMissionMonthly: exportMonthlyReportToMissionXLS.mutate,
    reportMissionQuarterly: exportQuarterlyReportToMissionXLS.mutate,
    reportMissionOtherDirection: exportDirectionReportToXLS.mutate,
  };
};
