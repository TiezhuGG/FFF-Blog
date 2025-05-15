"use client";

import { TypeAnimation } from "react-type-animation";

export default function Personal() {
  return (
    <div className="w-full flex justify-center pt-10">
      <TypeAnimation
        className="tracking-widest text-2xl"
        sequence={[
          500,
          "一名前端开发工程师。",
          1000,
          "A Front-end Developer.",
          1000,
        ]}
        speed={10}
        repeat={Infinity}
      />
    </div>
  );
}
