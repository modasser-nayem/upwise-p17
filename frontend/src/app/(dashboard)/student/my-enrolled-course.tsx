"use client";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useMyEnrollmentsQuery } from "@/redux/api/enrollmentApi";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MyEnrolledCourses() {
	const { data: myEnrollment, isLoading } = useMyEnrollmentsQuery();

	if (isLoading) return <AppLoading />;
	return (
		<div className="space-y-5">
			{myEnrollment?.result.length ? (
				myEnrollment?.result?.map((data) => (
					<div
						key={data?._id}
						className="p-5 md:p-10  bg-white rounded-md grid grid-cols-1 md:grid-cols-5 gap-10"
					>
						<Image
							src={data?.course?.thumbnail}
							alt="course-thumbnail"
							height={400}
							width={400}
							className="col-span-full md:col-span-2 w-full h-[220px] md:h-[250px] rounded-md overflow-hidden shadow-md "
						/>
						<div className="col-span-full md:col-span-3">
							<h4 className="font-semibold text-gray-shade-15">
								{data?.course?.title}
							</h4>
							<div className="flex items-center justify-between">
								<p className="font-medium text-gray-shade-35">
									By {data?.course?.instructor?.name}
								</p>
								<p className="font-medium text-gray-shade-20">
									{data?.progress?.progress}%
								</p>
							</div>
							<Progress
								max={100}
								value={data?.progress?.progress}
								className="my-4 bg-gray-shade-70"
							/>
							<Link
								href={`/watch/${data?.course?._id}/${data?.progress?.lastWatchedLecture?.type}/${data?.progress?.lastWatchedLecture?._id}`}
							>
								<Button>Continue Course</Button>
							</Link>
						</div>
					</div>
				))
			) : (
				<NoDataFound message="You have not enrolled any course yet" />
			)}
		</div>
	);
}
