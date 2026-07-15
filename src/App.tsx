import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import { Role } from './types'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SearchResults from './pages/SearchResults'
import HotelDetailPage from './pages/HotelDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/user/ProfilePage'
import MyBookingsPage from './pages/user/MyBookingsPage'
import MyGuestsPage from './pages/user/MyGuestsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHotels from './pages/admin/AdminHotels'
import AdminHotelForm from './pages/admin/AdminHotelForm'
import AdminHotelDetail from './pages/admin/AdminHotelDetail'
import AdminRooms from './pages/admin/AdminRooms'
import AdminRoomForm from './pages/admin/AdminRoomForm'
import AdminInventory from './pages/admin/AdminInventory'
import AdminBookings from './pages/admin/AdminBookings'
import AdminReports from './pages/admin/AdminReports'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e1e2e',
              color: '#fff',
              border: '1px solid #313244',
            },
          }}
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-guests"
              element={
                <ProtectedRoute>
                  <MyGuestsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminHotels />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/new"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminHotelForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminHotelDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/edit"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminHotelForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/rooms"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminRooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/rooms/new"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminRoomForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/rooms/:roomId/edit"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminRoomForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/inventory/:roomId"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/bookings"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/:hotelId/reports"
              element={
                <ProtectedRoute roles={[Role.HOTEL_MANAGER]}>
                  <AdminReports />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
