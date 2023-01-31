import { DashboardRegistrationRequest, LoginRequest } from '../ts'
import { api } from 'api'

export const authAPI = {
  login(request: LoginRequest) {
    return api.post('/auth/login', request)
  },
  sign_up(request: DashboardRegistrationRequest) {
    return api.post('/users/dashboard-users/register', request)
  },
}
