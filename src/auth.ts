import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "@auth/core/providers/github";
import NextAuth from "next-auth";
import { db } from "./db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET

        })
    ],
    callbacks: {
        // fixing a bug in nextauth, session.user doesn't have the property id.
        async session({session, user}: any){
            if(session && user){
                session.user.id = user.id
            }
            return session
        }
    }
})