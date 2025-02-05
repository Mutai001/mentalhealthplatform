import { Hono } from "hono";
import { listfeedback, getfeedback, createfeedback, updatefeedback, deletefeedback, } from "./feedback.controller";
import { zValidator } from "@hono/zod-validator";
import { feedbackSchema } from "./validator";
import { adminRoleAuth } from '../middleware/bearAuth'

export const feedbackRouter = new Hono();

//get all feedback
feedbackRouter.get("/feedback", adminRoleAuth, listfeedback)

//get a single feedback   api/feedback/1
feedbackRouter.get("/feedback/:id", adminRoleAuth, getfeedback)

// create a feedback
feedbackRouter.post("/feedback", zValidator('json', feedbackSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createfeedback)

//update a feedback
feedbackRouter.put("/feedback/:id", updatefeedback)

//delete a feedback
feedbackRouter.delete("/feedback/:id", adminRoleAuth, deletefeedback)