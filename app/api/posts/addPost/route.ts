import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session)
		return NextResponse.json({
			status: 403,
			message: "You must be signed in to post.",
		});

	const body = await request.json();

	const title: string = body.title;

	const prismaUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email,
		},
	});
	
	if (title.length > 280)
		return NextResponse.json({
			status: 403,
			message: "Post is too long.",
		});
	else if (title.length === 0) {
		return NextResponse.json({
			status: 403,
			message: "Post cannot be empty.",
		});
	}

	try {
		const result = await prisma.post.create({
			data: {
				title,
				userID: prismaUser.id,
			},
		});

		return NextResponse.json({ status: 200, message: "Post Created!"});

	} catch (err) {
		
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while creating the Post.",
		});
	}

	
}
