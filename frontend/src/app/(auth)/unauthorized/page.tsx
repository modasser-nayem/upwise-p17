import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UnAuthorized() {
	return (
		<Container className="h-[calc(100vh-80px)] flex items-center justify-center">
			<div>
				<div className="flex items-center justify-center">
					<Image
						src={"/illustration/access-denied.svg"}
						width={300}
						height={300}
						alt="access-denied"
					/>
				</div>
				<div className="text-center mt-10">
					<h4 className="text-primary font-semibold font-geist-mono">
						403
					</h4>
					<h3 className="font-geist-mono">We are Sorry...</h3>
					<p className="my-3 text-gray-shade-40">
						Sorry about that, but you do not have permission to
						access this page.
					</p>

					<Link href={"/"}>
						<Button>Go to Home</Button>
					</Link>
				</div>
			</div>
		</Container>
	);
}
