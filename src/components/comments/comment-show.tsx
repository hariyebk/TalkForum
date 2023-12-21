import Image from "next/image";
import { Button } from "@nextui-org/react";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { commentWithData } from "@/db/queries/comment";

interface CommentShowProps {
  commentId: string,
  comments: commentWithData[]
}

export default function CommentShow({ commentId, comments }: CommentShowProps) {
  const mainComment = comments.find((c) => c.id === commentId);
  if (!mainComment) {
    return null;
  }
  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={mainComment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {mainComment.user.name}
          </p>
          <p className="text-gray-900">{mainComment.content}</p>

          <CommentCreateForm postId={mainComment.postId} parentId={mainComment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
