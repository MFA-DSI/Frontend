import axiosInstance from "../lib/axiosInstance";

export const fetchActivities = async (filterParams: {
  filterPeriod: string;
  filterDirection?: string;
  dateRange: {
    startDate?: string;
    month?: number;
    quarter?: number;
    year?: number;
  };
  userDirectionId?: string;
}) => {
  const {filterPeriod, filterDirection, dateRange, userDirectionId} =
    filterParams;
  let url = "/activities/all";
  const params: any = {};

  if (filterPeriod === "weekly" && dateRange.startDate) {
    url = `/activities/weekly`;
    params.weekStartDate = dateRange.startDate;
  } else if (filterPeriod === "monthly" && dateRange.year && dateRange.month) {
    url = `/activities/monthly`;
    params.year = dateRange.year;
    params.month = dateRange.month;
  } else if (
    filterPeriod === "quarter" &&
    dateRange.year &&
    dateRange.quarter
  ) {
    url = `/activities/quarter`;
    params.year = dateRange.year;
    params.quarter = dateRange.quarter;
  }

  if (filterDirection) {
    url = `/direction${url}`;
    params.directionId = filterDirection;
  } else if (userDirectionId) {
    url = `/mydirection${url}`;
    params.directionId = userDirectionId;
  }

  const response = await axiosInstance.get(url, {params});
  return response.data;
};
