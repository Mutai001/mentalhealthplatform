import {eq} from "drizzle-orm";

//get all therapists
import db from "../drizzle/db";
 import { TITherapists, TSTherapists, therapists } from "../drizzle/schema";
  export const therapistsService = async (limit?: number): Promise<TSTherapists[] | null> => {
    if (limit) {
      return await db.query.therapists.findMany({
        limit: limit
      });
    }
    return await db.query.therapists.findMany();
  };

  // Get a single therapist
export const getTherapistservice = async (id: number): Promise<TITherapists | undefined> => {
    return await db.query.therapists.findFirst({
        where: eq(therapists.id, id)
    });

}

// Create a therapist
export const createTherapistservice = async (user: TITherapists) => {
    await db.insert(therapists).values(user)
    return "therapist created successfully";

}

// Update a therapist
export const updateTherapistservice = async (id: number, user: TITherapists) => {
    await db.update(therapists).set(user).where(eq(therapists.id, id))
    return "therapist updated successfully";
}

// Delete a therapist
export const deleteTherapistservice = async (id: number) => {
    await db.delete(therapists).where(eq(therapists.id, id))
    return "therapist deleted successfully";
}
