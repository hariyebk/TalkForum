"use server"
import { db } from "@/db"
import { Post, Topic } from "@prisma/client"
import { createCommentSchema, createPostSchema, createTopicSchema } from "@/lib/validation";
import * as auth from "@/auth";
import paths from "@/path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { escape } from "querystring";
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
interface CommentFormState {
    errors: {
        content?: string[];
        _form?: string[];
    };
    success?: boolean;
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
export async function deletePost(postId: string, slug: string) {
    try{
    await db.post.findUnique({
        where:{
            id: postId
        }
    })
    }
    catch(error: unknown){
        if(error instanceof Error){
            throw new Error(error.message)
        }
        else{
            throw new Error("something went wrong")
        }
    }
    revalidatePath(paths.topicShow(slug))
    revalidatePath(paths.homePage())
    
}
export async function createComment({ postId, parentId }: { postId: string; parentId?: string }, formState: CommentFormState,formData: FormData): Promise<CommentFormState> {
    const result = createCommentSchema.safeParse({
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth.auth();
    if (!session || !session.user) {
        return {
        errors: {
            _form: ["You must sign in to do this."],
        },
        };
    }
    // check if there is a topic
    const topic = await db.topic.findFirst({
        where: { posts: { some: { id: postId } } },
    });

    if (!topic) {
        return {
            errors: {
                _form: ["Failed to find the topic related to this comment"],
            }
        };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                postId: postId,
                parentId: parentId,
                userId: session.user.id,
            }
        });
    } 
    catch (err) {
        if (err instanceof Error) {
            return {
                errors: {
                _form: [err.message],
                },
            };
        } 
        else {
            return {
                errors: {
                _form: ["Something went wrong..."],
                },
            };
        }
    }

    revalidatePath(paths.showPost(topic.slug, postId));
    return {
        errors: {},
        success: true,
    };
}