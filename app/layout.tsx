import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.scss";
import { personalInfo } from "./constants/data";

import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar, Footer, Preloader } from "./components/legacy";
import { CursorGlow } from "./components/legacy/3d";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
	display: "swap",
});

const { name, title, bio } = personalInfo;

export const metadata: Metadata = {
	title: `${name} | ${title}`,
	description: bio,
	keywords: [
		"Flutter Developer",
		"Dart",
		"Mobile App Developer",
		"Android Developer",
		"iOS Developer",
		"Cross-platform",
		"Bloc",
		"Riverpod",
		"Firebase",
		name,
	],
	authors: [{ name }],
	creator: name,
	openGraph: {
		type: "website",
		title: `${name} | ${title}`,
		description: bio,
		siteName: `${name} - Portfolio`,
	},
	twitter: {
		card: "summary_large_image",
		title: `${name} | ${title}`,
		description: bio,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<body className={`${inter.variable} ${playfair.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<Preloader />
					<CursorGlow />
					<main className="relative min-h-screen">
						<Navbar />
						{children}
						<Footer />
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
