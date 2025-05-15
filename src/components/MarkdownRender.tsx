"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function MarkdownRender({ content }: { content: string }) {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTheme(theme);
  }, [theme]);

  return (
    <div data-color-mode={clientTheme || "light"}>
      <MDEditor.Markdown source={content} />
    </div>
  );
}
