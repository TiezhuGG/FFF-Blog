"use client";

import {
  CSS_ICON,
  DOCKER_ICON,
  HTML_ICON,
  JS_ICON,
  NEXTJS_ICON,
  NODEJS_ICON,
  REACT_ICON,
  TS_ICON,
  VUE_ICON,
} from "@/constants";
import React from "react";

type OrbitConfig = {
  radius: number;
  duration: number;
  direction: "normal" | "reverse";
  name: string;
  icon: React.ReactNode;
};

export type OrbitBackgroundProps = {
  orbits?: OrbitConfig[];
};

export const defaultOrbits: OrbitConfig[] = [
  {
    name: "HTML",
    icon: HTML_ICON,
    radius: 20,
    duration: 10,
    direction: "normal",
  },
  {
    name: "CSS",
    icon: CSS_ICON,
    radius: 80,
    duration: 15,
    direction: "reverse",
  },
  {
    name: "Javascript",
    icon: JS_ICON,
    radius: 120,
    duration: 15,
    direction: "normal",
  },
  {
    name: "Vue",
    icon: VUE_ICON,
    radius: 160,
    duration: 50,
    direction: "normal",
  },
  {
    name: "React",
    icon: REACT_ICON,
    radius: 160,
    duration: 50,
    direction: "reverse",
  },
  {
    name: "TypeScript",
    icon: TS_ICON,
    radius: 200,
    duration: 30,
    direction: "normal",
  },
  {
    name: "Next.js",
    icon: NEXTJS_ICON,
    radius: 200,
    duration: 40,
    direction: "reverse",
  },
  {
    name: "Node.js",
    icon: NODEJS_ICON,
    radius: 240,
    duration: 22,
    direction: "normal",
  },
  // {
  //   name: "Docker",
  //   icon: DOCKER_ICON,
  //   radius: 240,
  //   duration: 24,
  //   direction: "reverse",
  // },
];

export default function OrbitBackground({
  orbits = defaultOrbits,
}: OrbitBackgroundProps) {
  return (
    <div className="inset-0 overflow-hidden bg-gradient-to-b from-slate-900 to-black">
      {/* Central glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="h-[300px] w-[300px] rounded-full bg-radial-gradient from-blue-400/20 via-transparent to-transparent blur-[100px]" />
      </div>

      {/* Orbits */}
      {orbits.map((orbit) => (
        <div
          key={orbit.name}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/8 dark:border-white/8"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            animation: `spin ${orbit.duration}s linear infinite ${orbit.direction}`,
          }}
        >
          {/* Star element */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
            <div className="flex flex-col items-center">
              <div className="text-xl">{orbit.name}</div>
              <div className="text-xl">{orbit.icon}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Additional small stars */}
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={`star-${index}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
          }}
          className="absolute h-[2px] w-[2px] rounded-full bg-black/80 dark:bg-white/80"
        />
      ))}
    </div>
  );
}
