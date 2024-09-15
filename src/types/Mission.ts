export type CreateMission = {
  description: string;
  activityList: addActivityItem[];
};

type addActivityItem = {
  description: string;
  performanceRealization: PerformanceRealization[];
};

type PerformanceRealization = {
  indicators: number;
  realization: string;
};
