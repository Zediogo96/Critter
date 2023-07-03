"use client";

import Post from "@/app/components/Post";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostsType } from "@/app/types/Posts";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { toast } from "react-hot-toast";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import NavBar from "@/app/components/NavBar";
import SearchBar from "@/app/components/SearchBar";

import { URL } from "../../types/URL";
import AddComment from "@/app/components/AddComment";

// Fetch Details of a single post
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/getPost/${slug}`);
	return response.data.post;
};

export default function PostDetails(url: URL) {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (!session) {
			toast.error("You need to be logged in to view this page");
			redirect("/");
		}
	}, []);

	if (status === "loading") return "Loading...";

	const { data, error, isLoading } = useQuery<PostsType>({
		queryFn: () => fetchDetails(url.params.slug),
		queryKey: ["postDetails", url.params.slug],
	});

	if (isLoading) return "Loading...";
	if (error) return error;

	return (
		<div className="flex flex-row">
			<NavBar />
			<div className="flex flex-col w-3/5">
				<div>
					<Post
						key={data?.id}
						title={data?.title || ""}
						username={data?.user.name || ""}
						datePublished={data?.createdAt!}
						userImg={data?.user.image || ""}
						id={data?.id || ""}
						likes={data?.likes || ""}
						userLiked={data?.liked || false}
						comments={data?.comments || ""}
						image={data?.image || ""}
					/>
				</div>

				<AddComment postID={data?.id || ""} />

				
			</div>

			<SearchBar />
		</div>
	);
}
