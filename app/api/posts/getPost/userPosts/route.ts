import prisma from "@/prisma/client";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	
	const session = await getServerSession(authOptions)

	const userEmail = session?.user?.email

	try {
		const userPosts = await prisma.user.findUnique({
			where: {
				email: userEmail,
			},
			include: {
				posts: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						comments: true,
						likes: true
					}
				},
			},
        });

		return NextResponse.json({ status: 200, userPosts });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while getting the Post.",
		});
	}
}
