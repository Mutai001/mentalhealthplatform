import { eq } from "drizzle-orm";
import { TIFeedback, TSFeedback, feedback } from "../drizzle/schema";
import db from "../drizzle/db";

//get all feedback
export const feedbackService = async (limit?: number): Promise<TSFeedback[] | null> => {
    if (limit) {
        return await db.query.feedback.findMany({
            limit: limit
        });
    }
    return await db.query.feedback.findMany();
};

// Get a single feedback
export const getFeedbackservice = async (id: number): Promise<TIFeedback | undefined> => {
    return await db.query.feedback.findFirst({
        where: eq(feedback.id, id)
    });

}

// Create a feedback
export const createFeedbackservice = async (user: TIFeedback) => {
    await db.insert(feedback).values(user)
    return "feedback created successfully";

}

// Update a feedback
export const updateFeedbackservice = async (id: number, user: TIFeedback) => {
    await db.update(feedback).set(user).where(eq(feedback.id, id))
    return "feedback updated successfully";
}

// Delete a feedback
export const deleteFeedbackservice = async (id: number) => {
    await db.delete(feedback).where(eq(feedback.id, id))
    return "feedback deleted successfully";
}