// useDirections.ts
import { useQuery } from "@tanstack/react-query";
import {
  addReponsibleToDirection,
  addUserToDirection,
  approveUserToDirection,
  fetchDirectionName,
  fetchDirections,
  fetchDirectionServices,
} from "../providers/direction-provider";
import { useMutation, useQueryClient } from "react-query";
import {
  getDirectionResponsiblesInformation,
  getUserInformation,
} from "../providers";

export const useDirections = () => {
  const queryClient = useQueryClient();

  // TODO: change this from zustand

  const userId = localStorage.getItem("userId");
  const directionId = localStorage.getItem("directionId");

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
    enabled: !!directionId,
  });

  const fetchDirectionUserInformation = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInformation(userId || ""),
    enabled: !!userId,
  });

  return {
    fetchDirections: fetchAllDirections.data,
    fetchServices: fetchServiceByDirectionId.data,
    fetchActualDirection: fetchActualDirectionName,
    fetchUserInformation: fetchDirectionUserInformation.data,
    isLoading: fetchAllDirections.isLoading,
    isUserLoading: fetchDirectionUserInformation.isLoading,
    isError: fetchAllDirections.isError,
  };
};
