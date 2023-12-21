import { db } from "..";
import { Post } from "@prisma/client";

export type postWithData = (
    Post & {
        topic: {slug: string},
        user: {name: string | null},
        _count: {comments: number}
    }
)

export async function fetchPostsBySlug(slug: string): Promise<postWithData[]> {
    try{
        return await db.post.findMany({
            where: {
                topic: {
                    slug
                }
            },
            include: {
                topic: {
                    select: {slug: true}
                },
                user: {
                    select: {name: true}
                },
                _count: {
                    select: {comments: true}
                }
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
}
// export async function fecthTopPosts(): Promise<postWithData[]> {
//     return db.post.
    
// }