import { Button } from "@nextui-org/react";
import * as actions from "@/actions"
import {auth} from "@/auth"
import Profile from "./components/Profile";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <form action={actions.signIn} className="mb-8">
        <Button type="submit">
            sign in
        </Button>
      </form>
      <form action={actions.SignOut}>
        <Button type="submit">
            sign out
        </Button>
      </form>
      {session?.user && <p className="mt-10"> From server:  {JSON.stringify(session.user)} </p>}
      <Profile />
    </div>
  )
}
