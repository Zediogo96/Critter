import { formatDate } from "@/utils/dateFunctions";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Toggle from "@/app/dashboard/Toggle";

export default function Post({
	username,
	title,
	datePublished,
	userImg,
	id,
	likes,
	userLiked,
	image,
	comments,
}: {
	username: string;
	title: string;
	datePublished: string;
	userImg: string;
	id: string;
	likes: any;
	userLiked: Boolean;
	image: string;
	comments: any;
}) {
	const queryClient = useQueryClient();
	// update the like button
	const [isLiked, setUserLiked] = useState(userLiked);

	const parseTitle = (title: string) => {
		const hashtagRegex = /#\w+/g;
		return title.replace(
			hashtagRegex,
			(match) => `<span style="color:rgb(110, 150, 253)">${match}</span>`
		);
	};

	const handleLike = () => {
		axios
			.post("/api/posts/addLike", { postId: id })
			.then((response) => {
				if (response.status === 201) setUserLiked(isLiked);
				else if (response.status === 200) setUserLiked(!isLiked);
			})
			.catch((error) => {
				// console.error(error);
			});
	};

	const parsedTitle = parseTitle(title);

	return (
		<div>
			
			<div className="flex flex-shrink-0 p-4 pb-0">
				<span className="flex-shrink-0 group block">
					<div className="flex items-center">
						<div>
							<Link href={""}>
								<Image
									className="w-10 h-10 rounded-full"
									width={64}
									height={64}
									src={userImg}
									alt=""
									priority
								/>
							</Link>
						</div>
						<div className="ml-3">
							<p className="text-base leading-6 font-medium text-blue-300">
								{username}
								<span className="text-xs pl-2 leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
									{`@${username} . @${formatDate(datePublished)}`}
								</span>
							</p>
						</div>
					</div>
				</span>

				<Toggle />
			</div>
			<div className="pl-16">
				<Link href={`/post/${id}`}>
					<p
						className="text-base width-auto font-medium text-black flex-shrink"
						dangerouslySetInnerHTML={{ __html: parsedTitle }}
					></p>
				</Link>

				{/* Image */}
				{image && (
					<div className="flex-shrink-0 group block">
						<div className="flex items-center">
							<div className="mt-2">
								<Link href={`/post/${id}`}>
									<Image
										className="w-[90%] h-[80%] rounded-lg"
										width={512}
										height={512}
										src={"/../" + image}
										alt=""
										priority
									/>
								</Link>
							</div>
						</div>
					</div>
				)}

				<div className="flex">
					<div className="w-full">
						<div className="flex items-center">
							<div className="flex-1 text-center">
								<div className="flex flex-row">
									{/* Comment Button */}
									<a
										href="#"
										className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-500"
									>
										<svg
											className="text-center h-6 w-6"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
										</svg>
									</a>
									<p className="mt-4 text-xs text-black"> {comments.length}</p>
								</div>
							</div>
							{/* ReCritt Button */}
							<div className="flex-1 text-center py-2 m-2">
								<a
									href="#"
									className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-500"
								>
									<svg
										className="text-center h-7 w-6"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
									</svg>
								</a>
							</div>
							{/* Like Button */}
							<div className="flex-1 flex-row text-center py-2 m-2">
								<div className="flex flex-row">
									<a
										onClick={handleLike}
										href="#"
										className={`w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] 
                                    
								${isLiked ? "text-red-500 hover:text-red-300" : ""}
								hover:text-blue-500`}
									>
										<svg
											className="text-center h-7 w-6"
											fill={isLiked ? "red" : "none"}
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
										</svg>
									</a>
									<p className="mt-5 text-xs text-black">{likes.length}</p>
								</div>
							</div>
							{/* Share Button */}
							<div className="flex-1 text-center py-2 m-2">
								<a
									href="#"
									className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-500"
								>
									<svg
										className="text-center h-7 w-6"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-gray-300" />
		</div>
	);
}
