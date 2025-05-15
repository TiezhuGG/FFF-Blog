"use server";

import prisma from "@/lib/client";

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
};

export interface PostFormData {
  title: string;
  description: string;
  content: string;
  slug: string;
  tags: string[];
}

export const createPost = async (
  prevState: FormState | null,
  formData: PostFormData
): Promise<FormState> => {
  console.log("createPost action called", prevState, formData);

  try {
    await prisma.post.create({
      data: {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        slug: formData.slug,
        tags: {
          connectOrCreate: formData.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  } catch (error) {
    return {
      message: "Failed to create post",
    };
  }

  return { message: "Post created successfully" };
};
