import axios from 'axios'

export function useApi() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_KEY
  })
  return api
}
