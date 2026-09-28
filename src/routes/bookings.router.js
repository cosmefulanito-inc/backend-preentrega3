import { Router } from "express";
import { 
    createBooking,
    getBookingById,
    addServiceToBooking,
} from "../managers/BookingManager.js"

import {getServiceById} from "../managers/ServiceManager.js"

const router = Router()

// Consultar reserva por id
router.get("/:bid", async (req, res)=>{
    try {
        const { bid } = req.params

        let booking = await getBookingById(bid)
        
        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: "Reserva no encontrado"
            })
        }

        res.status(200).json({
            status: "success",
            data: booking
        })

    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message
    })
    }
    }
)

// Crear una nueva reserva
router.post("/", async (req, res)=>{
    try {
        const bookingData = req.body

        if(!bookingData.clientName || !bookingData.clientEmail || !bookingData.date || !bookingData.time){
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios"
            })
        }

        const booking = await createBooking(bookingData)

        res.status(201).json({
            status: "success",
            data: booking
        })

    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message
    })
    }
    }
)

// Crear una nueva reserva sobre un servicio ya existente
router.post("/:bid/services/:sid", async (req, res) => {

    try {
        
        
        const { bid, sid } = req.params
        
        const service = await getServiceById(sid)
        
           if(!service){
               return res.status(404).json({
                   status: "Servicio inexistente"
                })
            }
            
            const updatedBooking = await addServiceToBooking(bid, sid)
            
            
            if(!updatedBooking){
                return res.status(404).json({
                    status: "Reserva no encontrada"
                })
            }
            
            res.status(200).json({
                status: "success",
                data: updatedBooking
            })
            
        } catch (error) {
            res.status(500).json({
            status: "error",
            message: error.message
    })
        }
            
            
    }
)

export default router