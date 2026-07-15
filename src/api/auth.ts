import client, { unwrap } from './client'
import type { SignUpRequest, LoginRequest, LoginResponse, UserDto } from '../types'

export const signup = async (data: SignUpRequest): Promise<UserDto> => {
  const res = await client.post('/auth/signup', data)
  return unwrap<UserDto>(res)
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await client.post('/auth/login', data)
  return unwrap<LoginResponse>(res)
}

export const refreshToken = async (): Promise<LoginResponse> => {
  const res = await client.post('/auth/refresh')
  return unwrap<LoginResponse>(res)
}
