"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import rehypeRaw from "rehype-raw";
import { CustomCodeComponent, CustomImageComponent } from "./Custom";

export default function MarkdownRender({ content }: { content: string }) {
  const { theme } = useTheme();

  return (
    <div className="dark:bg-card dark:text-foreground" data-color-mode={theme}>
      <style>{`
        .dark .w-md-editor {
          --color-border-default: var(--border);
          --color-fg-default: var(--foreground);
          --color-canvas-default: var(--card);
          --color-canvas-subtle: var(--muted);
        }
      `}</style>
      <MDEditor.Markdown
        source={content}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt }) => CustomImageComponent({ src, alt }),
          code: ({ children }) => CustomCodeComponent({ children }),
        }}
      />
    </div>
  );
}
