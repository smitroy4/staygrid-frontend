export interface ApiResponse<T> {
  timeStamp: string
  data: T | null
  error: ApiError | null
}

export interface ApiError {
  status: string
  message: string
  subErrors: string[] | null
}

export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: { sorted: boolean; unsorted: boolean; empty: boolean }
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  empty: boolean
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export enum Role {
  GUEST = 'GUEST',
  HOTEL_MANAGER = 'HOTEL_MANAGER',
}

export enum BookingStatus {
  RESERVED = 'RESERVED',
  GUESTS_ADDED = 'GUESTS_ADDED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface UserDto {
  id: number
  email: string
  name: string
  gender: Gender | null
  dateOfBirth: string | null
}

export interface ProfileUpdateRequest {
  name?: string
  dateOfBirth?: string
  gender?: Gender
}

export interface HotelContactInfo {
  address: string
  phoneNumber: string
  email: string
  location: string
}

export interface HotelDto {
  id: number | null
  name: string
  city: string
  photos: string[]
  amenities: string[]
  contactInfo: HotelContactInfo
  active: boolean | null
}

export interface HotelSearchRequest {
  city: string
  startDate: string
  endDate: string
  roomsCount: number
  page?: number
  size?: number
}

export interface HotelPriceResponse {
  id: number
  name: string
  city: string
  photos: string[]
  amenities: string[]
  contactInfo: HotelContactInfo
  price: number
}

export interface HotelInfoRequest {
  startDate: string
  endDate: string
  roomsCount: number
}

export interface RoomPriceResponse {
  id: number
  type: string
  photos: string[]
  amenities: string[]
  price: number
}

export interface HotelInfo {
  hotelDto: HotelDto
  rooms: RoomPriceResponse[]
}

export interface RoomDto {
  id: number | null
  type: string
  basePrice: number
  photos: string[]
  amenities: string[]
  totalCount: number
  capacity: number
}

export interface InventoryDto {
  id: number
  date: string
  bookedCount: number
  reservedCount: number
  totalCount: number
  surgeFactor: number
  price: number
  closed: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateInventoryRequest {
  startDate: string
  endDate: string
  surgeFactor: number | null
  closed: boolean | null
}

export interface BookingRequest {
  hotelId: number
  roomId: number
  checkInDate: string
  checkOutDate: string
  roomsCount: number
}

export interface GuestDto {
  id: number | null
  user?: UserDto | null
  name: string
  gender: Gender
  age: number | null
  dateOfBirth: string | null
}

export interface BookingDto {
  id: number
  roomsCount: number
  checkInDate: string
  checkOutDate: string
  createdAt: string
  updatedAt: string
  bookingStatus: BookingStatus
  guests: GuestDto[]
  amount: number
}

export interface BookingPaymentInitResponse {
  sessionUrl: string
}

export interface BookingStatusResponse {
  bookingStatus: BookingStatus
}

export interface HotelReport {
  bookingCount: number
  totalRevenue: number
  avgRevenue: number
}
