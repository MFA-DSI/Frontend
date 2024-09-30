// useDirections.ts
import {useQuery} from "@tanstack/react-query";
import {fetchDirectionName, fetchDirections, fetchDirectionServices} from "../providers/direction-provider";
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

    const fetchActualDirectionName = 
    useQuery({
      queryKey: ["service"],
      queryFn: fetchDirectionName
    })


  
  return {
    fetchDirections : fetchAllDirections,
    fetchServices : fetchServiceByDirectionId,
    fetchActualDirection : fetchActualDirectionName,
    isLoading: fetchAllDirections.isLoading,
    isError: fetchAllDirections.isError,
  }
  
}