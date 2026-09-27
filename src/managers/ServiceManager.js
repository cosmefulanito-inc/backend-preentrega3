import { promises as fs } from "node:fs"
import { randomUUID } from "node:crypto"

const DEFAULT_PATH = "./src/data/services.json"

// Leer todos los servicios de data
export async function getServices(path = DEFAULT_PATH) {
  const content = await fs.readFile(path, "utf-8")
  const services = JSON.parse(content)
  return services
}



// Buscar servicio por ID
export async function getServiceById(id) {
  const services = await getServices()
  const found = services.find(service => service.id === id)
  return found ?? null // Si el resultado de la búsqueda es null o undefined, se procesa como null
}

// Agregar nuevo servicio
export async function addService(serviceData) {
  const services = await getServices()

  const newService = {
    id: randomUUID(),
    name: serviceData.name,
    duration: serviceData.duration,
    price: serviceData.price,
    category: serviceData.category,
    available: serviceData.available
  }

  services.push(newService)

  await fs.writeFile(
    DEFAULT_PATH,
    JSON.stringify(services, null, 2)
  )

  return newService
}

// Actualizar servicio
export async function updateService(id, changes) {
  const services = await getServices(DEFAULT_PATH)

  // Busca el servicio en cuestión y recupera su índice
  const serviceIndex = services.findIndex(
    service => service.id === id
  )

  // Si no se encuentra el registro, devuelve null y finaliza
  if (serviceIndex === -1) return null
  
  // Destructuring de los cambios, quitando del medio el id en caso de que el usuario lo haya ingresado y agrupando en allowedChanges todo lo demás
  const { id: ignoredId, ...allowedChanges } = changes

  // Clonar objeto de services tomando los valores originales y sobreescribiendo aquellos que vienen de allowedChanges
  services[serviceIndex] = {
    ...services[serviceIndex],
    ...allowedChanges
  }

  // Guardar cambios en el JSON de services
  await fs.writeFile(
    DEFAULT_PATH,
    JSON.stringify(services, null, 2)
  )

  return services[serviceIndex]
}

// Eliminar un servicio
export async function deleteService(id) {
  const services = await getServices(DEFAULT_PATH)

  // Asigno a una variable todos los registros del JSON, excepto aquel que coincide con el ID del que quiero borrar
  const filteredServices = services.filter(
    service => service.id !== id
  )

  // Si el ID ingresado no existe, el resultado del filtrado será idéntico a la versión original de mis services; por tanto, no debo hacer nada y escapo
  if (filteredServices.length === services.length) {
    return false
  }

  // Sobreescribo en el JSON los datos filtrados; o sea, sin el registro eliminado
  await fs.writeFile(
    DEFAULT_PATH,
    JSON.stringify(filteredServices, null, 2)
  )

  return true
}