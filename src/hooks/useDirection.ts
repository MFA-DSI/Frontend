// useDirections.ts
import { useQuery } from "@tanstack/react-query";
import {
  addUserToDirection,
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
    queryFn: () => getDirectionResponsiblesInformation(),
  });

  const saveNewUserMutation = useMutation(addUserToDirection, {
    onSuccess: () => {
      queryClient.invalidateQueries(["responsible"]);
    },
  });

  return {
    fetchDirections: fetchAllDirections,
    fetchServices: fetchServiceByDirectionId,
    fetchActualDirection: fetchActualDirectionName,
    fetchUserInformation: fetchDirectionUserInformation.data,
    fetchAllResponsibles: fetchAllDirectionResponsible.data,
    saveNewUser : saveNewUserMutation.mutate,
    isLoading: fetchAllDirections.isLoading,
    isError: fetchAllDirections.isError,
  };
};
