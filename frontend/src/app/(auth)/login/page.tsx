import React from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Login() {
	return (
		<section className="container">
			<div className="w-full md:max-w-[500px] mx-auto flex items-center justify-center pt-16">
				<div className="border rounded-md p-10 space-y-5 w-full md:min-w-[500px]">
					<div className="flex justify-center">
						<Link href={"/"}>
							<Image
								src={"/logo.png"}
								width={100}
								height={100}
								alt="Logo"
							/>
						</Link>
					</div>
					<LoginForm />

					<p>
						<Link href={"/sign-up"} className="underline">
							Don&apos;t have an account? Create one
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
