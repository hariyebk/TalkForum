"use client"
import { Button } from "@nextui-org/react"
import { useFormStatus } from "react-dom"

export default function FormButton({children}: {children: React.ReactNode}) {
    const {pending} = useFormStatus()
    return (
        <Button type="submit" className="w-full" isLoading = {pending}>
            {children}
        </Button>
    )
}
