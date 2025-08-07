"use client";
import { Book, GraduationCap, Landmark, Speech } from "lucide-react";
import EduCard from "./edu-card";
import { useGeneralInformationQuery } from "@/redux/api/meta-data";
import AppLoading from "@/app/loading";
export default function GeneralInformation() {
	const { data, isLoading } = useGeneralInformationQuery(undefined);

	if (isLoading) return <AppLoading />;
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 bg-white-shade-99 rounded-md p-5 lg:p-8">
			<EduCard
				icon={<GraduationCap />}
				count={data?.result?.students}
				className="bg-blue-200"
				tag="Total Students"
			/>
			<EduCard
				icon={<Book />}
				count={data?.result?.courses}
				className="bg-green-200"
				tag="Total Courses"
			/>
			<EduCard
				icon={<Landmark />}
				count={data?.result?.earnings}
				className="bg-pink-200"
				tag="Total Earnings"
			/>
			<EduCard
				icon={<Speech />}
				count={data?.result?.instructors}
				className="bg-amber-200"
				tag="Total Instructor"
			/>
		</div>
	);
}
