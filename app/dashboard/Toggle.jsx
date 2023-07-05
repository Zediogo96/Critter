"use client";
import { useState } from "react";

export default function Toggle() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div>
			<button
				id="dropdownMenuIconHorizontalButton"
				data-dropdown-toggle="dropdownDotsHorizontal"
				className="inline-flex items-center p-3 text-sm font-medium text-center rounded-full hover:bg-zinc-300 focus:ring-2 focus:outline-nonet ml-64 "
				type="button"
				onBlur={toggleDropdown}
				onClick={toggleDropdown}
			>
				<svg
					className="w-4 h-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 3"
				>
					<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
				</svg>
			</button>
			{/* Dropdown menu */}
			<div
				id="dropdownDotsHorizontal"
				className={`dropdown dropdown-end absolute z-50 p-2 ml-20 shadow-xl rounded-xl border-4 border-slate-400 border-y-slate-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-300
                ${isDropdownOpen ? "block" : "hidden"}`}
				tabIndex="0"
			>
				<ul className="menu dropdown-content w-52" tabIndex="0">
					<li className="flex items-center rounded-xl p-1 hover:bg-gradient-to-r from-red-200 to-red-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-trash-x-filled w-5 h-5"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path
								d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
								strokeWidth="0"
								fill="currentColor"
							></path>
							<path
								d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
								strokeWidth="0"
								fill="currentColor"
							></path>
						</svg>
						<span className="ml-2">Delete Post</span>
					</li>
					<li className="rounded-xl p-1 hover:bg-gradient-to-r from-cyan-200 to-blue-300">
						<a>Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
