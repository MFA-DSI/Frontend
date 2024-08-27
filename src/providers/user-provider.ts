import axios, { AxiosError } from "axios";
import { User } from "../types/User";
import { handleAxiosError } from "../lib/handleAxiosError";
import { AuthReponse } from "../types/AuthReponse";

const API_URL: string = import.meta.env.VITE_API_URL;

export const userProvider = {
    save : async (user: User) : Promise<void> =>{
        try{
            const response = await axios.post(`${API_URL}/users/signup`,user);
            if(response.status !== 200){
                Promise.reject(response.statusText)
            }
            const token : AuthReponse = response.data;
            sessionStorage.setItem("token", token.token)
            sessionStorage.setItem("directionId", token.directionId)
            sessionStorage.setItem("userId", token.userId)
            Promise.resolve()
        }catch(error){
            handleAxiosError(error as AxiosError);
        }
    }
}