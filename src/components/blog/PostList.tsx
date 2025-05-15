import PostItem from "./PostItem";

export default async function PostList() {
  const posts: any[] = [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
