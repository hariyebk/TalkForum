"use server"

import * as auth from "@/auth"

export async function signIn(){
    return auth.signIn("github")
}
export async function SignOut(){
    return auth.signOut()
}