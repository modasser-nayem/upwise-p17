import React from "react";

type PageHeadingProps = {
	data: {
		title: string;
		description: string;
	};
};

export default function PageHeading({ data }: PageHeadingProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-20 pb-10 border-b">
			<h2 className="pt-3 text-gray-shade-15 font-semibold">
				{data.title}
			</h2>
			<p className="text-gray-shade-35 text-lg">{data.description}</p>
		</div>
	);
}
