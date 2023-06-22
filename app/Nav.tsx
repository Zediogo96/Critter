import Link from "next/link";
import Login from "./auth/Login";
import { NextAuthOptions } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next"

export default async function Nav() {

	const session = await getServerSession(authOptions)
	console.log(session)
	
	return (
		<nav className="flex justify-between items-center py-8">
			<Link href={"/"}>
				<h1 className="font-bold text-lg"> Critter. </h1>
			</Link>

            <ul className="flex items-center gap-6">
                <Login />
            </ul>
		</nav>
	);
}
