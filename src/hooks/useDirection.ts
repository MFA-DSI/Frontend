// useDirections.ts
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Direction} from "../types";
import environment from "../conf/environment";

const API_URL: string = import.meta.env.VITE_API_URL;

const fetchDirections = async (): Promise<Direction[]> => {
  const response = await fetch(`${API_URL}/direction/all`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Direction[] = await response.json();
  return data;
};

interface Direction {
  id: string;
  name: string;
}

export const useDirections = () => {
  return useQuery({
    queryKey: ["directions"],
    queryFn: fetchDirections,
  });
};
