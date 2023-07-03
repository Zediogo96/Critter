import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET(request: NextRequest) {
	const session = await getServerSession(authOptions);

	const prismaUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email,
		},
	});

	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
				likes: true,
				comments: true,
			},
		});

		// check if user has liked the post
		posts.forEach((post: any) => {
			post.likes.forEach((like: any) => {
				if (like.userID === prismaUser.id) {
					post.liked = true;
				}
			});
		});

		return NextResponse.json({ status: 200, posts });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while getting the Posts.",
		});
	}
}
