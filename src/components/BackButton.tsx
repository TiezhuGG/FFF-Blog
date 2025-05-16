"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({ ...props }) {
  const router = useRouter();
  const { className, children, variant = "", type = "button" } = props;

  return (
    <Button
      type={type}
      className={`cursor-pointer ${cn(className)}`}
      variant={variant}
      onClick={() => router.back()}
    >
      {children ?? "Back"}
    </Button>
  );
}
