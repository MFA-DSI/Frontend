// useDirections.ts
import { useQuery } from "@tanstack/react-query";
import {
  fetchDirectionName,
  fetchDirections,
  fetchDirectionServices,
} from "../providers/direction-provider";
import { useQueryClient } from "react-query";
import { getUserInformation } from "../providers";

export const useDirections = () => {

  const userId = sessionStorage.getItem("userId")
  const fetchAllDirections = useQuery({
    queryKey: ["directions"],
    queryFn: fetchDirections,
  });

  const fetchServiceByDirectionId = useQuery({
    queryKey: ["services"],
    queryFn: fetchDirectionServices,
  });

  const fetchActualDirectionName = useQuery({
    queryKey: ["service"],
    queryFn: fetchDirectionName,
  });

  const fetchDirectionUserInformation = useQuery({
    queryKey: ["user"],
    queryFn : ()=>  getUserInformation(userId || "")
  })

  return {
    fetchDirections: fetchAllDirections,
    fetchServices: fetchServiceByDirectionId,
    fetchActualDirection: fetchActualDirectionName,
    fetchUserInformation : fetchDirectionUserInformation.data,
    isLoading: fetchAllDirections.isLoading,
    isError: fetchAllDirections.isError,
  };
};
