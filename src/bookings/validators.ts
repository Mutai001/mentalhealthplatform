import {integer, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const bookingsSchema = z.object({
    user_id: z.number(),
    therapist_id: z.number(),
    session_date: z.date(),
})