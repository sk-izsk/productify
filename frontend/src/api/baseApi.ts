import axios from "axios"

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Auth interceptor is now handled by AuthProvider
