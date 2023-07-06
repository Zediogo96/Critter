import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session)
		return NextResponse.json({
			status: 403,
			message: "You must be signed to delete the post.",
		});

	const req = await request.json();

	const postID = req.data.postID;

	try {
		const result = await prisma.post.delete({
			where: {
				id: postID,
			},
		});

		const filePath = result.image;

		// delete the image from the server
		fs.unlink(filePath, (err) => {
			if (err) {
				return NextResponse.json({
					status: 500,
					err: "Something went wrong while deleting the Post Image in the server.",
				});
			}
		});
				
		return NextResponse.json({ status: 200, message: "Post Deleted!" });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while deleting the Post.",
		});
	}
}
