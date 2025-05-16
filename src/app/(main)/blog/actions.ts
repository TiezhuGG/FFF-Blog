"use server";

import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
  error?: string;
  redirectUrl?: string;
};

export interface PostFormData {
  id?: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  tags?: string[];
  createdAt?: Date | string;
}

export const createPost = async (
  prevState: FormState | null,
  formData: PostFormData
) => {
  try {
    await prisma.post.create({
      data: {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        slug: formData.slug,
        tags: {
          connectOrCreate: formData.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    revalidatePath("/blog");
    return { message: "Post created successfully", redirectUrl: "/blog" };
  } catch (error) {
    return {
      message: "Failed to create post",
    };
  }
};

export const updatePost = async (
  prevState: FormState | null,
  formData: PostFormData
): Promise<FormState> => {
  try {
    await prisma.$transaction(
      async (tx) => {
        await tx.post.update({
          where: { slug: formData.slug },
          data: {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            tags: {
              set: [], // Clear existing tags
              connectOrCreate: formData.tags?.map((tagName) => ({
                where: { name: tagName },
                create: { name: tagName },
              })),
            },
          },
        });
      },
      {
        maxWait: 15000, 
        timeout: 15000, 
      }
    );

    revalidatePath("/blog");
    return { message: "Post updated successfully", redirectUrl: "/blog" };
  } catch (error) {
    return {
      message: "Failed to update post",
    };
  }
};

export const deletePost = async (slug: string) => {
  try {
    await prisma.post.delete({ where: { slug } });

    revalidatePath("/blog");
    return { message: "Post deleted successfully" };
  } catch (error) {
    return {
      message: "Failed to delete post",
    };
  }
};
