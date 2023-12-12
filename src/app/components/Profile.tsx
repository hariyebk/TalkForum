"use client"
import { useSession } from "next-auth/react"

export default function Profile() {
    const session = useSession()
    if(session.data?.user){
        return (
            <p className="mt-10">
                from client: {JSON.stringify(session.data.user)}
            </p>
        )
    }
    else{
        return (
            <p className="mt-10">
                From client: user has not signed In
            </p>
        )
    }
}
