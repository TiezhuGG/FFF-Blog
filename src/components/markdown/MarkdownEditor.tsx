import dynamic from "next/dynamic";
import rehypeRaw from "rehype-raw";
import { CustomCodeComponent, CustomImageComponent } from "./Custom";

// 动态加载避免SSR问题
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor({
  value,
  setValue,
}: {
  value?: string;
  setValue?: (value: string) => void;
}) {
  return (
    <div className="novel-container mt-5" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => setValue?.(val || "")}
        height={500}
        previewOptions={{
          rehypePlugins: [rehypeRaw],
          components: {
            img: ({ src, alt }) => CustomImageComponent({ src, alt }),
            code: ({ children }) => CustomCodeComponent({ children }),
          },
        }}
      />
    </div>
  );
}
