import { User } from "../types/User";
import { handleAxiosError } from "../lib/handleAxiosError";
import { Direction } from "readline";
import { DirectionName } from "../components";
import { message } from "antd";

const API_URL: string = import.meta.env.VITE_API_URL;

interface NewUserInformation {
  firstname: string;
  lastname: string;
  grade: string;
  function: string;
  mail: string;
  phoneNumbers: string;
}

interface updateUser {
  userId: string;
  userInfoUpdate: NewUserInformation;
}

interface DirectionResponsible {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  function: string;
}

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
  directionId,
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
  user,
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
    message.success("utilisateur ajouter avec succées");

    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
export const udpdateUser = async (
  user: updateUser,
): Promise<updateUser | void> => {
  try {
    const response = await fetch(`${API_URL}/user/modify?id=${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.userInfoUpdate),
    });

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();
    message.success("utilisateur modifié avec succées");

    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
