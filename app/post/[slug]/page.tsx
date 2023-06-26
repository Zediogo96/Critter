"use client";

import Post from "@/app/components/Post";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostsType } from "@/app/types/Posts";
import { useSession } from "next-auth/react"

type URL = {
	params: {
		slug: string;
	};
	searchParams: string;
};

// Fetch Details of a single post
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/getPost/${slug}`);
	console.log(response);
	return response.data.post;
};

export default function PostDetails(url: URL) {
	const { data: session, status } = useSession();

	console.log(session)

	if (status === "loading") return "Loading...";
	if (!session) {
		// Handle the case when the user is not authenticated
		return <div>Please sign in to view this page.</div>;
	}

	const { data, error, isLoading } = useQuery<PostsType>({
		queryFn: () => fetchDetails(url.params.slug),
		queryKey: ["postDetails", url.params.slug],
	});

	if (isLoading) return "Loading...";
	if (error) return error;

	return (
		<div>
			<Post
				key={data?.id}
				title={data?.title || ""}
				username={data?.user.name || ""}
				datePublished={data?.createdAt!}
				userImg={data?.user.image || ""}
				id={data?.id || ""}
			/>
		</div>
	);
}
