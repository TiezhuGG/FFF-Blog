import SpaceBackground from "@/components/SpaceBackground";
import Personal from "@/components/Introduce";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Personal />
      <SpaceBackground />
    </main>
  );
}
