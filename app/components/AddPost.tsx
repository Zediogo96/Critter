"use Client";

import { useEffect, useState } from "react";

export default function AddPost() {
	// Related to limit of 300 characters per post
	const CHAR_NUM_LIMIT = 280;
	const [title, setTitle] = useState("");
	const [overTextLimit, isOverTextLimit] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		if (title.length >= CHAR_NUM_LIMIT) isOverTextLimit(true);
		else isOverTextLimit(false);
	}, [title]);

	return (
		<form className="bg-blue-100 my-8 p-8 rounded-lg shadow-xl ml-2">
			<div className="flex-1 px-2 pt-2 mt-1">
      <p
						className={`font-bold float-right mb-3 ${
							overTextLimit ? "text-red-500 shake-animation" : ""
						} text-xs`}
					>
            {`${title.length} / ${CHAR_NUM_LIMIT}`}

        </p>
				<textarea 
					onKeyDown={(e) => {
            
						const isDeleteOrNavKey = e.key === "Backspace" || e.key === "Delete"
            || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown";

						if (!isDeleteOrNavKey && overTextLimit) e.preventDefault();
					}}
					onChange={(e) => setTitle(e.target.value)}
					className="bg-white font-medium text-md px-2 py-1 mx-2 w-full rounded-md"
					rows={3}
					cols={50}
					placeholder="What's happening?"
				></textarea>
			</div>

			<div className="flex">
				<div className="w-55 ">
					<div className="flex items-center">
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
					>
						Tweet
					</button>
				</div>
			</div>
		</form>
	);
}
