"use client";

import axios from "axios";
import { PostsType } from "./types/Posts";
import { useQuery } from "@tanstack/react-query";

import AddPost from "./components/AddPost";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import SearchBar from "./components/SearchBar";

// Fetch all posts
const allPosts = async () => {
	const response = await axios.get("/api/posts/getPost");
	return response.data.posts;
};

export default function Home() {
	let { data, error, isLoading } = useQuery<PostsType[]>({
		queryFn: allPosts,
		queryKey: ["posts"],
	});

	if (error) return error;
	if (isLoading) return "Loading...";

	// Sort posts by date
	data = data!.sort((a: PostsType, b: PostsType) => {
		return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
	});

	return (
		<div className="flex ">
			<NavBar />
			<div className="flex flex-col overflow-x-auto w-3/5">
				<AddPost />
				{data?.map((post) => (
					<Post
						key={post.id}
						title={post.title}
						username={post.user.name}
						datePublished={post.createdAt!}
						userImg={post.user.image}
						id={post.id}
						likes={post.likes}
						userLiked={post.liked!}
						image={post.image!}
						comments={post.comments}
					/>
				))}
			</div>
			<SearchBar />
		</div>
	);
}
