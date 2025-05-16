import { notFound } from "next/navigation";
import MarkdownRender from "../MarkdownRender";
import BackButton from "../BackButton";
import { formatDate } from "@/lib/utils";
import prisma from "@/lib/client";
import { PostFormData } from "@/app/(main)/blog/actions";

export default async function PostDetail({ slug }: { slug: string }) {
  const post = (await prisma.post.findUnique({
    where: { slug: slug },
  })) as PostFormData;

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto p-6 prose dark:prose-invert">
      <BackButton className="mb-4 text-2xl cursor-pointer text-cyan-500 bg-white hover:bg-white hover:text-cyan-700 dark:bg-black">
        {"> cd .."}
      </BackButton>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="text-gray-500 mb-8">
        <span>{formatDate(post.createdAt as string, true)}</span>
        <span className="mx-2">•</span>
        <span>{post.tags?.join(", ")}</span>
      </div>

      {/* <div data-color-mode="light"> */}
      <MarkdownRender content={post?.content} />
      {/* </div> */}
    </article>
  );
}
