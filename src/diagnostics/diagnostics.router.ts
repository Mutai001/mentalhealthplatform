import { Hono } from "hono";
import { listdiagnostics, getdiagnostics, creatediagnostics, updatediagnostics,  deletediagnostics} from "./diagnostics.controller";
import { zValidator } from "@hono/zod-validator";
import { diagnosticcsSchema } from "./validator";
import { adminRoleAuth } from '../middleware/bearAuth';

export const diagnosticsRouter = new Hono();

//get all diagnostics
diagnosticsRouter.get("/diagnostics", adminRoleAuth, listdiagnostics)

//get a single diagnostic   api/diagnostic/1
diagnosticsRouter.get("/diagnostics/:id", adminRoleAuth, getdiagnostics)

// create a diagnostic
diagnosticsRouter.post("/diagnostics", zValidator('json', diagnosticcsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), creatediagnostics)

//update a diagnostic
diagnosticsRouter.put("/diagnostics/:id", updatediagnostics)

//delete a diagnostic
diagnosticsRouter.delete("/diagnostics/:id", adminRoleAuth, deletediagnostics)