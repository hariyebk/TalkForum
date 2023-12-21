import CommentShow from "@/components/comments/comment-show";
import { commentWithData } from "@/db/queries/comment";

interface CommentListProps {
  fecthData: () => Promise<commentWithData[]>
}

export default async function CommentList({fecthData}: CommentListProps) {
  const comments = await fecthData()
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="my-10 ml-2">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
