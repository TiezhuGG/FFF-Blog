import PostForm from "@/components/blog/PostForm";
import PostFormSkeleton from "@/components/PostFormSkeleton";
import prisma from "@/lib/client";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: { tags: true },
  });

  if (!post) {
    return <PostFormSkeleton />;
  }

  const postData = {
    ...post,
    tags: post.tags.map((tag) => tag.name),
  };

  return <PostForm postData={postData} />;
}
