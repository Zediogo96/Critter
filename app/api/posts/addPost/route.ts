import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/prisma/client";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session)
		return NextResponse.json({
			status: 403,
			message: "You must be signed in to post.",
		});

	const body = await request.formData();

	console.log("BODY:", body);

	const title: string = body.get("title") as string;
	const image: File = body.get("file") as File;

	console.log("IMAGE:", image);

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

	// save file to public folder

	try {
		const result = await prisma.post.create({
			data: {
				title,
				userID: prismaUser.id,
				image: image.name,
			},
		});

		const postID = result.id;
		

		// get type of image
		const imageType = image.type.split("/")[1];

		const filePath = path.join(
			process.cwd(),
			"public",
			"posts",
			"main_Image",
			postID + "." + imageType
		);

		const fileBuffer = await image.arrayBuffer();
		fs.writeFileSync(filePath, Buffer.from(fileBuffer));

		return NextResponse.json({ status: 200, message: "Post Created!" });

	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while creating the Post.",
		});
	}
}
