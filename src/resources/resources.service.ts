import { eq } from "drizzle-orm";
import { TIResources, TSResources, resources } from "../drizzle/schema";
import db from "../drizzle/db";


//Get all feedback
export const resourcesService = async (limit?: number): Promise<TSResources [] | null> =>{
    if (limit){
        return await db.query.resources.findMany({
            limit: limit
        })
    }
    return await db.query.resources.findMany();
}

//Get a single resource 
export const getResourcesService = async (id: number) : Promise<TIResources | undefined> =>{
    return await db.query.resources.findFirst({
        where: eq(resources.id, id)
    });
}

//Create a resource
export const createResourcesService = async (resource: TIResources) =>{
    await db.insert(resources).values(resource);
    return "Resource created successfully";
}

//Update a resource
export const updateResourcesService = async (id: number, resource: TIResources) =>{
    await db.update(resources).set(resource).where(eq(resources.id, id));
    return "Resource updated successfully";
}

//Delete a resource
export const deleteResourcesService = async (id: number) =>{
    await db.delete(resources).where(eq(resources.id, id));
    return "Resource deleted successfully";
}