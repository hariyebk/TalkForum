"use client"
import { Button, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import * as actions from "@/actions"
import FormButton from "../common/FormButton";
import { useFormState } from "react-dom";


export default function PostForm({slug}: {slug: string}) {
    const [formState, action] = useFormState(actions.createPost.bind(null, slug), {errors: {}})
    let formError: React.ReactNode 
    if(formState.errors._form && formState.errors._form.length > 0){
        formError = <p className="text-base text-red-500"> {formState.errors._form.join(",")} </p>
    }
    return (
        <Popover placement="left-start" color="default">
        <PopoverTrigger>
            <Button color="primary" variant="shadow"> Create New Post </Button>
        </PopoverTrigger>
        <PopoverContent>
            <form action={action} className="px-4 py-3">
                <h3 className="mb-5 text-xl font-bold"> Create a post </h3>
                <div className="flex flex-col items-center gap-6 mb-6 w-80">
                    <Input name="title" label = "Title" labelPlacement="outside" placeholder="Title" isInvalid = {!!formState.errors.title} errorMessage = {formState.errors.title?.join(",")}  />
                    <Textarea name="content" label = "Content" labelPlacement="outside" placeholder="Content" isInvalid = {!!formState.errors.content} errorMessage = {formState.errors.content?.join(",")}/>
                    {formError}
                    <FormButton> Save </FormButton>
                </div>
            </form>
        </PopoverContent>
    </Popover>
    )
}
