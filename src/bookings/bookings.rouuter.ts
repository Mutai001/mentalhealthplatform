import { Hono } from "hono";
import { listBookings, getBooking, createBooking, updateBooking, deleteBooking, } from "./bookings.controller"
import { zValidator } from "@hono/zod-validator";
import { bookingsSchema } from "./validators";
import { adminRoleAuth } from '../middleware/bearAuth'


export const bookingRouter = new Hono();

//get all bookings
bookingRouter.get("/bookings",adminRoleAuth ,listBookings)

//get a single booking   api/bookings/1
bookingRouter.get("/bookings/:id",adminRoleAuth, getBooking)

// create a booking
bookingRouter.post("/bookings", zValidator('json', bookingsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createBooking)

//update a booking
bookingRouter.put("/bookings/:id", updateBooking)

//delete a booking
bookingRouter.delete("/bookings/:id",adminRoleAuth, deleteBooking)



//Other routes
//get bookings by user_id
bookingRouter.get("/bookings/user/:id",adminRoleAuth, getBooking)

//get bookings by therapist_id
bookingRouter.get("/bookings/therapist/:id",adminRoleAuth, getBooking)

//get bookings by session_date
bookingRouter.get("/bookings/session/:date",adminRoleAuth, getBooking)

