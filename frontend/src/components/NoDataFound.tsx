import React from "react";
import { MessageSquareOff } from "lucide-react";

type NoDataFoundProps = {
	message: string;
};
export default function NoDataFound({ message }: NoDataFoundProps) {
	return (
		<div className="h-52 flex flex-col items-center justify-center gap-3">
			<div className="size-24 bg-orange-shade-90 flex items-center justify-center rounded-full">
				<MessageSquareOff size={48} className="text-orange-shade-50" />
			</div>
			<p className="text-gray-shade-30 ">{message}</p>
		</div>
	);
}
