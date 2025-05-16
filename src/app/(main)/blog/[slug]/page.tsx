import PostDetail from "@/components/post-detail";
import PostFormSkeleton from "@/components/post-form-skeleton";
import { createClient } from "@/utils/supabase/client";
import { Suspense } from "react";

export async function generateStaticParams() {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .order("inserted_at", { ascending: false });

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
