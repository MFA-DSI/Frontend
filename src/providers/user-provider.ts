import axios, { AxiosError } from "axios";
import { User } from "../types/User";
import { handleAxiosError } from "../lib/handleAxiosError";

const API_URL: string = import.meta.env.VITE_API_URL;

export const userProvider = {
    save : async (user: User) : Promise<void> =>{
        try{
            const response = await axios.post(`${API_URL}/users/signup`,user);
            if(response.status !== 200){
                Promise.reject(response.statusText)
            }
            const token : string = response.data;
            sessionStorage.setItem("token", token)
            Promise.resolve()
        }catch(error){
            handleAxiosError(error as AxiosError);
        }
    }
}