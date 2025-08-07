import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
type DashboardTableHeadingProps = {
	title: string;
	href: string;
	linkName: string;
};
export default function DashboardTableHeading({
	title,
	href,
	linkName,
}: DashboardTableHeadingProps) {
	return (
		<div className="flex items-center justify-between bg-white rounded-md p-5">
			<h4>{title}</h4>
			<Link href={href}>
				<Button>{linkName}</Button>
			</Link>
		</div>
	);
}
