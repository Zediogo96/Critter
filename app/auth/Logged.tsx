"use client";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

type User = {
	name: string;
	image: string;
};

export default async function Logged({ name, image }: User) {
	return (
		<li className="flex gap-7 items-center">
			<button
				onClick={() => signOut()}
				className="bg-gray-700 text-white text-small px-7 py-2 rounded-md">
				Sign Out
			</button>
			<h1> {name} </h1>

			<Link href={"/dashboard"}>
				<Image className="w-14 rounded-full" width={64} height={64} src={image} alt="" priority/>
			</Link>
		</li>
	);
}
