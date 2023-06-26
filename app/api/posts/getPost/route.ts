import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
			},
		});

		return NextResponse.json({ status: 200, posts });
	} catch (err) {
		return NextResponse.json({
			status: 500,
			err: "Something went wrong while getting the Posts.",
		});
	}
}
