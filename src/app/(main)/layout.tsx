import Header from "@/components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      {children}
    </main>
  );
}
