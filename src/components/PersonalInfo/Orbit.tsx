import React from "react";

const Orbit = ({ radius, duration, initialAngle, clockwise, children }) => {
  const orbitStyle = {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    // 静的な初期角度。アニメーションは0degから360degを基本とする
    transform: `translate(-50%, -50%) rotate(${initialAngle}deg)`,
    // Tailwindで定義した `revolve` アニメーションを使用
    animationName: "revolve", // tailwind.config.js で定義したキーフレーム名
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDirection: clockwise ? "reverse" : "normal",
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full z-10"
      // Optional: 轨道线 (非常非常淡)
      // style={{...orbitStyle, border: '1px dotted rgba(200, 200, 255, 0.03)'}}
      style={orbitStyle}
    >
      {children}
    </div>
  );
};

export default Orbit;
