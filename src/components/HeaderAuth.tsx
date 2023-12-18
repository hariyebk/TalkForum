"use client"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import * as actions from "@/actions"

export default function HeaderAuth() {
    const session = useSession()
    let authContent: React.ReactNode
    if(session.status === "loading"){
        authContent = null
    }
    else if(session.data?.user){
        authContent =  (
            <div className="flex items-center gap-8 cursor-pointer">
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <img src={session.data.user.image!} alt="user-photo" width={40} height={40} className="rounded-full object-contain" />
                    </PopoverTrigger>
                    <PopoverContent>
                    <form action={actions.SignOut}>
                        <Button type="submit">
                            sign out
                        </Button>
                    </form>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
    else{
        authContent = (
            <form action={actions.signIn}>
                <Button type="submit">
                        sign in
                </Button>
            </form>
        )
    }
    return (
        <section>
            {authContent}
        </section>
    )
}
