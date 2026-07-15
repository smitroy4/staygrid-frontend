import client, { unwrap } from './client'
import type { RoomDto } from '../types'

export const getHotelRooms = async (hotelId: number): Promise<RoomDto[]> => {
  const res = await client.get(`/admin/hotels/${hotelId}/rooms`)
  return unwrap<RoomDto[]>(res)
}

export const getHotelRoom = async (hotelId: number, roomId: number): Promise<RoomDto> => {
  const res = await client.get(`/admin/hotels/${hotelId}/rooms/${roomId}`)
  return unwrap<RoomDto>(res)
}

export const createRoom = async (hotelId: number, data: RoomDto): Promise<RoomDto> => {
  const res = await client.post(`/admin/hotels/${hotelId}/rooms`, data)
  return unwrap<RoomDto>(res)
}

export const updateRoom = async (
  hotelId: number,
  roomId: number,
  data: RoomDto
): Promise<RoomDto> => {
  const res = await client.put(`/admin/hotels/${hotelId}/rooms/${roomId}`, data)
  return unwrap<RoomDto>(res)
}

export const deleteRoom = async (hotelId: number, roomId: number): Promise<void> => {
  await client.delete(`/admin/hotels/${hotelId}/rooms/${roomId}`)
}
