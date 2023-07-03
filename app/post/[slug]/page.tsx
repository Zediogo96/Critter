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
import { formatDate } from "@/utils/dateFunctions";

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
	

	let sortedComments = data?.comments?.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

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

				<hr className="border-gray-300"></hr>

				<AddComment postID={data?.id || ""} />

				<hr className="border-gray-300"></hr>

				{/* COMMENTS */}
				<div className="flex flex-col mt-3 commentSection">
					{sortedComments?.map((comment) => (
						<div className="flex flex-col p-2">
							<div className="flex flex-row items-center">
								<Image
									src={comment.user.image}
									width={40}
									height={40}
									className="rounded-full"
									alt="Profile Picture"
								/>

								<div className="ml-3">
									<p className="text-base leading-6 font-medium text-blue-300">
										{comment.user.name}
										<span className="text-xs pl-2 leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
											{`@${"zediogo96"} . @${formatDate(comment.createdAt)}`}
										</span>
									</p>
								</div>
							</div>

							<span className="ml-14">{comment.message}</span>
						</div>
					))}
				</div>
			</div>
			<SearchBar />
		</div>
	);
}
