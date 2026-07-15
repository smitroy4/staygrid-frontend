import client, { unwrap } from './client'
import type {
  BookingRequest,
  BookingDto,
  BookingPaymentInitResponse,
  BookingStatusResponse,
} from '../types'

export const initBooking = async (data: BookingRequest): Promise<BookingDto> => {
  const res = await client.post('/bookings/init', data)
  return unwrap<BookingDto>(res)
}

export const addGuestsToBooking = async (
  bookingId: number,
  guestIds: number[]
): Promise<void> => {
  await client.post(`/bookings/${bookingId}/addGuests`, guestIds)
}

export const initiatePayment = async (
  bookingId: number
): Promise<BookingPaymentInitResponse> => {
  const res = await client.post(`/bookings/${bookingId}/payments`)
  return unwrap<BookingPaymentInitResponse>(res)
}

export const cancelBooking = async (bookingId: number): Promise<void> => {
  await client.post(`/bookings/${bookingId}/cancel`)
}

export const getBookingStatus = async (
  bookingId: number
): Promise<BookingStatusResponse> => {
  const res = await client.get(`/bookings/${bookingId}/status`)
  return unwrap<BookingStatusResponse>(res)
}
