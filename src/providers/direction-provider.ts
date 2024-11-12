import { message } from "antd";
import { Direction, Service, User, PostedNewUser, NewResponsible } from "../types";
import { errorTranslations } from "./utils/translator/translator";

const API_URL = import.meta.env.VITE_API_URL;

const fetchData = async <T>(
  url: string,
  options: RequestInit,
  errorMessage: string,
): Promise<T | null> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(errorMessage);

    return await response.json();
  } catch (error: any) {
    const language = "fr"; // Adjust dynamically if needed

    let translatedError = errorTranslations[language][errorMessage] || errorMessage;

    // Check if the error contains an email address dynamically
    const emailRegex = /User with the email address: (.+) already exists/;
    const emailMatch = error.message.match(emailRegex);

    if (emailMatch) {
      const email = emailMatch[1];
      translatedError = errorTranslations[language]["User with the email address already exists"]?.replace("{email}", email);
    }

    message.error(translatedError || `Erreur inconnue: ${error.message}`);
    console.error(error);
    return null;
  }
};

export const fetchDirections = async (): Promise<Direction[]> => {
  return (
    (await fetchData<Direction[]>(
      `${API_URL}/direction/all`,
      { method: "GET" },
      "Failed to fetch directions",
    )) || []
  );
};

export const fetchDirectionServices = async (): Promise<Service[]> => {
  const directionId = localStorage.getItem("directionId");
  return (
    (await fetchData<Service[]>(
      `${API_URL}/direction/service/all?directionId=${directionId}`,
      { method: "GET" },
      "Failed to fetch services",
    )) || []
  );
};

export const fetchDirectionName = async (): Promise<Direction | null> => {
  const directionId = localStorage.getItem("directionId");
  return fetchData<Direction>(
    `${API_URL}/direction/name/${directionId}`,
    { method: "GET" },
    "Failed to fetch direction name",
  );
};

const postData = async <T>(
  url: string,
  data: T,
  successMessage: string,
  errorMessage: string,
): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      message.error(errorData.message || errorMessage);
      return null;
    }

    const responseData = await response.json();
    message.success(successMessage);
    return responseData;
  } catch (error) {
    message.error(errorMessage);
    console.error(error);
    return null;
  }
};

export const addUserToDirection = (userToAdd: User): Promise<User | null> =>
  postData<User>(
    `${API_URL}/users/createUser`,
    userToAdd,
    "Utilisateur créée avec succées",
    "Une erreur s'est produite lors de la création de l'utilisateur",
  );

export const addResponsibleToDirection = (
  userToAdd: NewResponsible,
): Promise<NewResponsible | null> =>
  postData<NewResponsible>(
    `${API_URL}/users/createAdmin`,
    userToAdd,
    "Responsable créée avec succées",
    "Une erreur s'est produite lors de la création de l'utilisateur",
  );

export const approveUserToDirection = async (concernedUser: {
  responsibleId: string;
  toApproveId: string;
}): Promise<PostedNewUser | null> => {
  const url = `${API_URL}/users/user/approve?userId=${concernedUser.responsibleId}&toApproveId=${concernedUser.toApproveId}`;
  return fetchData<PostedNewUser>(
    url,
    { method: "PUT" },
    "Failed to approve user",
  );
};
