export const CustomImageComponent = ({
  src,
  alt,
}: {
  src?: string | Blob;
  alt?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
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
  );
};

export const CustomCodeComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <code className="bg-gray-100 p-1 rounded">{children}</code>;
};
