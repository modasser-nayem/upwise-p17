"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useLoggedOutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { removeCookie } from "@/actions/auth-action";

type UserAvatarProps = {
	data: {
		name: string | undefined;
		avatar: string | undefined;
		role: string | undefined;
	};
	isLoading: boolean;
};

const getMenuItemsByRole = (role: string | undefined) => {
	switch (role) {
		case "admin":
			return [
				{ label: "Dashboard", href: "/admin" },
				{ label: "Manage Users", href: "/admin/users" },
			];
		case "instructor":
			return [
				{ label: "Dashboard", href: "/instructor" },
				{ label: "My Courses", href: "/instructor/courses" },
			];
		case "student":
		default:
			return [{ label: "My Courses", href: "/student" }];
	}
};

export default function UserAvatar({ data, isLoading }: UserAvatarProps) {
	const router = useRouter();
	const [loggedOut] = useLoggedOutMutation();
	const dispatch = useAppDispatch();
	const menuItems = getMenuItemsByRole(data?.role);

	const handleLogout = async () => {
		try {
			const res = await loggedOut({}).unwrap();

			if (res?.success) {
				dispatch(logout());
				await removeCookie();
				router.push("/");
				toast.success("Logged out successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						src={data?.avatar || "https://github.com/shadcn.png"}
						alt="User Photo"
					/>
					<AvatarFallback>
						{(data?.name || "US")?.substring(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			{isLoading && <p>Loading...</p>}
			<DropdownMenuContent className="min-w-[200px] px-3">
				<div className="flex flex-col items-center justify-center py-2">
					<Image
						src={data?.avatar || "https://github.com/shadcn.png"}
						height={50}
						width={50}
						alt="User Photo"
						className="size-[50px] rounded-full ring-1 ring-orange-shade-50"
					/>
					<p className="text-xl font-semibold mt-2">{data?.name}</p>

					<Link href="/dashboard/profile">
						<Button className="mt-2" size="sm">
							View Profile
						</Button>
					</Link>
				</div>
				<DropdownMenuSeparator />
				{menuItems.map((item, idx) => (
					<Link key={idx} href={item.href}>
						<DropdownMenuItem className="cursor-pointer">
							{item.label}
						</DropdownMenuItem>
					</Link>
				))}
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
