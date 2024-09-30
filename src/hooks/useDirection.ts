// useDirections.ts
import {useQuery} from "@tanstack/react-query";
import {fetchDirections, fetchDirectionServices} from "../providers/direction-provider";
import { useQueryClient } from "react-query";




export const useDirections =()=>{

  const fetchAllDirections = 
    useQuery({
      queryKey: ["directions"],
      queryFn: fetchDirections,
    });


  const fetchServiceByDirectionId = 
    useQuery({
      queryKey: ["services"],
      queryFn: fetchDirectionServices
    })
  
  return {
    fetchDirections : fetchAllDirections,
    fetchServices : fetchServiceByDirectionId,
    isLoading: fetchAllDirections.isLoading,
    isError: fetchAllDirections.isError,
  }
  
}