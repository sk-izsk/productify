import axios from "axios"
import AuthStore from "./authStore"

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Add authentication interceptor
baseApi.interceptors.request.use(async (config) => {
  const token = AuthStore.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
