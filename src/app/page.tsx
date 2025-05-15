"use client";

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

// 技能数据
const skills = [
  { name: "React", level: 95, icon: <div>⚛️</div> },
  { name: "Next.js", level: 90, icon: <div>▲</div> },
  { name: "TypeScript", level: 85, icon: <div>TS</div> },
  { name: "Node.js", level: 80, icon: <div>🟢</div> },
  { name: "Python", level: 75, icon: <div>🐍</div> },
  { name: "UI/UX", level: 85, icon: <div>🎨</div> },
  { name: "GraphQL", level: 70, icon: <div>◯</div> },
  { name: "Docker", level: 65, icon: <div>🐳</div> },
];
