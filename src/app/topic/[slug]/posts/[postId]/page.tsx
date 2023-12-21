import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/post/post-show";
import { fetchComments } from "@/db/queries/comment";
interface PostShowProps {
    params: {
        slug: string, 
        postId: string
    }
}
export default async function page({params}: PostShowProps) {
    const {postId} = params
    return (
        <div className="mt-20 ml-20">
            <PostShow postId = {postId} />
            <CommentCreateForm postId={postId} startOpen />
            <CommentList fecthData={() => fetchComments(postId)} />
        </div>
    )
}
