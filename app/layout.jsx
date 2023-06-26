import "./globals.css";
import { Roboto } from "@next/font/google";
import QueryWrapper from "@/utils/QueryWrapper";
import Nav from "./Nav";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-roboto",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-zinc-100`}>
				<QueryWrapper>
					<Nav />
					{children}
				</QueryWrapper>
			</body>
		</html>
	);
}
