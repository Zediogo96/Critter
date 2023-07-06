import React from "react";

export default function ConfirmModal({
	title,
	description,
	confirmFunction,
	openFunction,
	showModal,
}: {
	title: string;
	description: string;
	confirmFunction: any;
	openFunction: any;
	showModal: boolean;
}) {
	if (!showModal) return null;
	return (
		
		showModal && (
			<div className="fixed inset-0 flex items-center object-hi justify-center bg-gray-900 bg-opacity-50">
				<div className="bg-white w-96 rounded-lg p-8">
					<button className="relative float-right bottom-3 text-gray-500 hover:text-red-700">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<div className="title mt-5">
						<h1 className="text-xl font-bold mb-4 text-center">{title}</h1>
					</div>
					<div className="body">
						<p className="text-gray-700 text-center">{description}</p>
					</div>
					<div className="footer flex justify-center mt-8">
						<button
							className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md mr-2"
							onClick={confirmFunction}
						>
							Confirm
						</button>
						<button
						onClick={openFunction}
						 className="px-4 py-2 bg-red-300 hover:bg-red-400 text-gray-700 rounded-md">
							Cancel
						</button>
					</div>
				</div>
			</div>
		)
	);
}
