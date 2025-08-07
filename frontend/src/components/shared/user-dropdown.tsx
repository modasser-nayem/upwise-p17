"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/slice/authSlice";
import { removeCookie } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { useMyProfileQuery } from "@/redux/api/userApi";

const getMenuItemsByRole = (role: string | undefined) => {
	switch (role) {
		case "admin":
			return [
				{ label: "Dashboard", href: "/admin" },
				{ label: "Manage Users", href: "/admin/users" },
				{ href: "/admin/transaction", label: "Transactions" },
				{ href: "/admin/reviews", label: "Manage Reviews" },
			];
		case "instructor":
			return [
				{ label: "Dashboard", href: "/instructor" },
				{ label: "My Courses", href: "/instructor/courses" },
			];
		case "student":
		default:
			return [
				{ label: "My Courses", href: "/student" },
				{
					label: "Change Password",
					href: "/dashboard/change-password",
				},
			];
	}
};

export default function UserDropdown() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { data, isLoading } = useMyProfileQuery();
	const menuItems = getMenuItemsByRole(data?.result?.role);

	const handleLogout = async () => {
		dispatch(logout());
		await removeCookie();
		router.replace("/");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer size-12  ring-2 ring-orange-shade-50">
					<AvatarImage
						src={
							data?.result?.avatar ||
							"https://github.com/shadcn.png"
						}
						alt="user-profile-photo"
						loading="lazy"
					/>
					<AvatarFallback className="uppercase">
						{data?.result?.name.substring(0, 2)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="min-w-80 p-5">
				{isLoading && <p>Loading...</p>}
				<div className="flex flex-col items-center justify-center py-2">
					<Image
						src={
							data?.result?.avatar ||
							"https://github.com/shadcn.png"
						}
						height={50}
						width={50}
						alt="User Photo"
						className="size-[50px] rounded-full ring-1 ring-orange-shade-50"
					/>
					<p className="text-xl font-semibold mt-2">
						{data?.result?.name}
					</p>

					<Link href="/dashboard/profile">
						<Button className="mt-2" size="sm">
							View Profile
						</Button>
					</Link>
				</div>

				<ul className="">
					{menuItems.map((item, idx) => (
						<Link key={idx} href={item?.href}>
							<DropdownMenuItem className="cursor-pointer hover:underline">
								{item.label}
							</DropdownMenuItem>
						</Link>
					))}
				</ul>
				<Button
					onClick={handleLogout}
					variant={"secondary"}
					className="text-primary w-full mt-5"
				>
					Logout <LogOut />
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
