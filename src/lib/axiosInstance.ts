import axios from 'axios';
import { environment } from '../conf/environment';


const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}`, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
