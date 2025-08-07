"use client";
import AppLoading from "@/app/loading";
import { useCourseByIdQuery } from "@/redux/api/courseApi";
import React, { useEffect, useState } from "react";

import {
	ArrowLeftCircle,
	CircleCheck,
	Lock,
	Search,
	Video,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import {
	useCompleteLectureMutation,
	useGetProgressByCourseIdAndStudentIdQuery,
} from "@/redux/api/progressApi";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { TLectureResponse } from "@/types/lecture.types";
import { toast } from "sonner";

type TWrapperProps = {
	data: {
		courseId: string;
		type: string;
		lectureId: string;
	};
};

export default function Wrapper({ data }: TWrapperProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<TLectureResponse[]>([]);
	const [currentModuleTitle, setCurrentModuleTitle] = useState<string>("");
	const [currentModuleProgress, setCurrentModuleProgress] = useState({
		current: 0,
		total: 0,
	});
	const router = useRouter();
	const user = useAppSelector(selectedUser);
	const [completeLecture] = useCompleteLectureMutation();
	const { data: course, isLoading } = useCourseByIdQuery(data.courseId);
	const { data: courseProgress } = useGetProgressByCourseIdAndStudentIdQuery(
		course?.result?._id,
		{ skip: !course?.result?._id }
	);
	const completedLectures = Array.isArray(
		courseProgress?.result?.completedLectures
	)
		? courseProgress.result.completedLectures
		: [];

	const [currentLecture, setCurrentLecture] = useState<TLectureResponse>(
		{} as TLectureResponse
	);

	useEffect(() => {
		if (!course?.result) return;

		for (const mod of course?.result?.modules) {
			const found = mod?.lectures.find(
				(lec) => lec._id === data.lectureId
			);
			if (found) {
				setCurrentLecture(found);
				setCurrentModuleTitle(mod.title);

				const currentLecIndex = mod.lectures.findIndex(
					(l) => l._id === data.lectureId
				);
				setCurrentModuleProgress({
					current: currentLecIndex + 1,
					total: mod.lectures.length,
				});
				break;
			}
		}
	}, [data.lectureId, course]);

	const getFlatLectureList = () => {
		const flatList = [];
		if (course?.result) {
			for (const mod of course?.result?.modules) {
				for (const lec of mod.lectures) {
					flatList.push({
						...lec,
						moduleId: mod._id,
						moduleIndex: mod?.index,
					});
				}
			}
			return flatList;
		}
	};

	const flatLectures = getFlatLectureList();

	const currentIndex = flatLectures?.findIndex(
		(lec) => lec._id === data.lectureId
	);
	const isFirst = currentIndex === 0; // this is for disabling previous button

	const markAndGoToLecture = async (offset: number) => {
		const flatLectures = getFlatLectureList();
		const currentIndex = flatLectures?.findIndex(
			(lec) => lec._id === data.lectureId
		);

		const nextLecture = flatLectures
			? flatLectures[(currentIndex as number) + offset]
			: null;

		try {
			// 1. First, mark the current lecture complete
			await completeLecture({
				lecId: data.lectureId,
				payload: {
					student: user?.id as string,
					course: course?.result._id as string,
				},
			}).unwrap();

			// 2. Now, navigate based on whether nextLecture exists
			if (nextLecture && nextLecture._id && nextLecture.type) {
				router.push(
					`/watch/${data.courseId}/${nextLecture.type}/${nextLecture._id}`
				);
			} else {
				// ✅ Only go here if there's no valid nextLecture
				toast.error("You have completed the course");
				router.push(`/watch/${data.courseId}/locked`);
			}
		} catch (error) {
			alert("You have completed the course");
			console.log(error);
		}
	};

	const goBack = () => {
		router.push("/student");
	};
	if (isLoading) return <AppLoading />;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden gap-10">
			<div className="col-span-full lg:col-span-3">
				<div>
					<h4 className="mb-2 px-2 flex items-center gap-x-2">
						<span onClick={goBack} className="cursor-pointer">
							<ArrowLeftCircle className="text-primary" />
						</span>
						{currentLecture.title}
					</h4>
					<div
						className={`rounded-md h-[350px] lg:h-[450px] border ${
							currentLecture.type === "video"
								? "overflow-hidden"
								: "overflow-y-auto"
						}`}
					>
						{currentLecture.type === "video" ? (
							<ReactPlayer
								height={"100%"}
								width={"100%"}
								style={{ borderRadius: "20px" }}
								url={currentLecture?.content}
								controls={true}
							/>
						) : (
							<div
								className="p-10 max-h-full"
								dangerouslySetInnerHTML={{
									__html: currentLecture.content,
								}}
							></div>
						)}
					</div>
				</div>
				<div className="flex justify-between lg:justify-end items-center lg:gap-x-10 mt-3">
					<Button
						size={"sm"}
						onClick={() => markAndGoToLecture(-1)}
						disabled={isFirst}
					>
						Previous
					</Button>
					<Button size={"sm"} onClick={() => markAndGoToLecture(1)}>
						Next
					</Button>
				</div>
			</div>

			<div className="col-span-full lg:col-span-2 bg-gray-200 rounded-md p-4 space-y-3 relative">
				<div className="relative">
					<div className="flex items-center justify-between mb-5">
						<p className="font-medium text-sm text-gray-shade-40">
							Running Module: {currentModuleTitle}
						</p>
						<p className="text-sm text-gray-500">
							{currentModuleProgress.current}/
							{currentModuleProgress.total}
						</p>
					</div>

					{/* Search input */}
					<div className="flex items-center hover:ring-1 hover:ring-primary bg-white rounded-lg py-1 px-4">
						<Search />
						<input
							type="text"
							className="w-full outline-none p-2"
							placeholder="Search lecture..."
							value={searchTerm}
							onChange={(e) => {
								const term = e.target.value;
								setSearchTerm(term);
								if (term.trim().length > 0) {
									const flatLectures = getFlatLectureList();
									const filtered = flatLectures?.filter(
										(lec) =>
											lec.title
												.toLowerCase()
												.includes(term.toLowerCase())
									);
									setSearchResults(filtered || []);
								} else {
									setSearchResults([]);
								}
							}}
						/>
					</div>

					{/* Search results */}
					{searchTerm && (
						<div className="absolute w-full mt-1 max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md z-50">
							{searchResults.length > 0 ? (
								searchResults.map((lec) => {
									const isCompleted =
										completedLectures.includes(lec?._id);
									return (
										<div
											key={lec._id}
											className="flex items-center gap-x-2"
										>
											{isCompleted ? (
												<Link
													href={`/watch/${data.courseId}/${lec.type}/${lec._id}`}
													onClick={() => {
														setSearchTerm("");
														setSearchResults([]);
													}}
													className="min-w-full"
												>
													<p className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-x-2">
														<CircleCheck
															className="text-green-500"
															size={16}
														/>
														{lec.title}
													</p>
												</Link>
											) : (
												<p className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-x-2 min-w-full">
													<Lock
														className="text-primary"
														size={16}
													/>
													{lec.title}
												</p>
											)}
										</div>
									);
								})
							) : (
								<p className="text-sm text-gray-500 px-4 py-2">
									No lectures found.
								</p>
							)}
						</div>
					)}
				</div>

				{/* module section  */}
				<div className="bg-white px-4 py-2 rounded-md max-h-[500px] overflow-y-auto">
					{course?.result?.modules.map((mod) => (
						<Accordion
							type="single"
							collapsible
							key={mod._id}
							className="w-full shadow-lg px-2 bg-white rounded-md mb-2"
						>
							<AccordionItem value={mod.title}>
								<AccordionTrigger className="text-base no-underline hover:no-underline">
									{mod.title}
								</AccordionTrigger>
								<AccordionContent>
									{mod?.lectures?.map((lec) => {
										const isCompleted =
											completedLectures.includes(lec._id);

										return (
											<div
												key={lec._id}
												className="flex items-center gap-x-2 border-b"
											>
												{isCompleted ? (
													<CircleCheck className="text-green-500" />
												) : (
													<Lock className="text-primary" />
												)}
												{isCompleted ? (
													<Link
														href={`/${data.courseId}/video/${lec?._id}`}
														className="w-full"
													>
														<p className="my-1 font-medium">
															{lec.title} <br />
															<span className="flex items-center gap-x-2 text-gray-shade-40 font-light">
																<Video />
																{
																	lec.duration
																}{" "}
																Min
															</span>
														</p>
													</Link>
												) : (
													<p className="my-1 font-medium">
														{lec.title} <br />
														<span className="flex items-center gap-x-2 text-gray-shade-40 font-light">
															<Video />
															{lec.duration} Min
														</span>
													</p>
												)}
											</div>
										);
									})}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</div>
		</div>
	);
}
