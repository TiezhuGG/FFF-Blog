import PostList from "@/components/blog/PostList";
import prisma from "@/lib/client";

export default async function BlogPage() {
  const posts =
    (await prisma.post.findMany({
      include: { tags: true },
      orderBy: { createdAt: "desc" },
    })) || [];

  const formattedPosts = posts.map((post) => ({
    ...post,
    tags: post.tags.map((tag) => tag.name),
    createdAt: post.createdAt.toISOString(),
  }));

  return <PostList posts={formattedPosts} />;
}
