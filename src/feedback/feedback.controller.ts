import { Context } from "hono";
import { feedbackService, getFeedbackservice, createFeedbackservice, updateFeedbackservice, deleteFeedbackservice } from "./feedback.service";
import*as bcrypt from "bcrypt";

//get all feedback
export const listfeedback = async (c: Context) => {
    try {
        //limit the number of feedbacks to be returned

        const limit = Number(c.req.query('limit'))

        const data = await feedbackService(limit);
        if (data == null || data.length == 0) {
            return c.text("feedback not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//get a single feedback
export const getfeedback = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const feedback = await getFeedbackservice(id);
    if (feedback == undefined) {
        return c.text("feedback not found", 404);
    }
    return c.json(feedback, 200);
}

//create a feedback
export const createfeedback = async (c: Context) => {
    try {
        const feedback = await c.req.json();
            const createdfeedback = await createFeedbackservice(feedback);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//update a feedback
export const updatefeedback = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const feedback = await c.req.json();
    try {
        // search for the feedback
        const searchedfeedback= await getFeedbackservice(id);
        if (searchedfeedback == undefined) return c.text("feedback not found", 404);
        // get the data and update it
        const updatedfeedback = await updateFeedbackservice(id, feedback);
        return c.json({ msg: updatedfeedback }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


//delete a feedback
export const deletefeedback = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        // search for the feedback
        const searchedfeedback = await getFeedbackservice(id);
        if (searchedfeedback == undefined) return c.text("feedback not found", 404);
        // delete the feedback
        const deletedfeedback = await deleteFeedbackservice(id);
        return c.json({ msg: deletedfeedback }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}