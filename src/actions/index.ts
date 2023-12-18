"use server"
import * as auth from "@/auth"
import { db } from "@/db"
import { Post, Topic } from "@prisma/client"
interface TOPIC {
    slug: string,
    description: string,
    posts: Post[],
    createdAt: string,
    updatedAt: string
}

export async function signIn(){
    return auth.signIn("github")
}
export async function SignOut(){
    return auth.signOut()
}
export async function createTopic(formStatw: {message: string}, topic: Topic) {
    try{
    const newTopic = await db.topic.create({
        data: topic
    })
    if(!newTopic){
        throw new Error("creating a new topic failes please try again")
    }
    //TODO: revalidate the home page
    }
    catch(error: any){

    }
}

export async function createPost() {
    //TODO: revalidate the 
    
}

export async function createComment() {
    
}