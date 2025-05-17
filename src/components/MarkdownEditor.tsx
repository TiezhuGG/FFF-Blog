import dynamic from "next/dynamic";
import rehypeRaw from "rehype-raw";

// 动态加载避免SSR问题
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const proxyImage = (url: string) => {
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

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
            // 自定义图片组件
            img: ({ src, alt }) => (
              <img
                src={proxyImage(src as string)}
                alt={alt}
                referrerPolicy="no-referrer"  // 新增防盗链处理
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "12px 0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ),
            // 自定义预览组件
            code: ({ children }) => (
              <code className="bg-gray-100 p-1 rounded">{children}</code>
            ),
          },
        }}
      />
    </div>
  );
}
