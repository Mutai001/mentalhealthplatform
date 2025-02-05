import { eq, Equal } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDiagnostics, TSDiagnostics, diagnostics } from "../drizzle/schema";


// Get all diagnostics
export const diagnosticsService = async (limit?: number): Promise<TSDiagnostics[] | null> =>{
    if (limit){
        return await db.query.diagnostics.findMany({
            limit: limit
        });
    }
    return await db.query.diagnostics.findMany();
}

// Get a single diagnostic
export const getDiagnosticservice = async (id: number): Promise<TIDiagnostics | undefined> =>{
    return await db.query.diagnostics.findFirst({
        where: eq(diagnostics.id, id)
    });
}

// Create a diagnostic
export const createDiagnosticservice = async (user: TIDiagnostics) => {
    await db.insert(diagnostics).values(user)
    return "Diagnostic created successfully";
}

// Update a diagnostic
export const updateDiagnosticservice = async (id: number, user: TIDiagnostics) => {
    await db.update(diagnostics).set(user).where(eq(diagnostics.id, id))
    return "Diagnostic updated successfully";
}

// Delete a diagnostic
export const deleteDiagnosticservice = async (id: number) => {
    await db.delete(diagnostics).where(eq(diagnostics.id, id))
    return "Diagnostic deleted successfully";
}

