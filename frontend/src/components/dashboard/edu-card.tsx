import React, { ReactElement } from "react";
import { Card, CardContent } from "../ui/card";
type TEduCard = {
	count: number;
	icon: ReactElement;
	tag: string;
	className: string;
};
export default function EduCard({ count, icon, tag, className }: TEduCard) {
	return (
		<Card className={className}>
			<CardContent className="p-5 flex flex-col items-center justify-center ">
				<span className="size-20 shadow-md rounded-full inline-flex place-content-center place-items-center">
					{icon}
				</span>
				<h6 className="mt-3 mb-2">{count}</h6>
				{tag}
			</CardContent>
		</Card>
	);
}
