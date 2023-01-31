export interface LoginRequest {
  email: string
  password: string
}

export interface AuthFormInputs {
  email: string
  username?: string
  password: string
  confirmPassword?: string
}


export interface LoginResponse {
  accessToken: string
  refreshToken: string

  /** @format date-time */
  refreshTokenExpiresAt: string

  /** @format date-time */
  accessTokenExpiresAt: string
  user: CurrentUserResponse
}

export interface CurrentUserResponse {
  id: number

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
  firstName: string | null
  lastName: string | null
  username: string | null
  email: string
  phoneNumber: string
  roles: RoleResponse[]
  avatarUrl: string | null
  fundCash?: number
  registrationSources: ('Facebook' | 'Google' | 'Twitter' | 'Email')[]
  fund?: ShortFundResponse
  fundUserOnboarding?: OnboardingResponse
  status?: UserStatusResponse
}

export interface RoleResponse {
  id: number
  name: 'User' | 'Fund Manager' | 'Fund Admin'
}

export interface ShortFundResponse {
  id: number
  name: string
  fundImageUrl: string | null
}

export interface OnboardingResponse {
  isCompleted: boolean
}


export interface UserStatusResponse {
  id: number
  name: 'Activated' | 'Deactivated'
}

export interface DashboardRegistrationRequest {
  email: string
  password: string
  username: string
}


export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string

  /** @format date-time */
  refreshTokenExpiresAt: string

  /** @format date-time */
  accessTokenExpiresAt: string
}
