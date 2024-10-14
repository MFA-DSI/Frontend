import { Direction, Service } from "../types";

const API_URL: string = import.meta.env.VITE_API_URL;

export const fetchDirections = async (): Promise<Direction[]> => {
  const response = await fetch(`${API_URL}/direction/all`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Direction[] = await response.json();
  return data;
};

export const fetchDirectionServices = async () => {
  const directionId = sessionStorage.getItem("directionId");
  const response = await fetch(
    `${API_URL}/direction/service/all?directionId=${directionId}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Service[] = await response.json();

  return data;
};

export const fetchDirectionName = async () => {
  const directionId = sessionStorage.getItem("directionId");
  const response = await fetch(`${API_URL}/direction/name/${directionId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Direction = await response.json();
  console.log(data);
  return data;
};
