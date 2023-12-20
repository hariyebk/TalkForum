"use server"
import { db } from "@/db"
import { Post, Topic } from "@prisma/client"
import { createPostSchema, createTopicSchema } from "@/lib/validation";
import * as auth from "@/auth";
import paths from "@/path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
interface TOPICFORMSATE {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}
interface POSTFORMSTATE {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[]
    }
}

export async function signIn(){
    return auth.signIn("github")
}
export async function SignOut(){
    return auth.signOut()
}
export async function createTopic(formState: TOPICFORMSATE, formData: FormData): Promise<TOPICFORMSATE>{
    const results = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    })
    if(!results.success){
        return {
            errors:  results.error.flatten().fieldErrors
        }
    }
    // check if the user has signed in 
    const session = await auth.auth()
    if(!session || !session.user){
        return {
            errors: {
                _form: ["You must sign in in order to create a topic"]
            }
        }
    }
    
    let topic: Topic
    try{
        topic = await db.topic.create({
            data: {
                slug: results.data.name,
                description: results.data.description
            }
        })
    }
    catch(error: unknown){
        if(error instanceof Error){
            return {
                errors: {
                    _form: [error.message]
                }
            }
        }
        else{
            return {
                errors: {
                    _form: ["something went wrong. please try again"]
                }
            }
        }
    }
    revalidatePath(paths.homePage())
    redirect(paths.topicShow(topic.slug))
}
export async function createPost(slug: string, formState: POSTFORMSTATE, formData: FormData): Promise<POSTFORMSTATE> {
    const results = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    })
    if(!results.success){
        return {
            // converting the 2D array returned from zod schema
            errors:  results.error.flatten().fieldErrors
        }
    }
    // check if the user has signed in 
    const session = await auth.auth()
    if(!session || !session.user){
        return {
            errors: {
                _form: ["You must sign in in order to create a post"]
            }
        }
    }
    // find the topic
    const topic = await db.topic.findFirst({
        where: {
            slug
        }
    })
    if(!topic){
        return {
            errors: {
                _form: ['sorry, this post has no topic']
            }
        }
    }
    let post: Post
    try{
        post = await db.post.create({
            data: {
                title: results.data.title,
                content: results.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    }
    catch(error: unknown){
        if(error instanceof Error){
            return {
                errors: {
                    _form: [error.message]
                }
            }
        }
        else{
            return {
                errors: {
                    _form: ["something went wrong. please try again"]
                }
            }
        }
    }
    revalidatePath(paths.topicShow(topic?.slug!))
    redirect(paths.showPost(topic?.slug!, post.id))
}
export async function createComment() {
    
}