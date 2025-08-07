"use client";

import { ChevronRight } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { TLink } from "./nav-links";
import Link from "next/link";
import React from "react";
type NavMainProps = {
	items: TLink[];
	role: string;
};
export function NavMain({ items, role }: NavMainProps) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="capitalize">{role}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					return (
						<React.Fragment key={item.name}>
							{item.name && item.url ? (
								<SidebarMenuItem>
									<Link href={item.url}>
										<SidebarMenuButton tooltip={item.name}>
											{item?.icon && <item.icon />}
											{item.name}
										</SidebarMenuButton>
									</Link>
								</SidebarMenuItem>
							) : (
								<Collapsible
									key={item.name}
									asChild
									defaultOpen={item.isActive}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												tooltip={item?.name}
											>
												{item.icon && <item.icon />}

												{item.name}
												{item.children && (
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												)}
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item?.children?.map(
													(subItem) => (
														<SidebarMenuSubItem
															key={subItem.name}
														>
															<SidebarMenuSubButton
																asChild
															>
																<Link
																	href={
																		subItem.url
																	}
																>
																	<span>
																		{
																			subItem.name
																		}
																	</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													)
												)}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							)}
						</React.Fragment>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
