"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { startTransition, useActionState, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { getTags } from "@/app/(main)/tags/actions";
import {
  createPost,
  PostFormData,
  updatePost,
} from "@/app/(main)/blog/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title can't be empty.",
  }),
  description: z.string().min(1, {
    message: "Description can't be empty.",
  }),
  content: z.string().min(1, {
    message: "Content can't be empty.",
  }),
  slug: z.string(),
  tags: z
    .array(z.string())
    .min(1, "Please select at least one tag.")
    .max(3, "You can select up to 3 tags."),
});

// 延迟加载编辑器
const MarkdownEditor = dynamic(() => import("@/components/MarkdownEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-50 animate-pulse rounded-lg" />
  ),
});

export default function PostForm({
  postData,
}: {
  postData?: PostFormData | null;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: postData ?? {
      title: "",
      description: "",
      content: "",
      tags: [] as string[],
      slug: `${new Date().getTime().toString().substring(1, 6)}-${Math.random()
        .toString(36)
        .slice(2)}`,
    },
  });

  const [editorValue, setEditorValue] = useState(form.getValues("content"));
  const [tagsOptions, setTagsOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [state, formAction, isPending] = useActionState(
    postData ? updatePost : createPost,
    null
  );

  // 同步content到表单
  useEffect(() => {
    form.setValue("content", editorValue);
  }, [editorValue, form]);

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTags();

      const tagsOptions =
        data.tags?.map((tag) => ({
          value: tag.name,
          label: tag.name,
        })) || [];

      setTagsOptions(tagsOptions);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }

    if (state?.redirectUrl) {
      redirect(state.redirectUrl);
    }
  }, [state, form]);

  const onSubmit = async (data: PostFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Post Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Post Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Post Slug" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={tagsOptions}
                    selectedValues={field.value}
                    onChange={field.onChange}
                    placeholder="Select Tags"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MarkdownEditor
                    value={editorValue}
                    setValue={setEditorValue}
                  />
                </FormControl>
                <FormDescription>Supports Markdown syntax</FormDescription>
                <FormMessage>
                  {form.formState.errors.content?.message}
                </FormMessage>
              </FormItem>
            )}
          />

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
      </Form>
    </div>
  );
}
