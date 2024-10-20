import axios from "axios";
import { AuthLogin, Signin } from "../types/Auth";
import { AuthReponse } from "../types/AuthReponse";
import { toast } from "react-toastify";
import environment from "../conf/environment";
import { errorTranslations } from "./utils/translator/translator";
import { useAuthStore } from "../hooks";
import { jwtDecode } from "jwt-decode";

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

      const data = response.data;

      // Cas où un changement de mot de passe est requis
      if (data.message === "You must change your password upon first login") {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.name);

        return data;
      } else {
        // Cas où l'authentification est réussie et un token est reçu
        const token: AuthReponse = data;
        const decodedToken: any = jwtDecode(token.token.accessToken);
        const role = decodedToken.role ? decodedToken.role[0] : null;

        // Stocker les informations dans le localStorage
        localStorage.setItem("token", token.token.accessToken);
        localStorage.setItem("directionId", token.directionId);
        localStorage.setItem("userId", token.userId);
        localStorage.setItem("role", role);

        // Mettre à jour le store d'authentification
        useAuthStore.setState({
          directionId: token.directionId,
          userId: token.userId,
          token: token.token.accessToken,
          role: role,
        });

        return Promise.resolve();
      }
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
  signin: async (auth: Signin): Promise<void> => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await toast.promise(
        axios.put(
          `${environment.apiBaseUrl}/users/first_login?userId=${userId}`,
          auth,
        ),
        {
          pending: "Connexion en cours...",
          success: "Connexion réussie 👌",
        },
      );

      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }

      const data = response.data;

      // Cas où l'authentification est réussie et un token est reçu
      const token: AuthReponse = data;
      const decodedToken: any = jwtDecode(token.token.accessToken);
      const role = decodedToken.role ? decodedToken.role[0] : null;

      // Stocker les informations dans le localStorage
      localStorage.setItem("token", token.token.accessToken);
      localStorage.setItem("directionId", token.directionId);
      localStorage.setItem("userId", token.userId);
      localStorage.setItem("role", role);

      // Mettre à jour le store d'authentification
      useAuthStore.setState({
        directionId: token.directionId,
        userId: token.userId,
        token: token.token.accessToken,
        role: role,
      });

      return Promise.resolve();
    } catch (error: any) {
      const errorCode = error.response?.data?.message;
      const language = "mg"; // Ou utiliser un paramètre dynamique pour la langue

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
