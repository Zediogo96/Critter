'use client'

import Post from "@/app/components/Post";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostsType } from "@/app/types/Posts";
import { motion } from "framer-motion";

type URL = {
	params: {
		slug: string;
	};
	searchParams: string;
};

// Fetch Details of a single post
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/getPost/${slug}`);
	console.log(response)
	return response.data.post;
};

export default function PostDetails(url: URL) {
	const { data, error, isLoading } = useQuery<PostsType>({
		queryFn: () => fetchDetails(url.params.slug),
		queryKey: ["postDetails", url.params.slug],
	});

	if (isLoading) return "Loading...";
	if (error) return error;

	console.log(data)

	return (
		<Post
            key={data?.id}
            title={data?.title || ""}
            username={data?.user.name || ""}

            datePublished={data?.createdAt!}
            userImg={data?.user.image || ""}
            id={data?.id || ""}
          />

	);
}
