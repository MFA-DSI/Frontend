import axios from 'axios';
import { useStore } from 'zustand';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const { accessToken, directionId, userId } = useStore.getState(); // Corrected to use useStore().getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
