"use server"
import { db } from "@/db"
import { Post, Topic } from "@prisma/client"
import { createTopicSchema } from "@/lib/validation";
import * as auth from "@/auth";
import paths from "@/path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
interface FORMSATE {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}

export async function signIn(){
    return auth.signIn("github")
}
export async function SignOut(){
    return auth.signOut()
}
export async function createTopic(formState: FORMSATE, formData: FormData): Promise<FORMSATE>{
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

export async function createPost() {
    //TODO: revalidate the 
    
}

export async function createComment() {
    
}