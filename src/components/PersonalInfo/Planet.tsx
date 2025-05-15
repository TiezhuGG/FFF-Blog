import React from "react";

const Planet = ({
  size,
  color,
  content,
  orbitDuration,
  initialAngle,
  clockwise,
}) => {
  const planetStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  // 行星内容的反向旋转样式
  const contentStyle = {
    // 使用Tailwind定义的 'counter-revolve' 动画
    animationName: "counter-revolve",
    animationDuration: `${orbitDuration}s`, // 与轨道旋转时间一致
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDirection: clockwise ? "reverse" : "normal", // 如果轨道顺时针，反向旋转也顺时针
    // 应用初始角度的反向旋转，以确保行星内容初始方向正确
    transform: `rotate(${-initialAngle}deg)`,
  };

  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2" // 定位在轨道容器的12点钟方向
      style={planetStyle}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center
                    shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.2),0_0_8px_rgba(200,200,255,0.4)]
                    font-semibold text-white ${color}`}
        style={contentStyle} // 应用反向旋转动画和初始角度修正
      >
        {/* 检查内容是图片URL还是文本 */}
        {typeof content === "string" &&
        (content.startsWith("http://") ||
          content.startsWith("https://") ||
          content.startsWith("/")) ? (
          <img
            src={content}
            alt="planet icon"
            className="w-4/5 h-4/5 object-contain"
          />
        ) : (
          <span
            style={{
              fontSize: `${size * 0.32}px`,
              textShadow: "0 0 3px rgba(0,0,0,0.6)",
            }}
          >
            {content}
          </span>
        )}
      </div>
    </div>
  );
};

export default Planet;
