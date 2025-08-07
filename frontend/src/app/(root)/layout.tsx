import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import React from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
