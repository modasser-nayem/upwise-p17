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
import { usePathname } from "next/navigation";
type NavMainProps = {
   items: TLink[];
   role: string;
};
export function NavMain({ items, role }: NavMainProps) {
   const pathname = usePathname();

   return (
      <SidebarGroup>
         <SidebarGroupLabel className="capitalize text-base pb-2">
            {role}
         </SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => {
               return (
                  <React.Fragment key={item.name}>
                     {item.name && item.url ? (
                        <SidebarMenuItem>
                           <Link href={item.url}>
                              <SidebarMenuButton
                                 className={`${
                                    pathname === item.url
                                       ? "bg-primary text-primary-foreground"
                                       : ""
                                 } hover:bg-primary hover:text-primary-foreground`}
                                 tooltip={item.name}
                              >
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
                              <CollapsibleTrigger
                                 asChild
                                 className="hover:bg-primary hover:text-primary-foreground"
                              >
                                 <SidebarMenuButton tooltip={item?.name}>
                                    {item.icon && <item.icon />}

                                    {item.name}
                                    {item.children && (
                                       <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    )}
                                 </SidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                 <SidebarMenuSub>
                                    {item?.children?.map((subItem) => (
                                       <SidebarMenuSubItem key={subItem.name}>
                                          <SidebarMenuSubButton
                                             asChild
                                             className={`${
                                                pathname === subItem.url
                                                   ? "bg-primary text-primary-foreground"
                                                   : ""
                                             } hover:bg-primary hover:text-primary-foreground`}
                                          >
                                             <Link href={subItem.url}>
                                                <span>{subItem.name}</span>
                                             </Link>
                                          </SidebarMenuSubButton>
                                       </SidebarMenuSubItem>
                                    ))}
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
