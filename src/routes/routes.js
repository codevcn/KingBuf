import express from "express"
import {
   getReservationPage,
   getBookingsHistoryPage,
   getAdminLoginPage,
   getAdminAllBookingsPage,
   getProcessingPage,
} from "../controllers/controller.js"

const router = express.Router()

router.get("/", getReservationPage)
router.get("/bookings-history", getBookingsHistoryPage)
router.get("/admin/login", getAdminLoginPage)
router.get("/admin/all-bookings", getAdminAllBookingsPage)
router.get("/admin/processing/:bookingId", getProcessingPage)

export default router
