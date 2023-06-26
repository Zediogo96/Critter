"use client";

import Post from "@/app/components/Post";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostsType } from "@/app/types/Posts";
import { useSession } from "next-auth/react";

import Image from "next/image";

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

	console.log(session);

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

			<div className="flex ">
				<Image
					className="rounded-full w-10 h-10 mt-8 ml-5"
					src={session.user?.image || ""}
					alt="Profile Picture"
					width={50}
					height={50}
				/>

				<div className="w-full flex flex-col">
					<textarea
						className="w-11/12 h-20 mt-5 ml-10 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
						placeholder="Write a comment..."
					></textarea>

					<button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-3 ml-auto rounded-lg mr-6 ">
						Reply
					</button>
				</div>
			</div>
		</div>
	);
}
