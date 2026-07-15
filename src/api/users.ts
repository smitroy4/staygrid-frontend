import client, { unwrap } from './client'
import type { UserDto, ProfileUpdateRequest, BookingDto, GuestDto } from '../types'

export const getProfile = async (): Promise<UserDto> => {
  const res = await client.get('/users/profile')
  return unwrap<UserDto>(res)
}

export const updateProfile = async (data: ProfileUpdateRequest): Promise<void> => {
  await client.patch('/users/profile', data)
}

export const getMyBookings = async (): Promise<BookingDto[]> => {
  const res = await client.get('/users/myBookings')
  return unwrap<BookingDto[]>(res)
}

export const getMyGuests = async (): Promise<GuestDto[]> => {
  const res = await client.get('/users/guests')
  return unwrap<GuestDto[]>(res)
}

export const createGuest = async (data: GuestDto): Promise<GuestDto> => {
  const res = await client.post('/users/guests', data)
  return unwrap<GuestDto>(res)
}

export const updateGuest = async (guestId: number, data: GuestDto): Promise<void> => {
  await client.put(`/users/guests/${guestId}`, data)
}

export const deleteGuest = async (guestId: number): Promise<void> => {
  await client.delete(`/users/guests/${guestId}`)
}
