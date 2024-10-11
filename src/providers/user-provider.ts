import { User } from "../types/User";
import { handleAxiosError } from "../lib/handleAxiosError"; // You might want to rename this to handleFetchError or modify it to handle general errors

const API_URL: string = import.meta.env.VITE_API_URL;

export const getUserInformation = async (id: string): Promise<User | void> => {
  try {
    const response = await fetch(`${API_URL}/user/information?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const data = await response.json();
    console.log("data ",data);
    
    return data;
  } catch (error) {
    // Replace handleAxiosError with a more general error handler if necessary
    handleAxiosError(error);
  }
};
