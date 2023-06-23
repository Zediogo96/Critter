import Link from "next/link";
import Image from "next/image";
import Login from "./auth/Login";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import Logged from "./auth/Logged";

export default async function Nav() {
	const session = await getServerSession(authOptions);

	return (
		<nav className="flex justify-between items-center py-8">
			<Link href={"/"}>
				<div className="flex justify-between items-center">
					<Image
						width={40}
						height={40}
						src="/../public/critterIcon.png"
						alt=""
						priority
					/>
					<h1 className="font-bold text-lg ml-2">Critter. </h1>
				</div>
			</Link>

			<ul className="flex items-center gap-6">
				{!session?.user && <Login />}
				{session?.user && (
					<li>
						<Logged
							image={session.user?.image || ""}
							name={session.user?.name || ""}
						/>
					</li>
				)}
			</ul>
		</nav>
	);
}
