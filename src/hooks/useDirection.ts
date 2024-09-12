// useDirections.ts
import {useQuery} from "@tanstack/react-query";
import {fetchDirections} from "../providers/direction-provider";

export const useDirections = () => {
  return useQuery({
    queryKey: ["directions"],
    queryFn: fetchDirections,
  });
};
