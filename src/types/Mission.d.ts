export type CreateMission = {
  id: string;
  name: string;
  activityList: addActivityItem[];
};

type addActivityItem = {
  description: string;
  performanceRealization: PerformanceRealization[];
};

type PerformanceRealization = {
  indicators: number;
  realization: string;
  realizationType: string;
};
