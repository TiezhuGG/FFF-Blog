import Header from "@/components/Header";
import SpaceBackground from "@/components/SpaceBackground";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <SpaceBackground />
      <Footer />
    </div>
  );
}
