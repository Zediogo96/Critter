"use client";

import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

type User = {
	image: string;
};

export default function Logged({image }: User) {
	return (
		<li className="flex gap-7 items-center">
			<button
				onClick={() => signOut()}
				className="text-black text-small py-2 rounded-md link-underline">
				Sign Out
			</button>
			<Link href={""}>
				<Image className="w-10 h-10 rounded-full" width={64} height={64} src={image} alt="" priority/>
			</Link>
		</li>
	);
}
