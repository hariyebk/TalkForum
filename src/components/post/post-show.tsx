import { db } from "@/db";
import { notFound } from "next/navigation";

export default async function PostShow({postId}: {postId: string}) {
  const post = await db.post.findFirst({
    where: {
      id: postId
    }
  })
  if(!post){
    notFound()
  }
  return (
    <div>
      <h1 className="text-2xl font-bold my-2 pb-5">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
