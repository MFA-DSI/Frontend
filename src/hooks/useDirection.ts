// useDirections.ts
import { useQuery } from "@tanstack/react-query";
import {
  fetchDirectionName,
  fetchDirections,
  fetchDirectionServices,
} from "../providers/direction-provider";
import { useQueryClient } from "react-query";
import {
  getDirectionResponsiblesInformation,
  getUserInformation,
} from "../providers";

export const useDirections = () => {
  // TODO: change this from zustand
  const userId = sessionStorage.getItem("userId");
  const directionId = sessionStorage.getItem("directionId");

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
    queryFn: () => getUserInformation(userId || ""),
  });
  const fetchAllDirectionResponsible = useQuery({
    queryKey: ["responsible"],
    queryFn: () => getDirectionResponsiblesInformation(directionId || ""),
  });

  return {
    fetchDirections: fetchAllDirections,
    fetchServices: fetchServiceByDirectionId,
    fetchActualDirection: fetchActualDirectionName,
    fetchUserInformation: fetchDirectionUserInformation.data,
    fetchAllResponsibles: fetchAllDirectionResponsible.data,
    isLoading: fetchAllDirections.isLoading,
    isError: fetchAllDirections.isError,
  };
};
