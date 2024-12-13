import { User } from "../types/User";
import { handleAxiosError } from "../lib/handleAxiosError";
import { DirectionName } from "../components";
import { message } from "antd";

const API_URL: string = import.meta.env.VITE_API_URL;

// Interface de nouvelle information utilisateur
interface NewUserInformation {
  firstname: string;
  lastname: string;
  grade: string;
  fonction: string;
  mail: string;
  phoneNumbers: string;
}

// Interface pour mettre à jour l'utilisateur
interface updateUser {
  userId: string;
  userInfoUpdate: NewUserInformation;
}

// Interface pour les responsables de direction
interface DirectionResponsible {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  function: string;
}

// Fonction pour récupérer les informations de l'utilisateur
export const getUserInformation = async (id: string): Promise<User | void> => {
  const token = localStorage.getItem("token"); // Récupérer le token Bearer du localStorage

  try {
    const response = await fetch(`${API_URL}/user/information?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête
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

// Fonction pour récupérer les responsables de direction
export const getDirectionResponsiblesInformation = async (
  directionId: string,
): Promise<DirectionResponsible | void> => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_URL}/direction/responsible?directionId=${directionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête
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

// Fonction pour ajouter un nouvel utilisateur
export const PostNewUser = async (
  user: DirectionResponsible,
): Promise<DirectionResponsible | void> => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_URL}/direction/responsible?directionId=${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête
        },
        body: JSON.stringify(user),
      },
    );

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();
    message.success("Utilisateur ajouté avec succès");
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Fonction pour mettre à jour un utilisateur
export const udpdateUser = async (
  user: updateUser,
): Promise<updateUser | void> => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/user/modify?id=${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Ajouter le token dans l'en-tête
      },
      body: JSON.stringify(user.userInfoUpdate),
    });

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();
    message.success("Utilisateur modifié avec succès");
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
