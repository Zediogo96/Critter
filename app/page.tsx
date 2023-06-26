'use client'

import axios from "axios";
import { PostsType } from "./types/Posts";
import { useQuery } from "@tanstack/react-query";

import AddPost from "./components/AddPost";
import NavBar from "./components/NavBar";
import Post from "./components/Post";

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost");
  console.log(response.data.posts);
  return response.data.posts;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <div className="flex mt-6">
      <NavBar />
      <div className="flex flex-col overflow-x-auto">
        <AddPost />
        {data?.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            username={post.user.name}
            datePublished={post.createdAt!}
            userImg={post.user.image}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
}

