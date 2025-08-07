import { cn } from "@/lib/utils";
import React from "react";

type TContainerProps = {
	children: React.ReactNode;
	className?: string;
};
export default function Container({ children, className }: TContainerProps) {
	return (
		<section className={cn("container mx-auto", className)}>
			{children}
		</section>
	);
}
