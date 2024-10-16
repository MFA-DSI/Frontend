import { message } from "antd";
import { Direction, Service } from "../types";

const API_URL: string = import.meta.env.VITE_API_URL;



interface User {
  id: string,
  firstname: string,
  lastname: string,
  email : string,
  phoneNumbers: string,
  grade: string,
  function : string,
  directionId: string
}

interface PostedNewUser{
  identity : string;
  password : string
}

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
  const directionId = localStorage.getItem("directionId");
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
  const directionId = localStorage.getItem("directionId");
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
export const addUserToDirection = async (usertoAdd : User) => {
  
  const response = await fetch(`${API_URL}/users/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usertoAdd),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: User = await response.json();
  message.success("utilisteur ajouter avec succées")
  return data;
};

export const addReponsibleToDirection = async (usertoAdd : User) => {
  
  const response = await fetch(`${API_URL}/users/createAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usertoAdd),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: User = await response.json();
  message.success("utilisteur ajouter avec succées")
  
  return data;
};
