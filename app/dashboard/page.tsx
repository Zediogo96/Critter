'use client'

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

import Image from "next/image";
import NavBar from "../components/NavBar";
import ProfileNavbar from "./profileNavBar";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DashBoard() {

    const { data: session, status } = useSession();

	useEffect(() => {
		if (!session) {
			toast.error("You need to be logged in to view this page");
			redirect("/");
		}
	}, []);

	return (
		<main className="flex flex-row">
			<NavBar />
			<div className="flex flex-col w-2/4 border-1 border-gray-300">
				<div className="firstDiv bg-gray-200 h-48">
					{/* Content of firstDiv */}
				</div>

				<div className="bg-blue-200 h-max">
					<Image
						className="relative -top-10 left-5 rounded-full border-black border-2"
						src={session?.user?.image || ""}
						alt="user image"
						width={100}
						height={100}
					/>

					<div className="userInfo p-5 relative -top-8">
						<h1 className="text-2xl font-bold">{session?.user?.name}</h1>
						<h4 className="text-md">{"@zediogo96"}</h4>
						<h2 className="text-xl mt-3">{"Bio"}</h2>
						<div className="flex flex-row mt-5">
							<h3 className="text-sm">
								<span className="font-bold text-md"> 102 </span> Following
							</h3>
							<h3 className="ml-5 text-sm">
								<span className="font-bold text-md"> 4</span> Followers
							</h3>
						</div>
					</div>
					<ProfileNavbar />
				</div>
			</div>
		</main>
	);
}
