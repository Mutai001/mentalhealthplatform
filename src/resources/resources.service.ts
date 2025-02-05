import { TIResources } from './../drizzle/schema';
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
export const createReesourcesServicen = asyc (resources: TIResources) => {
    await db.insert(resources).values(resources)
}