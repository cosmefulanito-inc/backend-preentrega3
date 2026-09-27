import { Router } from "express";
import { 
  getServices, 
  getServiceById, 
  addService, 
  updateService, 
  deleteService 
} from "../managers/ServiceManager.js"

const router = Router()

router.get("/", async (req, res)=>{

    try {
        const { category, available } = req.query

        let services = await getServices()

        if (category) {
        services = services.filter(s => s.category.toLowerCase() === category.toLowerCase())
        }

        if (available !== undefined) {
        const isAvailable = available === 'true'
        services = services.filter(s => s.available === isAvailable)
        }


            res.status(200).json({
                status: "success",
                message: "API del Sistema de Turnos y Reservas",
                data: services
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "No se pueden obtener datos"
        })
    }
})

router.get("/:sid", async (req, res)=>{
    try {
        const { sid } = req.params

        let service = await getServiceById(sid)
        
        if (!service) {
            return res.status(404).json({
                status: "error",
                message: "Servicio no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            data: service
        })

    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message
    })
    }
    
    
})

router.post("/", async (req, res)=>{
    try {
        const serviceData = req.body
        
        if (!serviceData.name || serviceData.price === undefined || !serviceData.duration || !serviceData.category || serviceData.available === undefined){
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios"
            })
        }
                
        const newService = await addService(serviceData)

        res.status(201).json({
            status: "success",
            data: newService
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "No se pudo crear el servicio",
            error: error.message
        })
    }
    
})

router.put("/:sid", async (req, res)=>{
    try {
        const serviceData = req.body
        const { sid } = req.params

        const updatedService = await updateService(sid, serviceData)

        if (!updatedService) {
            return res.status(404).json({
                status: "error",
                message: "Servicio no encontrado."
            })
        }
        
        res.status(200).json({
            status: "success",
            message: "Servicio actualizado exitosamente.",
            data: updatedService
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "No se pudo actualizar el servicio.",
            error: error.message
        })
    }
    

})

router.delete("/:sid", async (req, res)=>{
    
    try {
        const sid = req.params.sid
        const deletedService = await deleteService(sid)

        if (!deletedService){
            return res.status(404).json({
                status: "error",
                message: "Servicio no encontrado."
            })            
        }

        res.status(200).json({
            status: "success",
            message: "Servicio eliminado exitosamente."
        })        

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "No se pudo eliminar el servicio.",
            error: error.message
        })        
    }
})

export default router