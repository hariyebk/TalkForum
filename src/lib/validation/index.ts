import {z} from "zod"

export const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, {message: "invalid name please only use lowercase letters"}),
    description: z.string().min(5).max(50)
})