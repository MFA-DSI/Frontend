import axios from "axios";
import { AuthLogin } from "../types/Auth";
import { AuthReponse } from "../types/AuthReponse";
import { toast } from "react-toastify";
import environment from "../conf/environment";
import { errorTranslations } from "./utils/translator/translator";
import { useAuthStore } from "../hooks";
import {jwtDecode} from "jwt-decode";

export const authProvider = {
  login: async (auth: AuthLogin): Promise<void> => {
    try {
      const response = await toast.promise(
        axios.post(`${environment.apiBaseUrl}/users/login`, auth),
        {
          pending: "Connexion en cours...",
          success: "Connexion réussie 👌",
        },
      );
  
      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }
  
      const token: AuthReponse = response.data;
  
   
      const decodedToken: any = jwtDecode(token.token.accessToken);
      const role = decodedToken.role ? decodedToken.role[0] : null;
  

      
      
      localStorage.setItem("token", token.token.accessToken);
      localStorage.setItem("directionId", token.directionId);
      localStorage.setItem("userId", token.userId);
      localStorage.setItem("role", role);
  
     
      useAuthStore.setState({
        directionId: token.directionId,
        userId: token.userId,
        token: token.token.accessToken,
        role: role,  
      });
      
      return Promise.resolve();
    } catch (error: any) {
      const errorCode = error.response?.data?.message;
      const language = "mg";  
  
      const translatedError = errorTranslations[language][errorCode];
  
      if (translatedError) {
        toast.error(translatedError);
      } else {
        toast.error(`Erreur inconnue: ${errorCode}`);
      }
      return Promise.reject(error);
    }
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem("token");
    Promise.resolve();
  },
};
