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
import { motion } from "framer-motion";
import { EMAILS } from "@/constants";

export default function PostItem({ post }: { post: PostFormData }) {
  const { title, slug, description, createdAt, tags } = post;
  const [isPending, startTransition] = useTransition();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn && user && isLoaded) {
      const email = user?.primaryEmailAddress?.emailAddress as string;
      if (EMAILS.includes(email)) {
        setIsAuth(true);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const handleDelete = async () => {
    startTransition(async () => {
      const { message } = await deletePost(slug);
      toast(message);
    });
  };

  return (
    <motion.div
      className="relative group border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      whileHover={{
        y: -5,
        boxShadow:
          "0 6px 10px -2px rgba(0, 0, 0, 0.08), 0 3px 5px -1px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex flex-col">
        <Link href={`/blog/${slug}`} key={slug}>
          <h1 className="text-2xl">{title}</h1>
          <small className="text-gray-400 mt-2 line-clamp-1">
            {description}
          </small>
          <small className="text-gray-400 mt-2">
            {formatDate(createdAt as string, true)}
          </small>
          <div className="flex gap-2 mt-2">
            {tags?.length &&
              tags.map((tag) => (
                <p
                  key={tag}
                  className="flex bg-black text-white py-1 px-2 text-xs rounded-xl dark:bg-white dark:text-black"
                >
                  {tag}
                </p>
              ))}
          </div>
        </Link>
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
    </motion.div>
  );
}
