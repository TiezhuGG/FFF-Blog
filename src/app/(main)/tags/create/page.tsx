"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { createTag, getTagById, TagFormData, updateTag } from "../actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { use, useEffect, useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SearchParamsType = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export const tagFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name can't be empty.",
  }),
});

export default function TagCreatePage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const { id } = use(searchParams);
  const [tag, setTag] = useState<TagFormData | null>(null);
  const [isPending, starTransition] = useTransition();

  useEffect(() => {
    if (id) {
      const fetchTag = async () => {
        const res = await getTagById(id as string);

        if (res?.tag) {
          setTag(res?.tag);
          form.reset({ name: res.tag.name });
        }
      };
      fetchTag();
    }
  }, [id]);

  const form = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: TagFormData) => {
    if (id) {
      starTransition(() => updateTag(id as string, data));
    } else {
      starTransition(() => createTag(data));
    }
  };

  if (id !== undefined && !tag) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-[50px]" />
        <Skeleton className="h-12 w-full" />
        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-[70px]" />
          <Skeleton className="h-10 w-[70px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            {...form.register("name")}
            type="text"
            id="name"
            name="name"
            className="w-full border rounded-md p-2"
            placeholder="Enter tag name"
          />

          {/* 显示验证错误 */}
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <BackButton variant="outline" />
          <Button
            type="submit"
            disabled={isPending ? true : false}
            className="cursor-pointer"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
