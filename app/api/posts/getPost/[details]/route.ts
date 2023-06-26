import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { details: string } }
) {
	const postID = params.details;

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: postID
			},
			include: {
				user: true
			},
		});

		if (!post) {
			return NextResponse.json({
				status: 404,
				err: "Post not found.",
			});
		}

		return NextResponse.json({ status: 200, post });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while getting the Post.",
		});
	}
}
