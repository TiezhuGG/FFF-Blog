import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRightIcon, EditIcon } from "lucide-react";
import Link from "next/link";
import TagDelete from "@/components/tag-delete";

export default async function TagsPage() {
  const supabse = await createClient();

  const { data: tags } = await supabse.from("tags").select("*");

  return (
    <div className="p-5">
      {tags?.length ? (
        <Table>
          <TableHeader>
            <TableRow className="w-full">
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags?.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-3">
                    <Link href={`/admin/tags/create/?id=${tag.id}`}>
                      <EditIcon className="w-4 h-4 cursor-pointer" />
                    </Link>
                    <TagDelete id={Number(tag.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex gap-4">
          <p>"No Tags, Click Create Tag"</p>
          <Link
            href={"/admin/tags/create"}
            className="flex items-center text-blue-500 cursor-pointer"
          >
            <ArrowRightIcon className="w-4 h-4" />
            Create Tag
          </Link>
        </div>
      )}
    </div>
  );
}
