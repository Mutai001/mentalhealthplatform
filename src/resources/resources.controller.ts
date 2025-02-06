import { Context } from "hono";
import {resourcesService, getResourcesService, createResourcesService, updateresourcesService, deleteresourcesService,} from "./resources.service";
import*as bcrypt from "bcrypt";


//Fetch all resources
export const listResources = async (c: Context) =>{
    try {
        const limit = Number(c.req.query('limit'))
        const data = await resourcesService(limit);
        if (data == null || data.length == 0){
            return c.text("resources not found", 404)
        }
        return c.json(data, 200);
    } 
    catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}

//Fetch a single resources
export const getResources = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const resources = await getResourcesService(id);
    if (resources == undefined){
        return c.text("resources not found", 404);
    }
    return c.json(resources, 200);
}


//create a resources
export const createResources = async (c: Context) =>{
    try {
        const resources = await c.req.json();
        const createdresources = await createResourcesService(resources);

        if (!createdresources) return c.text("resources not created", 404);
        return c.json({ msg: createdresources }, 201);

    } catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}


//update a resources
export const updateResources = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const resources = await c.req.json();
    try {
        const searchedresources = await getResourcesService(id);
        if (searchedresources == undefined) {
            return c.text("resources not found", 404);
        }
        const updatedresources = await updateresourcesService(id, resources);
        return c.json({ msg: updatedresources }, 200);
    } catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}

//delete a resources
export const deleteResources = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const resources = await getResourcesService(id);
        if (resources == undefined) {
            return c.text("resources not found", 404);
        }
        const deletedresources = await deleteresourcesService(id);
        return c.json({ msg: deletedresources }, 200);
    } catch (error: any){
        return c.json({ error: error?.message }, 400)
    }
}



