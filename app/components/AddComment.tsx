"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

type Comment = {
	postID: string;
	title: string;
};

export default function AddComment({ postID }: { postID: string }) {
	let commentToastID: string | undefined;
	const CHAR_NUM_LIMIT = 200;

	const [overTextLimit, isOverTextLimit] = useState(false);

	const { data: session } = useSession();

	const [title, setTitle] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);

	const queryClient = useQueryClient();

	useEffect(() => {
		if (title.length >= CHAR_NUM_LIMIT) isOverTextLimit(true);
		else isOverTextLimit(false);
	}, [title]);

	

	const { mutate } = useMutation(
		async (data: Comment) => {
			return axios.post("/api/posts/addComment", data);
		},

		{
			onSuccess: () => {
				setIsDisabled(false);
				toast.dismiss();
				queryClient.invalidateQueries(["postDetails"]);
				toast.success("Comment added successfully");
				setTitle("");
				// scroll to first comment
				const comment = document.querySelector(".commentSection");
				comment?.scrollIntoView({ behavior: "smooth" });
			},

			onError: (error) => {
				console.log(error);
				setIsDisabled(false);
				toast.dismiss();
				if (error instanceof AxiosError) {
					toast.error(error.response?.data.message);
				}
			},
		}
	);

	const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDisabled(true);
		commentToastID = toast.loading("Adding comment...");
		mutate({ postID, title } as Comment);
	};

	return (
		<form onSubmit={submitPost} className="my-8 flex">
			<Image
				className="rounded-full w-10 h-10 mt-8 ml-5"
				src={session?.user?.image || ""}
				alt="Profile Picture"
				width={50}
				height={50}
			/>

			<div className="w-full flex flex-col">
				<p
					className={`font-bold text-right mr-16 text-xs ${
						overTextLimit ? "text-red-500 shake-animation" : ""
					}`}
				>
					{`${title.length} / ${CHAR_NUM_LIMIT}`}
				</p>
				<textarea
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					name="title"
					className="w-10/12 h-20 mt-5 ml-10 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-300"
					placeholder="Write a comment..."
				></textarea>

				<button
					disabled={isDisabled}
					type="submit"
					className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-3 ml-auto rounded-lg mr-14 "
				>
					Reply
				</button>
			</div>
		</form>
	);
}
