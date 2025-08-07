import Link from "next/link";
import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";

export default function Register() {
	return (
		<section className="container">
			<div className="w-full md:max-w-[500px] mx-auto flex items-center justify-center pt-10">
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
					<RegisterForm />
					<p>
						<Link href={"/login"} className="underline mt-10">
							Already have an account? Login
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
