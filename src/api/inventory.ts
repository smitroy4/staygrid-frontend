import client, { unwrap } from './client'
import type { InventoryDto, UpdateInventoryRequest } from '../types'

export const getRoomInventory = async (roomId: number): Promise<InventoryDto[]> => {
  const res = await client.get(`/admin/inventory/rooms/${roomId}`)
  return unwrap<InventoryDto[]>(res)
}

export const updateRoomInventory = async (
  roomId: number,
  data: UpdateInventoryRequest
): Promise<void> => {
  await client.patch(`/admin/inventory/rooms/${roomId}`, data)
}
