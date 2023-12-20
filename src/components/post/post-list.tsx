import Link from 'next/link';
import paths from '@/path';
import { postWithData } from '@/db/queries/post';

interface PostListProps {
  fetchData: () => Promise<postWithData[]>
}
// Reusable postList component
export default async function PostList({fetchData}: PostListProps) {
    const posts = await fetchData()
    const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;
    return (
      <div key={post.id} className="border rounded p-2">
          <Link href={paths.showPost(topicSlug, post.id)}>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <div className="flex flex-row gap-8">
                <p className="text-xs text-gray-400">By {post.user.name}</p>
                <p className="text-xs text-gray-400">
                  {post._count.comments} comments
                </p>
              </div>
            </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
