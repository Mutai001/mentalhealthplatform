import { Context } from "hono";
import { bookingsService, getbookingservice, createbookingservice, updatebookingservice, deletebookingservice,} from "./bookings.service";
import*as bcrypt from "bcrypt";


//Fetch all bookings
export const listBookings = async (c: Context) =>{
    try {
        const limit = Number(c.req.query('limit'))
        const data = await bookingsService(limit);
        if (data == null || data.length == 0){
            return c.text("booking not found", 404)
        }
        return c.json(data, 200);
    } 
    catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}

//Fetch a single booking
export const getBooking = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const booking = await getbookingservice(id);
    if (booking == undefined){
        return c.text("booking not found", 404);
    }
    return c.json(booking, 200);
}

//create a booking
export const createBooking = async (c: Context) =>{
    try {
        const booking = await c.req.json();
        const createdbooking = await createbookingservice(booking);

        if (!createdbooking) return c.text("booking not created", 404);
        return c.json({ msg: createdbooking }, 201);

    } catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}

//update a booking
export const updateBooking = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const booking = await c.req.json();
    try {
        const searchedbooking = await getbookingservice(id);
        if (searchedbooking == undefined) {
            return c.text("booking not found", 404);
        }
        const updatedbooking = await updatebookingservice(id, booking);
        return c.json({ msg: updatedbooking }, 200);
    } catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}

//delete a booking
export const deleteBooking = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const deletedbooking = await deletebookingservice(id);
        return c.json({ msg: deletedbooking }, 200);
    } catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}