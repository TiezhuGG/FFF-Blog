import React from "react";

const CentralBody = () => {
  return (
    <div
      className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[clamp(280px,40vmin,420px)] p-6 sm:p-8
                 bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-xl
                 shadow-2xl shadow-cyan-600/30
                 text-slate-100 z-[100]
                 transition-all duration-500 ease-out
                 hover:shadow-cyan-400/60 hover:border-cyan-500/70
                 hover:bg-slate-700/70
                 transform perspective(1000px) hover:rotate-y-2 hover:rotate-x-1 hover:scale-[1.03]" // 3D-ish hover
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors duration-300">
        你好，我是 [你的名字/昵称]
      </h1>
      <p className="text-sm sm:text-base leading-relaxed text-slate-300 group-hover:text-slate-200 transition-colors duration-300 mb-2">
        一名热爱探索和创造的前端开发者。
      </p>
      <p className="text-sm sm:text-base leading-relaxed text-slate-300 group-hover:text-slate-200 transition-colors duration-300 mb-4">
        专注于使用 React、Tailwind CSS
        等现代技术栈构建流畅且富有创意的用户界面。
        这个动态的星系，就是我对这些技术热情的一次小小展现！
      </p>
      <a
        href="#contact" // 替换为你的联系方式或项目链接
        className="inline-block mt-2 px-5 py-2 text-sm font-medium
                   bg-cyan-600 text-white rounded-lg
                   group-hover:bg-cyan-500
                   transition-all duration-300 ease-out
                   transform group-hover:scale-105"
      >
        联系我 / 查看项目
      </a>
      {/* 添加一个微妙的持续动画，当鼠标悬浮时更明显 */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-700/50 transition-all duration-500 -z-10 group-hover:animate-pulse"></div>
    </div>
  );
};

export default CentralBody;
