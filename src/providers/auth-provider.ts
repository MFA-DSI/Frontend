import axios from "axios";
import {AuthLogin} from "../types/Auth";
import {AuthReponse} from "../types/AuthReponse";
import {toast} from "react-toastify";
import environment from "../conf/environment";
import {errorTranslations} from "./utils/translator/translator";
import {useAuthStore} from "../hooks";

export const authProvider = {
  login: async (auth: AuthLogin): Promise<void> => {
    try {
      const response = await toast.promise(
        axios.post(`${environment.apiBaseUrl}/users/login`, auth),
        {
          pending: "Connexion en cours...",
          success: "Connexion réussie 👌",
        }
      );

      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }

      const token: AuthReponse = response.data;
      sessionStorage.setItem("token", token.token.accessToken);
      sessionStorage.setItem("directionId", token.directionId);
      sessionStorage.setItem("userId", token.userId);

      useAuthStore.setState({
        directionId: token.directionId,
        userId: token.userId,
        token: token.token.accessToken,
      });

      return Promise.resolve();
    } catch (error) {
      const errorCode = error.response.data.message;
      const language = "mg";

      const translatedError = errorTranslations[language][errorCode];

      if (translatedError) {
        toast.error(translatedError);
      } else {
        toast.error(`Erreur inconnue: ${error.response.data.message}`);
      }
      return Promise.reject(error);
    }
  },

  logout: async (): Promise<void> => {
    sessionStorage.removeItem("token");
    Promise.resolve();
  },
};
