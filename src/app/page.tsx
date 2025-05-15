import Header from "@/components/Header";
import SpaceBackground from "@/components/SpaceBackground";
import Footer from "@/components/Footer";
import Personal from "@/components/Introduce";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <Personal />
      <SpaceBackground />
      <Footer />
    </div>
  );
}
