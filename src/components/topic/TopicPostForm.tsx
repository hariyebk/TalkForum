'use client'
import { Button, Popover, PopoverContent, PopoverTrigger, Textarea, Input } from "@nextui-org/react";
import * as actions from "@/actions"
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";

export default function TopicPostForm() {
    // formState to communicate server action with the form 
    const [formState, action] = useFormState(actions.createTopic, {errors: {}})
    // from general form errors like netowrk failure ...etc
    let formError: React.ReactNode
    if(formState.errors?._form && formState.errors._form.length > 0){
        formError = <p className="text-base text-red-500"> {formState.errors._form.join(",")} </p>
    }
    return (
        <Popover placement="left-start" color="default">
            <PopoverTrigger>
                <Button color="primary" variant="shadow"> Create New topic </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action} className="px-4 py-3">
                    <h3 className="mb-5 text-xl font-bold"> Create a topic </h3>
                    <div className="flex flex-col items-center gap-6 mb-6 w-80">
                        <Input name="name" label = "Name" labelPlacement="outside" placeholder="Name" isInvalid = {!!formState.errors.name} errorMessage = {formState.errors.name?.join(",")} />
                        <Textarea name="description" label = "Description" labelPlacement="outside" placeholder="say something" isInvalid = {!!formState.errors.description} errorMessage = {formState.errors.description?.join(",")} />
                        {formError}
                        <FormButton> Save </FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}
