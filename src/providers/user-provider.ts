import { User } from "../types/User";
import { handleAxiosError } from "../lib/handleAxiosError"; // You might want to rename this to handleFetchError or modify it to handle general errors
import { Direction } from "readline";
import { DirectionName } from "../components";

const API_URL: string = import.meta.env.VITE_API_URL;



interface newUser {
  firstname : string,
  lastname: string,
  grade : string,
  function: string,
  mail: string,
  phoneNumbers: string
}
interface DirectionResponsible {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  function: string;
}

const directionId = localStorage.getItem("directionId");
export const getUserInformation = async (id: string): Promise<User | void> => {
  try {
    const response = await fetch(`${API_URL}/user/information?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getDirectionResponsiblesInformation = async (
): Promise<DirectionResponsible | void> => {
  try {
    const response = await fetch(
      `${API_URL}/direction/responsible?directionId=${directionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
export const PostNewUser = async (
  user ,
): Promise<DirectionResponsible | void> => {
  try {
    const response = await fetch(
      `${API_URL}/direction/responsible?directionId=${directionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};