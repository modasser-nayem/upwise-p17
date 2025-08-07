"use client";

import { NavMain } from "./nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { commonRoutes, sidebar } from "./nav-links";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";

type UserRole = keyof typeof sidebar;

const isValidRole = (role: string | undefined): role is UserRole => {
	return ["admin", "student", "instructor", "guest"].includes(role as string);
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useAppSelector(selectedUser);

	const role: UserRole = isValidRole(user?.role) ? user?.role : "guest";
	const roleBasedRoutes = sidebar[role];
	const menuItems = [...roleBasedRoutes, ...commonRoutes];

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex items-center ">
				<Link href={"/"}>
					<Image
						src={"/logo.png"}
						width={100}
						height={100}
						alt="Logo"
					/>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={menuItems} role={role} />
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
