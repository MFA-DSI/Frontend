import {useQuery} from "react-query";
import {fetchMissions} from "../providers/mission-provider";

// Custom hook for using activities
export const useMissions = () => {
  return useQuery({
    queryKey: ["missions"],
    queryFn: fetchMissions,
  });
};
