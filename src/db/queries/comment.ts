import { Comment } from "@prisma/client"
import { db } from ".."

export type commentWithData = (
    Comment & {
        user: {name: string | null, image: string | null}
    }
)
export async function fetchComments(postId: string): Promise<commentWithData[]> {
    // find all comments of a post
    return await db.comment.findMany({
        where: {
            post: {
                id: postId
            }
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
    
}