import "./globals.css";
import { Roboto } from "@next/font/google";
import QueryWrapper from "@/utils/QueryWrapper";
import Nav from "./Nav";
import { SessionProvider } from "next-auth/react";
import AuthContext from "./auth/AuthContext";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-roboto",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-gray-300 to-white`}>
				<QueryWrapper>
					<AuthContext>
						
						<Nav />
						{children}
					</AuthContext>
				</QueryWrapper>
			</body>
		</html>
	);
}
