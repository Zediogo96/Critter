import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session)
		return NextResponse.json({
			status: 401,
			message: "Please signin to post a comment.",
		});

	//Get User
	const prismaUser = await prisma.user.findUnique({
		where: { email: session.user?.email },
	});

	const body = await request.json();

    const title: string = body.title;
    const postID: string = body.postID

	if (!title.length) {
		return NextResponse.json({ status: 401,  message: "Please enter some text" });
	}
	try {
		const result = await prisma.comment.create({
			data: {
				message: title,
				postID: postID,
                userID: prismaUser?.id,
			},
		});
		return NextResponse.json({ status: 200, message: "Comment added successfully" })
	} catch (err) {
		console.log(err);
        return NextResponse.json({ status: 500, message: "Something went wrong" })
	}
}
