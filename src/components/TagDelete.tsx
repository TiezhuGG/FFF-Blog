"use client";

import { deleteTag } from "@/app/(main)/tags/actions";
import { Loader, TrashIcon } from "lucide-react";
import { useTransition } from "react";

export default function TagDelete({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(() => deleteTag(id));
  };

  return (
    <div>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <TrashIcon
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={() => handleDelete(id)}
        />
      )}
    </div>
  );
}
