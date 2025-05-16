import PostDetail from "@/components/blog/PostDetail";
import PostFormSkeleton from "@/components/PostFormSkeleton";
import prisma from "@/lib/client";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts?.map((post) => ({ slug: post.slug })) || [];
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense fallback={<PostFormSkeleton />}>
      <PostDetail slug={slug} />
    </Suspense>
  );
}
