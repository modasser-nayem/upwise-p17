import React from "react";
import Wrapper from "./wrapper";
import Container from "@/components/shared/Container";

export default async function WatchVideo({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;

	const data = {
		courseId: slug[0],
		type: slug[1],
		lectureId: slug[2],
	};

	return (
		<Container className="pt-10">
			<Wrapper data={data} />
		</Container>
	);
}
