"use client";
import Link from "next/link";
import { deletePost } from "@/app/(main)/blog/actions";
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
import { useEffect, useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { formatDate } from "@/lib/utils";
import { PostFormData } from "@/app/(main)/blog/actions";
import { useUser } from "@clerk/nextjs";

const emailList = ["woshitiancai1014@gmail.com", "lihongfa1014@gmail.com"];

export default function PostItem({ post }: { post: PostFormData }) {
  const { title, slug, description, createdAt, tags } = post;

  const [isPending, startTransition] = useTransition();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        const email = user?.primaryEmailAddress?.emailAddress as string;
        if (emailList.includes(email)) {
          setIsAuth(true);
        }
      }
    }
  }, [isLoaded]);

  const handleDelete = async () => {
    startTransition(async () => {
      const { message } = await deletePost(slug);
      toast(message);
    });
  };

  return (
    <article className="relative group border p-4 rounded-xl">
      <div className="flex flex-col">
        <Link href={`/admin/blogs/${slug}`} key={slug}>
          <h1 className="text-2xl">{title}</h1>
        </Link>
        <small className="text-gray-400 mt-2">{description}</small>
        <small className="text-gray-400 mt-2">
          {formatDate(createdAt as string, true)}
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

      {isAuth && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute bottom-2 right-2 flex gap-4">
              <button type="button" className="hidden group-hover:block">
                <Link href={`/blog/${slug}/edit`}>✏️</Link>
              </button>
              <button
                type="button"
                className="hidden group-hover:block cursor-pointer"
              >
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
                className="bg-red-600 text-white hover:bg-red-300 cursor-pointer"
                variant="secondary"
                disabled={isPending}
                onClick={handleDelete}
              >
                {isPending ? <Spinner /> : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
