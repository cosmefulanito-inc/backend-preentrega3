import { promises as fs } from "node:fs"
import { randomUUID } from "node:crypto"

const DEFAULT_PATH = "./src/data/bookings.json"

// Leer todos los servicios de data
export async function getBookings(path = DEFAULT_PATH) {
  const content = await fs.readFile(path, "utf-8")
  const bookings = JSON.parse(content)
  return bookings
}




export async function createBooking (path = DEFAULT_PATH) {

}

export async function const getBookingById (id) {
    const bookings = await getBookings()
    const found = bookings.find(booking => booking.id === id)
    return found ?? null // Si el resultado de la búsqueda es null o undefined, se procesa como null
}

export async function addServiceToBooking (path = DEFAULT_PATH) {

}