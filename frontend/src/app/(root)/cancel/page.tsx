import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CancelPage() {
	return (
		<Container className="grid grid-cols-1 md:grid-cols-2 py-20 place-content-center ">
			<div>
				<h2 className="text-4xl font-bold text-orange-shade-50 mb-4">
					Payment Cancelled
				</h2>
				<p className="text-lg text-gray-600 mb-6">
					It looks like you’ve cancelled the payment process. If this
					was a mistake, you can try again below.
				</p>
				<Link href="/" className="">
					<Button
						variant={"secondary"}
						className="ring-1 ring-primary"
					>
						Return to Homepage
					</Button>
				</Link>
			</div>

			<div className="order-first md:order-last">
				<Image
					src="illustration/cancel.svg"
					width={200}
					height={200}
					alt="Payment Cancelled Illustration"
					className="w-full max-w-sm mx-auto"
				/>
			</div>
		</Container>
	);
}
