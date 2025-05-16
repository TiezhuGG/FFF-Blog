"use client";

import { PostFormData } from "@/app/(main)/blog/actions";
import PostItem from "./PostItem";
import { motion } from "framer-motion";

// 定义容器动画的 variants
// 当容器出现时，它的子元素（列表项）会开始动画
const containerVariants = {
  hidden: { opacity: 0 }, // 初始状态：完全透明
  visible: {
    opacity: 1, // 最终状态：完全不透明
    transition: {
      // staggerChildren 会让子元素的动画错开开始
      // delayChildren 是子元素动画开始前的延迟
      staggerDirection: 1, // 1 表示从第一个子元素开始依次延迟，-1 表示从最后一个开始
      staggerChildren: 0.1, // 每个子元素的动画延迟 0.1 秒开始
      delayChildren: 0.2, // 容器出现后，子元素动画延迟 0.2 秒才开始
    },
  },
};

// 定义列表项动画的 variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // 初始状态：向上偏移 20px 并完全透明
  visible: {
    y: 0, // 最终状态：回到原始位置
    opacity: 1, // 最终状态：完全不透明
    transition: {
      duration: 0.5, // 动画持续时间 0.5 秒
      ease: "easeOut", // 动画缓动函数
    },
  },
};

export default function PostList({ posts }: { posts: PostFormData[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {posts?.map((post) => (
        <motion.div key={post.id} variants={itemVariants}>
          <PostItem post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
