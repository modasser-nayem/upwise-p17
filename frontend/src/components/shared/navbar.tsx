"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MobileNavbar } from "./mobile-navbar";

import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";

import UserDropdown from "./user-dropdown";
import Container from "./Container";

export default function Navbar() {
	const user = useAppSelector(selectedUser);
	const router = useRouter();
	const [search, setSearch] = useState("");

	const handleSearch = () => {
		if (search.trim().length) {
			router.push(`/courses?search=${encodeURIComponent(search)}`);
		} else {
			router.push(`/courses`);
		}
	};

	return (
		<nav className="h-20 border-b z-50" data-aos="fade-down">
			<Container className="h-full">
				{/* desktop view  */}
				<div className="hidden h-full w-full lg:grid grid-cols-4 content-center">
					{/* logo  with search menu*/}
					<div className="flex items-center gap-x-3">
						<Link href={"/"}>
							<Image
								src={"/logo.png"}
								height={192}
								width={192}
								alt="website logo"
								className="size-12"
							/>
						</Link>

						<div className="relative bg-white rounded-md ring-1 hover:ring-1 hover:ring-primary overflow-hidden">
							<input
								type="text"
								placeholder="Search course..."
								onChange={(e) => setSearch(e.target.value)}
								value={search}
								className="outline-none p-2 rounded-md "
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleSearch();
									}
								}}
							/>
							<span
								title="Click to search"
								className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
								onClick={handleSearch}
							>
								<Search className="text-gray-shade-35 hover:text-gray-shade-10 scale-90 hover:scale-100 transition-all duration-200" />
							</span>
						</div>
					</div>

					{/**Nav item */}
					<div className="col-span-2 justify-items-center">
						<ul className="h-full flex items-center gap-x-6 ">
							<li>
								<Link href={"/"}>Home</Link>
							</li>
							<li>
								<Link href={"/courses"}>Courses</Link>
							</li>
							<li>
								<Link href={"/about-us"}>About Us</Link>
							</li>

							<li>
								<Link href={"/contact"}>Contact</Link>
							</li>
						</ul>
					</div>

					<div className="justify-items-end">
						{/**Login button or dropdown */}
						{!user ? <DesktopLoginSection /> : <UserDropdown />}
					</div>
				</div>

				{/* mobile view  */}
				<div className="h-full flex items-center justify-between lg:hidden">
					<MobileNavbar />
					<div className="relative bg-white rounded-md ring-1 hover:ring-1 hover:ring-primary overflow-hidden">
						<input
							type="text"
							placeholder="Search course..."
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							className="outline-none p-2 rounded-md "
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleSearch();
								}
							}}
						/>
						<span
							title="Click to search"
							className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
							onClick={handleSearch}
						>
							<Search className="text-gray-shade-35 hover:text-gray-shade-10 scale-90 hover:scale-100 transition-all duration-200" />
						</span>
					</div>

					{!user ? (
						<Link href={"/login"}>
							<Button>Login</Button>
						</Link>
					) : (
						<UserDropdown />
					)}
				</div>
			</Container>
		</nav>
	);
}

const DesktopLoginSection = () => {
	return (
		<div className="flex items-center gap-x-3 z-50">
			<Link href={"/sign-up"}>
				<Button variant={"outline"} size={"lg"}>
					Sign Up
				</Button>
			</Link>
			<Link href={"/login"}>
				<Button size={"lg"}>Login</Button>
			</Link>
		</div>
	);
};
