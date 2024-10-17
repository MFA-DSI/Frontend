import { message } from "antd";
import { Direction, Service } from "../types";

const API_URL: string = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumbers: string;
  grade: string;
  function: string;
  directionId: string;
}

interface PostedNewUser {
  identity: string;
  password: string;
}

interface UsertoApprove {
  reponsibleId :string,
  toApproveId : string
}

export const fetchDirections = async (): Promise<Direction[]> => {
  try {
    const response = await fetch(`${API_URL}/direction/all`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Direction[] = await response.json();
    return data;
  } catch (error) {
    message.error("Failed to fetch directions");
    console.error(error);
    return [];
  }
};

export const fetchDirectionServices = async (): Promise<Service[]> => {
  try {
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
  } catch (error) {
    message.error("Failed to fetch services");
    console.error(error);
    return [];
  }
};

export const fetchDirectionName = async (): Promise<Direction | null> => {
  try {
    const directionId = localStorage.getItem("directionId");
    const response = await fetch(`${API_URL}/direction/name/${directionId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Direction = await response.json();
    return data;
  } catch (error) {
    message.error("Failed to fetch direction name");
    console.error(error);
    return null;
  }
};

export const addUserToDirection = async (usertoAdd: User): Promise<User | null> => {
  try {
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
    message.success("Utilisateur ajouté avec succès");
    return data;
  } catch (error) {
    message.error("Failed to add user");
    console.error(error);
    return null;
  }
};

export const addReponsibleToDirection = async (usertoAdd: User): Promise<User | null> => {
  try {
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
    message.success("Responsable ajouté avec succès");
    return data;
  } catch (error) {
    message.error("Failed to add responsible user");
    console.error(error);
    return null;
  }
};

export const approveUserToDirection = async (concernedUser) => {
  console.log("concern", concernedUser.responsibleId);
  
  try {
    const response = await fetch(
      `${API_URL}/users/user/approve?userId=${concernedUser.responsibleId}&toApproveId=${concernedUser.toApproveId}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: PostedNewUser = await response.json();
    return data;
  } catch (error) {
    message.error("Failed to approve user");
    console.error(error);
    return null;
  }
};
