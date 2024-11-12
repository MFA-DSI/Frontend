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
  udpdateUser,
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
    queryFn: ()=>fetchDirectionServices(localStorage.getItem("directionId")!),
    enabled: !!localStorage.getItem("directionId"),
  });

  const fetchActualDirectionName = useQuery({
    queryKey: ["service"],
    queryFn: ()=>fetchDirectionName(localStorage.getItem("directionId")!),
    enabled: !!localStorage.getItem("directionId"),
  });

  const fetchDirectionUserInformation = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInformation(userId || ""),
    enabled: !!localStorage.getItem("userId"),
  });

  const updateUserInformation = useMutation(udpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return {
    fetchDirections: fetchAllDirections.data,
    fetchServices: fetchServiceByDirectionId.data,
    fetchActualDirection: fetchActualDirectionName,
    fetchUserInformation: fetchDirectionUserInformation.data,
    updateUserInformation,
    isLoading: fetchAllDirections.isLoading,
    isUserLoading: fetchDirectionUserInformation.isLoading,
    isError: fetchAllDirections.isError,
  };
};
