import axios from 'axios';
import { LoginRequest } from 'auth/ts'

const { REACT_APP_API_URL } = process.env;

export const api = axios.create({
  withCredentials: true,
  baseURL: `${REACT_APP_API_URL}`,
});


export const authAPI = {
  login(request: LoginRequest) {
    return api.post('/auth/login', request)
  },
}
