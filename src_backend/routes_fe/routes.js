import express from "express"
import {
   getReservationPage,
   getBookingsHistoryPage,
   getAdminLoginPage,
   getAdminAllBookingsPage,
} from "../controller_fe/controller.js"

const router = express.Router()

router.get("/", getReservationPage)
router.get("/bookings-history", getBookingsHistoryPage)
router.get("/admin/login", getAdminLoginPage)
router.get("/admin/all-bookings", getAdminAllBookingsPage)

export default router
