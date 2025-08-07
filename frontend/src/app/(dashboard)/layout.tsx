import { AppSidebar } from "@/components/layouts/sidebar";
import Notification from "@/components/shared/notification";
import UserDropdown from "@/components/shared/user-dropdown";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<section className="py-2 w-full">
				<div className="flex items-center justify-between border-b h-16">
					<SidebarTrigger className="mb-2 mr-5" />
					<div className="flex items-center gap-x-10 pr-10">
						<Notification />
						<UserDropdown />
					</div>
				</div>
				<div className="p-5">{children}</div>
			</section>
		</SidebarProvider>
	);
}
