"use client";
import Link from "next/link";
// import { deletePost } from "@/app/(admin)/admin/blogs/actions";
import { z } from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useTransition } from "react";
// import { Spinner } from "../ui/spinner";
import { formSchema } from "./PostForm";
import { formatDate } from "@/lib/utils";

interface postProp extends z.infer<typeof formSchema> {
  inserted_at: string;
}

export default function PostItem({ post }: { post: postProp }) {
  const { title, slug, description, inserted_at, tags } = post;

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    // startTransition(async () => {
    //   const { message, error } = await deletePost(slug);
    //   if (error) {
    //     toast.error(error);
    //     return;
    //   }

    //   toast.success(message);
    // });
  };

  return (
    <article className="relative group border p-4 rounded-xl">
      <div className="flex flex-col">
        <Link href={`/admin/blogs/${slug}`} key={slug}>
          <h1 className="text-2xl">{title}</h1>
        </Link>
        <small className="text-gray-400 mt-2">{description}</small>
        <small className="text-gray-400 mt-2">
          {formatDate(inserted_at, true)}
        </small>
        <div className="flex gap-2 mt-2">
          {tags?.length &&
            tags.map((tag) => (
              <p
                key={tag}
                className="bg-black text-white py-1 px-2 text-sm rounded-xl dark:bg-white dark:text-black"
              >
                {tag}
              </p>
            ))}
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute bottom-2 right-2 flex gap-4">
            <button type="button" className="hidden group-hover:block">
              <Link href={`/admin/blogs/${slug}/edit`}>✏️</Link>
            </button>
            <button type="button" className="hidden group-hover:block">
              🗑️
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure delete this post?</DialogTitle>
            <DialogDescription>
              It cannot be restored after deletion
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-end">
            <Button
              type="submit"
              className="bg-red-600 text-white hover:bg-red-300"
              variant="secondary"
              disabled={isPending}
              onClick={handleDelete}
            >
              {/* {isPending ? <Spinner /> : "Delete"} */}
              {isPending ? 'Deleting' : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}
