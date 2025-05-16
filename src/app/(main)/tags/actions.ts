"use server";

import { tagFormSchema } from "./create/page";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/client";

export interface TagFormData {
  id?: string;
  name: string;
}

export const getTags = async () => {
  const tags = await prisma.tag.findMany();
  
  return { tags };
};

export const getTagById = async (
  id: string
): Promise<{ tag?: TagFormData }> => {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });
    console.log("tag", tag);

    return { tag: tag as TagFormData };
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const createTag = async (formData: TagFormData) => {
  console.log("createTag action called", formData);

  try {
    // const existingTag = await

    const newTag = await prisma.tag.create({
      data: formData,
    });
    console.log("newTag", newTag);
  } catch (error) {}

  // redirect("/admin/tags");
};

export const updateTag = async (
  id: number,
  formData: z.infer<typeof tagFormSchema>
) => {
  redirect("/admin/tags");
};

export const deleteTag = async (id: number) => {
  revalidatePath("/admin/tags");
};
