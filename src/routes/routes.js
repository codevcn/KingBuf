import express from "express"
import {
   getReservationPage,
   getBookingsHistoryPage,
   getAdminLoginPage,
   getAdminAllBookingsPage,
   getProcessingPage,
   getDueDateBookings,
} from "../controllers/controller.js"

const router = express.Router()

router.get("/", getReservationPage)
router.get("/bookings-history", getBookingsHistoryPage)
router.get("/admin/login", getAdminLoginPage)
router.get("/admin/all-bookings", getAdminAllBookingsPage)
router.get("/admin/processing/:bookingId", getProcessingPage)
router.get("/admin/due-date-bookings", getDueDateBookings)

export default router
