"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("Validating payment...");

	useEffect(() => {
		if (!sessionId) return;

		const checkPayment = async () => {
			try {
				// (Optional) Call your backend to confirm session status if needed
				// const res = await fetch(`/api/verify-session?sessionId=${sessionId}`);
				// const data = await res.json();

				setMessage("Payment successful! You're now enrolled.");
			} catch (err) {
				console.error(err);
				setMessage("Could not verify payment.");
			} finally {
				setLoading(false);
			}
		};

		checkPayment();
	}, [sessionId]);

	return (
		<div className="p-6 text-center">
			<div className="w-full max-w-xl mx-auto relative h-[400px] mb-10">
				<Image
					src={"/illustration/payment_success.svg"}
					alt="success-image"
					width={600}
					height={400}
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<h1 className="text-2xl font-bold mb-4">Thank you!</h1>
			<p className="mb-4 text-gray-shade-40">
				{loading ? "Processing..." : message}
			</p>
			<Link href={"/"}>
				<Button>Go to Home</Button>
			</Link>
		</div>
	);
}
