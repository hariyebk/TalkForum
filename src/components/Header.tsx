import paths from "@/path";
import Link from "next/link";
import * as actions from "@/actions"
import { Button } from "@nextui-org/react";
import { auth } from "@/auth";
import { Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

export default async function Header() {
    const session = await auth()
    let authContent: React.ReactNode
    if(session?.user){
        authContent =  (
            <div className="flex items-center gap-8 cursor-pointer">
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <img src={session.user.image!} alt="user-photo" width={40} height={40} className="rounded-full object-contain" />
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
        <section className="flex items-center justify-between mt-5 px-20 py-5 rounded-lg shadow-lg">
            <Link href={paths.homePage()} className="font-bold text-2xl"> Discuss </Link>
            <input type="text" placeholder="search" className="border border-slate-600 py-2 px-3 rounded-lg outline-none" />
            <div className="flex items-center gap-5 mr-10">
                {authContent}
            </div>
        </section>
    )
}
