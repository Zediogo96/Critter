"use Client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

export default function AddPost() {
	// Related to limit of 300 characters per post
	const CHAR_NUM_LIMIT = 280;
	const [title, setTitle] = useState("");
	const [overTextLimit, isOverTextLimit] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (title.length >= CHAR_NUM_LIMIT) isOverTextLimit(true);
		else isOverTextLimit(false);
	}, [title]);

	// Handle image upload
	const uploadedImage = useRef<HTMLInputElement>(null);

	const [file, setUploadedImage] = useState();

	async function handleUpload(e: any) {
		setUploadedImage(e.target.files[0]);
		e.target.value = null;
	}

	useEffect(() => {}, [file]);

	// Create a post
	const { mutate } = useMutation(
		async (data: { title: string; file: File }) => {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("file", data.file);
			return await axios.post("/api/posts/addPost", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		},
		{
			onSuccess: (response) => {
				// To clear the loading toast
				toast.dismiss();
				// Clear the input field
				setTitle("");
				// Reset the textarea value to an empty string
				document.getElementsByTagName("textarea")[0].value = "";
				// Re-enable the submit button
				setIsDisabled(false);
				// Show the response message in a toast notification
				if (response?.data.status === 403) toast.error(response?.data.message);
				else {
					toast.success(response?.data.message);
					setUploadedImage(undefined);
					queryClient.invalidateQueries("posts" as any);
				}
			},
			onError: (error) => {
				toast.dismiss();
				if (error instanceof AxiosError)
					toast.error(error?.response?.data.message);
			},
		}
	);

	const submitPost = async (e: React.FormEvent) => {
		const toastID = toast.loading("Submiting your Critter...");
		e.preventDefault();
		setIsDisabled(true);
		const postData = { title, file };
		mutate(postData as any);
	};

	return (
		<form
			method="POST"
			onSubmit={submitPost}
			className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-300 my-8 p-8 rounded-lg shadow-xl ml-2"
		>
			<div className="flex-1 px-2 pt-2 mt-1">
				<p
					className={`font-bold float-right mb-3 ${
						overTextLimit ? "text-red-500 shake-animation" : ""
					} text-xs`}
				>
					{`${title.length} / ${CHAR_NUM_LIMIT}`}
				</p>

				<input
					type="file"
					accept="image/*"
					ref={uploadedImage}
					style={{ display: "none" }}
					onChange={handleUpload}
				/>
				<textarea
					onKeyDown={(e) => {
						const isDeleteOrNavKey =
							e.key === "Backspace" ||
							e.key === "Delete" ||
							e.key === "ArrowLeft" ||
							e.key === "ArrowRight" ||
							e.key === "ArrowUp" ||
							e.key === "ArrowDown";

						if (!isDeleteOrNavKey && overTextLimit) e.preventDefault();
					}}
					onChange={(e) => setTitle(e.target.value)}
					className="bg-white font-medium text-md px-2 py-1 mx-2 w-full rounded-md focus:outline-none focus:outline-blue-300 max-h-32"
					rows={3}
					cols={50}
					placeholder="What's happening?"
				></textarea>

				{file && (
					<div className="flex justify-center relative">
						<button
							type="button"
							className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-100 rounded-full focus:ring-2 focus:ring-gray-300 p-0.5 hover:bg-gray-100 inline-flex h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 absolute top-8 left-[15%]"
							data-dismiss-target="#toast-default"
							aria-label="Close"
							onClick={() => setUploadedImage(undefined)}
						>
							<span className="sr-only">Close</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>

						<img
							src={URL.createObjectURL(file)}
							alt="Uploaded Image"
							className="w-3/4 h-1/2 max-h-64 mt-4 rounded-xl"
						/>
					</div>
				)}
			</div>

			<div className="flex">
				<div className="w-55 ">
					<div className="flex items-center">
						{/* ADD IMAGE ICON */}
						<div
							className="flex-1 text-center pt-4"
							onClick={() => uploadedImage.current?.click()}
						>
							<a
								href="#"
								className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-500"
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
									<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
							</a>
						</div>

						<div className="flex-1 text-center pt-4">
							<a
								href="#"
								className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-500"
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
									<path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
									<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</a>
						</div>

						<div className="flex-1 text-center pt-4">
							<a
								href="#"
								className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-500"
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
									<path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
							</a>
						</div>

						<div className="flex-1 text-center pt-4">
							<a
								href="#"
								className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium duration-400 hover:scale-[1.2] hover:text-blue-600"
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
									<path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<div className="flex-1 items-center justify-between gap-2">
					<button
						className="bg-blue-400 mt-5 hover:bg-slate-500 shadow-md text-white font-bold py-2 px-8 rounded-lg float-right"
						disabled={isDisabled}
						type="submit"
					>
						Critt!
					</button>
				</div>
			</div>
		</form>
	);
}
