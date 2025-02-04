import { updateBooking } from './bookings.controller';
import {eq} from "drizzle-orm";
import db from "../drizzle/db";
import {TIBookings, TSBookings, bookings} from "../drizzle/schema";


//Fetch all bookings
export const bookingsService = async  (limit?: number): Promise<TSBookings[] | null> =>{
    if(limit){
        return await db.query.bookings.findMany({
            limit:limit
        });
    }
    return await db.query.bookings.findMany();
}

export const getbookingservice = async (id: number): Promise<TIBookings | undefined> =>{
    return await db.query.bookings.findFirst({
        where: eq(bookings.id, id)
    })
}

//Fetch a single booking
export const createbookingservice = async (booking: TIBookings) =>{
    await db.insert(bookings).values(booking)
    return "booking created successfully";
}

//create a booking
export const updatebookingservice = async (id: number, booking: TIBookings) =>{
    await db.update(bookings).set(booking).where(eq(bookings.id, id))
    return "booking updated successfully";
}

//update a booking
export const updateBookingService = async (id: number, booking: TIBookings) =>{
    await db.update(bookings).set(booking).where(eq(bookings.id, id))
    return "booking updated successfully";
}

//delete a booking
export const deletebookingservice = async (id: number) =>{
    await db.delete(bookings).where(eq(bookings.id, id))
    return "booking deleted successfully";
}