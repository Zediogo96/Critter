import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session)
		return NextResponse.json({
			status: 403,
			message: "You must be signed in to like a post.",
		});

	const req = await request.json();

	const prismaUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email,
		},
	});

	const like = await prisma.like.findFirst({
		where: {
			userID: prismaUser.id,
			postID: req.postId,
		},
	});

	try {
		if (!like) {
			const result = await prisma.like.create({
				data: {
					userID: prismaUser.id,
					postID: req.postId,
				},
			});

			return NextResponse.json({ status: 201, message: "Post Liked!" });
		} else {
			const result = await prisma.like.delete({
				where: {
					id: like.id,
				},
			});

			return NextResponse.json({ status: 200, message: "Post Unliked!" });
		}
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while liking the Post.",
		});
	}
}
