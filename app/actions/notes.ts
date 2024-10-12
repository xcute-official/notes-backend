"use server";
import * as z from 'zod';
import { NoteSchema, NoteUpdateSchema } from '../schemas/validations';
import prismadb from '../libs/prismadb';
import { formatDate } from '../libs/helps';
export const create = async (data: z.infer<typeof NoteSchema>)=>{
    const validatedData = NoteSchema.safeParse(data);
    if(!validatedData.success){
        return {
            message: "Invalid Fields",
            status: 200
        }
    }
    try{
        const {title, content, description} = validatedData.data;
        const response: any = await prismadb.post.create({
            data: {
                body: {
                    title: title,
                    description: description,
                    content: content,
                },
                user: {
                    connect: {
                        id: '67023837600964f84b797388'
                    }
                },
                type: 'Note',
                slug: title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
            }
        });
        if(response?.id){
            return {
                message: "Note created, succcess",
                status: 201,
                data: {}
            }
        }else{
            return {
                message: "Note creation, Failed",
                status: 202
            }
        }
    }catch(error){
        return {
            message: "Note creation, Failed",
            status: 500
        }
    }
}
export const read = async (id: string)=>{
    if(!id){
        return {
            message: "Invalid details",
            status: 401
        }
    }
    try{
        const response: any = await prismadb.post.findUnique({
            where: {
                id: id
            },
            include: {
                user: true
            }
        });
        if(response?.id){
            return {
                message: "Note reading, success",
                status: 201,
                data: {
                    ...response.body,
                    updatedAt: response.updatedAt,
                    user: {
                        username: response.user.username
                    }
                }
            }
        }else{
            return {
                message: "Note reading, failed",
                status: 500
            }
        }
    }catch(error){
        return {
            message: "Note reading, failed",
            status: 501
        }
    }
}
export const readBySlug = async (slug: string)=>{
    if(!slug){
        return {
            message: "Invalid details",
            status: 401
        }
    }
    try{
        const response: any = await prismadb.post.findUnique({
            where: {
                slug: slug
            },
            include: {
                user: true
            }
        });
        if(response?.id){
            return {
                message: "Note reading, success",
                status: 201,
                data: {
                    ...response.body,
                    updatedAt: formatDate(response.updatedAt),
                    user: {
                        username: response.user.username
                    }
                }
            }
        }else{
            return {
                message: "Note reading, failed",
                status: 500
            }
        }
    }catch(error){
        return {
            message: "Note reading, failed",
            status: 501
        }
    }
}
export const update = async (data: z.infer<typeof NoteUpdateSchema>)=>{
    const validatedData = NoteUpdateSchema.safeParse(data);
    if(!validatedData.success){
        return {
            message: "Invalid data",
            status: 501
        }
    }
    try{
        const {title, content, description, id} = validatedData.data;
        const response = await prismadb.post.update({
            where: {
                id: id
            },
            data: {
                body: {
                    title: title,
                    content: content, 
                    description: description
                }
            }
        });
        if(response?.id){
            return {
                message: "Note updated, success",
                status: 200,
                data: {}
            }
        }else{
            return {
                message: "Note updation, failed",
                status: 201
            }
        }
    }catch(error){
        return {
            message: "Note updation Failed, server Error",
            status: 501
        }
    }
}
export const deleteNote = async (id: string)=>{
    if(!id){
        return {
            message: "Invalid details",
            status: 401
        }
    }
    try{
        const response: any = await prismadb.post.delete({
            where: {
                id: id
            }
        });
        if(response?.id){
            return {
                message: "Note deleting, success",
                status: 200,
                data: {}
            }
        }else{
            return {
                message: "Note deleting, failed",
                status: 500
            }
        }
    }catch(error){
        return {
            message: "Note deleting, failed",
            status: 501
        }
    }
}




export const getAllNotes = async ()=>{
    try{
        const response = await prismadb.post.findMany({
            include: {
                user: true
            }
        });
        if(response[0]?.id){
            let filteredResponse = response.map((item: any)=>(
                {
                    ...item.body,
                    updatedAt: item.updatedAt,
                    user: {
                        username: item.user.username
                    },
                    id: item.id,
                    slug: item.slug
                }
            ))
            return filteredResponse;
        }else{
            return null;
        }
        return null;
    }catch(error){
        console.log(error);
        return null;
    }
}