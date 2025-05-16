"use server";

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

    return { tag: tag as TagFormData };
  } catch (error) {
    return {};
  }
};

export const createTag = async (formData: TagFormData) => {
  await prisma.tag.create({
    data: formData,
  });

  redirect("/tags");
};

export const updateTag = async (id: string, formData: TagFormData) => {
  await prisma.tag.update({
    where: { id },
    data: formData,
  });

  redirect("/tags");
};

export const deleteTag = async (id: string) => {
  await prisma.tag.delete({
    where: { id },
  });

  revalidatePath("/tags");
};
