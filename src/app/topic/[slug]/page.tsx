import PostForm from "@/components/post/PostForm"

export default function page({params}: {params: {slug: string}}) {
    const {slug} = params
    return (
        <div className="grid grid-cols-4 gap-4 p-4 mt-5 mx-10">
            <div className="col-span-3">
                <h2 className="text-xl m-2"> {slug} </h2>
            </div>
            <div>
                <PostForm slug = {slug} />
            </div>
        </div>
    )
}
