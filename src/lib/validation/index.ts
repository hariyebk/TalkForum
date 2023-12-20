import {z} from "zod"

export const createTopicSchema = z.object({
    name: z.string().min(2).regex(/[a-z-]/, {message: "invalid name please only use lowercase letters"}),
    description: z.string().min(5).max(50)
})
export const createPostSchema = z.object({
    title: z.string().min(2).regex(/[a-z-]/, {message: "invalid title please only use lowercase letters"}),
    content: z.string().min(5).max(50)
})
export const createCommentSchema = z.object({
    content: z.string().min(3),
});