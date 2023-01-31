import axios from 'axios'
import { RefreshTokenResponse } from 'features/auth/ts'
import store from 'store'
import { authActions } from 'features/auth/redux/slice'

const { REACT_APP_API_URL } = process.env

export const api = axios.create({
  withCredentials: true,
  baseURL: `${REACT_APP_API_URL}`,
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken')
    const { data } = await api.post<RefreshTokenResponse>('/auth/refresh-token', {
      refreshToken,
    })
    store.dispatch(authActions.refreshTokenSuccess(data))
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
    return api(originalRequest);
  }
  return Promise.reject(error);
});

