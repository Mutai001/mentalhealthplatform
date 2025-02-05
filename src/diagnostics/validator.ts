import { integer } from "drizzle-orm/pg-core";
import { number, z } from "zod";

export const diagnosticcsSchema = z.object({
    user_id: z.number(),
    dignosis: z.string(),
    recommendation: z.string(),
    therapist_id: number(),
});