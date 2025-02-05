import { Context } from "hono";
import {diagnosticsService, getDiagnosticservice, createDiagnosticservice, updateDiagnosticservice, deleteDiagnosticservice} from "./diagnostics.service";
import *as bcrypt from "bcrypt";

// Get all diagnostics
export const listdiagnostics = async (c: Context) => {
    try {
        //limit the number of diagnosticss to be returned

        const limit = Number(c.req.query('limit'))

        const data = await diagnosticsService(limit);
        if (data == null || data.length == 0) {
            return c.text("diagnostics not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// Get a single diagnostics
export const getdiagnostics = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const diagnostics = await getDiagnosticservice(id);
    if (diagnostics == undefined) {
        return c.text("diagnostics not found", 404);
    }
    return c.json(diagnostics, 200);
}

// Create a diagnostics
export const creatediagnostics = async (c: Context) => {
    try {
        const diagnostics = await c.req.json();
        const createddiagnostics = await createDiagnosticservice(diagnostics);
        
        if (!createddiagnostics) return c.text("diagnostics not created", 404);
        return c.json({ msg: createddiagnostics }, 201);
    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

// Update a diagnostics
export const updatediagnostics = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const diagnostics = await c.req.json();
    try {
        // search for the diagnostics
        const searcheddiagnostics = await getDiagnosticservice(id);
        if (searcheddiagnostics == undefined) return c.text("diagnostics not found", 404);
        // get the data and update it
        const res = await updateDiagnosticservice(id, diagnostics);
        // return a success message
        if (!res) return c.text("diagnostics not updated", 404);
        return c.text("diagnostics updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// Delete a diagnostics
export const deletediagnostics = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        // search for the diagnostics
        const searcheddiagnostics = await getDiagnosticservice(id);
        if (searcheddiagnostics == undefined) return c.text("diagnostics not found", 404);
        // get the data and delete it
        const res = await deleteDiagnosticservice(id);
        // return a success message
        if (!res) return c.text("diagnostics not deleted", 404);
        return c.text("diagnostics deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

