import "./globals.css";
import { Roboto } from "@next/font/google"
import Nav from "./Nav";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-roboto",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>

			</head>

			<body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-zinc-100`}>
				<Nav />
				{children}
			</body>
		</html>
	);
}
