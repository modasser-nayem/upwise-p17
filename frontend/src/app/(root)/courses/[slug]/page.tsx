import React, { Suspense } from "react";
import CourseInformation from "./course-information";
import AppLoading from "@/app/loading";

export default async function CourseDetails({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<Suspense fallback={<AppLoading />}>
			<CourseInformation slug={slug} />
		</Suspense>
	);
}
