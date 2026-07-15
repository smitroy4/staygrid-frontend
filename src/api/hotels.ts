import client, { unwrap } from './client'
import type {
  HotelSearchRequest,
  HotelPriceResponse,
  HotelInfoRequest,
  HotelInfo,
  PageResponse,
  HotelDto,
  BookingDto,
  HotelReport,
} from '../types'

export const searchHotels = async (
  req: HotelSearchRequest
): Promise<PageResponse<HotelPriceResponse>> => {
  const res = await client.post('/hotels/search', req)
  return unwrap<PageResponse<HotelPriceResponse>>(res)
}

export const getHotelInfo = async (
  hotelId: number,
  req: HotelInfoRequest
): Promise<HotelInfo> => {
  const res = await client.post(`/hotels/${hotelId}/info`, req)
  return unwrap<HotelInfo>(res)
}

export const getAdminHotels = async (): Promise<HotelDto[]> => {
  const res = await client.get('/admin/hotels')
  return unwrap<HotelDto[]>(res)
}

export const getAdminHotel = async (hotelId: number): Promise<HotelDto> => {
  const res = await client.get(`/admin/hotels/${hotelId}`)
  return unwrap<HotelDto>(res)
}

export const createHotel = async (data: HotelDto): Promise<HotelDto> => {
  const res = await client.post('/admin/hotels', data)
  return unwrap<HotelDto>(res)
}

export const updateHotel = async (hotelId: number, data: HotelDto): Promise<HotelDto> => {
  const res = await client.put(`/admin/hotels/${hotelId}`, data)
  return unwrap<HotelDto>(res)
}

export const deleteHotel = async (hotelId: number): Promise<void> => {
  await client.delete(`/admin/hotels/${hotelId}`)
}

export const activateHotel = async (hotelId: number): Promise<void> => {
  await client.patch(`/admin/hotels/${hotelId}/activate`)
}

export const getHotelBookings = async (hotelId: number): Promise<BookingDto[]> => {
  const res = await client.get(`/admin/hotels/${hotelId}/bookings`)
  return unwrap<BookingDto[]>(res)
}

export const getHotelReports = async (
  hotelId: number,
  startDate?: string,
  endDate?: string
): Promise<HotelReport> => {
  const params: Record<string, string> = {}
  if (startDate) params.startDate = startDate
  if (endDate) params.endDate = endDate
  const res = await client.get(`/admin/hotels/${hotelId}/reports`, { params })
  return unwrap<HotelReport>(res)
}
