import axios from "axios";
import { AuthLogin } from "../types/Auth";
import { AuthReponse } from "../types/AuthReponse";

const API_URL: string = import.meta.env.VITE_API_URL;

export const authProvider = {
    login : async (auth : AuthLogin) :Promise<void> =>{
        const response = await axios.post(`${API_URL}/users/login`,auth);
        if(response.status !== 200){
            Promise.reject(response.statusText)
        }
        const token : AuthReponse =response.data;
        console.log(token);
        
        sessionStorage.setItem("token", token.token)
        sessionStorage.setItem("directionId", token.directionId)
        sessionStorage.setItem("userId", token.userId)
        Promise.resolve();
    },
    
    logout : async () :Promise<void> =>{
        sessionStorage.removeItem("token");
        Promise.resolve();
    }
} 