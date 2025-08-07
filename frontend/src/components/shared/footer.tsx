import Link from "next/link";
import React from "react";
import Container from "./Container";
import Image from "next/image";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
	return (
		<footer className="bg-white pt-16 mt-20">
			<Container>
				<div className="grid grid-cols-2  lg:grid-cols-5 gap-5">
					<div className="col-span-full lg:col-span-2">
						<Image
							src={"/logo.png"}
							width={54}
							height={54}
							alt="logo"
						/>
						<div className="mt-5">
							<p className="flex gap-x-2 text-gray-shade-15">
								<Mail /> developernihar@gmail.com
							</p>

							<p className="flex gap-x-2 text-gray-shade-15 my-2">
								<Phone /> 01303171346
							</p>
							<p className="flex gap-x-2 text-gray-shade-15">
								<MapPin /> Somewhere in the world
							</p>
						</div>
					</div>
					<div className="col-span-full lg:col-span-3">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-5">
							<div>
								<span className="text-gray-shade-15 text-xl font-semibold">
									Home
								</span>
								<ul className="text-gray-shade-35">
									<li>
										<Link href={"/benefits"}>Benefits</Link>
									</li>
									<li>
										<Link href={"/courses"}>
											Our Courses
										</Link>
									</li>
									<li>
										<Link href={"/testimonials"}>
											Testimonials
										</Link>
									</li>
									<li>
										<Link href={"/faq"}>Our FAQ</Link>
									</li>
								</ul>
							</div>
							<div>
								<span className="text-gray-shade-15 text-xl font-semibold">
									About Us
								</span>
								<ul className="text-gray-shade-35">
									<li>
										<Link href={"/about-us"}>Company</Link>
									</li>
									<li>
										<Link href={"/courses"}>
											Achievements
										</Link>
									</li>
									<li>
										<Link href={"/testimonials"}>
											Our Goals
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<span className="text-gray-shade-15 text-xl font-semibold">
									Social Profiles
								</span>
								<ul className="flex gap-x-4 mt-2">
									<li>
										<Button variant={"outline"}>
											<Link href={"/"}>
												<Facebook size={24} />
											</Link>
										</Button>
									</li>
									<li>
										<Button variant={"outline"}>
											<Link href={"/"}>
												<Twitter size={24} />
											</Link>
										</Button>
									</li>
									<li>
										<Button variant={"outline"}>
											<Link href={"/"}>
												<Linkedin size={24} />
											</Link>
										</Button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<p className="text-gray-shade-40 text-lg mt-12 pb-5 text-center">
					{" "}
					&copy; {new Date().getFullYear()} EduSphere. All rights
					reserved.
				</p>
			</Container>
		</footer>
	);
}
