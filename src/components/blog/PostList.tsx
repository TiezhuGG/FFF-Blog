import prisma from "@/lib/client";
import PostItem from "./PostItem";

export default async function PostList() {
  const posts = (await prisma.post.findMany()) || [];

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
