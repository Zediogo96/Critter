import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/prisma/client";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session)
		return NextResponse.json({
			status: 403,
			message: "You must be signed in to post.",
		});

	const body = await request.formData();

	const title: string = body.get("title") as string;
	const image: File = body.get("file") as File;

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

		// get cuid() from prisma
		const postID = uuidv4();

		let filePath;

		if (image && image.size > 0) {
			// get type of image
			const imageType = image.type.split("/")[1];

			filePath = path.join(
				"./",
				"public",
				"posts",
				"main_Image",
				postID + "." + imageType
			);

			// replace "\" with "/" for windows
			filePath = filePath.replace(/\\/g, "/");

			// Save file to public folder
			const fileBuffer = await image.arrayBuffer();
			fs.writeFileSync(filePath, Buffer.from(fileBuffer));
		}
		const result = await prisma.post.create({
			data: {
				id: postID,
				title,
				userID: prismaUser.id,
				image: filePath || null, // Use null if image is not provided
			},
		});

		return NextResponse.json({ status: 200, message: "Post Created!" });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while creating the Post.",
		});
	}
}
