"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import React, { useRef, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/shared/Container";
import { Clock } from "lucide-react";
import AppLoading from "@/app/loading";
import { useCourseBySlugQuery } from "@/redux/api/courseApi";
import { useMakePaymentMutation } from "@/redux/api/enrollmentApi";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EsModal from "@/components/shared/es-modal";
import ReviewForm from "./ReviewForm";
import { useGetByCourseIdQuery } from "@/redux/api/reviewApi";
import RatingStar from "@/components/RatingStar";
import NoDataFound from "@/components/NoDataFound";
import { useRouter } from "next/navigation";

type TRef = React.RefObject<HTMLDivElement>;

export default function CourseInformation({ slug }: { slug: string }) {
	const router = useRouter();
	const curriculumRef = useRef<HTMLDivElement>(null) as TRef;
	const reviewsRef = useRef<HTMLDivElement>(null) as TRef;
	const [activeTab, setActiveTab] = useState("curriculum");

	const user = useAppSelector(selectedUser);
	const [makePayment, { isLoading: paymentLoading }] =
		useMakePaymentMutation();
	const { data: course, isLoading } = useCourseBySlugQuery(slug);
	const courseId = course?.result?._id;
	const { data: reviews } = useGetByCourseIdQuery(courseId!, {
		skip: !courseId,
	});

	if (isLoading) return <AppLoading />;

	const handleEnrollment = async () => {
		//checking user logged-in or not
		if (!user?.id) {
			return router.push("/login");
		}
		//collecting data that is used to enroll course
		const data = {
			course: course?.result._id,
			student: user?.id,
			amount: course?.result?.price,
		};
		try {
			const res = await makePayment(data).unwrap();

			if (res?.result?.url) {
				window.location.href = res?.result?.url;
				toast.message("Redirecting to checkout page...");
			} else {
				toast.success("Enrolled successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message);
		}
	};
	const scrollToSection = (
		ref: React.RefObject<HTMLDivElement>,
		tabName: string
	) => {
		setActiveTab(tabName);
		ref.current?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<Container className="space-y-10 py-20">
			<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-10 pb-10 ">
				<div className="space-y-2">
					<h2 className="font-semibold text-gray-shade-15">
						{course?.result?.title}
					</h2>

					<p className="text-gray-shade-35 text-base lg:text-lg">
						{course?.result?.description}
					</p>

					<div className="flex items-center gap-x-3">
						<Avatar className="ring-1 ring-primary">
							<AvatarImage
								src={
									course?.result?.instructor?.avatar ||
									"https://github.com/evilrabbit.png"
								}
								alt="instructor-photo"
							/>
							<AvatarFallback>
								{course?.result?.instructor?.name}
							</AvatarFallback>
						</Avatar>

						<span className="font-semibold text-gray-shade-30">
							By {course?.result?.instructor?.name}
						</span>
					</div>
					<div className="flex items-center gap-x-5">
						<Button size={"lg"} onClick={handleEnrollment}>
							{paymentLoading ? "Loading" : "Enroll Now"}
						</Button>
						<p className="text-lg font-semibold font-geist-mono">
							&#2547;{course?.result?.price}
						</p>
					</div>
				</div>
				<div className="rounded-md overflow-hidden">
					<Image
						src={course?.result?.thumbnail || ""}
						height={500}
						width={1200}
						alt="advanced-Javascript"
						className="w-full h-[230px] md:h-[320px] rounded-md overflow-hidden"
					/>
				</div>
			</div>

			<div className="flex items-center justify-center gap-x-5 sticky top-0 shadow  bg-white px-5 py-3 rounded-md mb-5">
				<Button
					variant={"secondary"}
					size={"sm"}
					onClick={() => scrollToSection(curriculumRef, "curriculum")}
					className={cn(
						activeTab === "curriculum"
							? "text-primary ring-1 ring-primary"
							: "ring-1"
					)}
				>
					Curriculum
				</Button>
				<Button
					variant={"secondary"}
					size={"sm"}
					onClick={() => scrollToSection(reviewsRef, "reviews")}
					className={cn(
						activeTab === "reviews"
							? "text-primary ring-1 ring-primary"
							: "ring-1"
					)}
				>
					Reviews
				</Button>
			</div>
			<div ref={curriculumRef}>
				<h5 className="text-gray-shade-30 font-semibold text-center">
					Curriculum
				</h5>
				<Accordion
					type="single"
					collapsible
					className="mt-5 space-y-4 max-w-xl mx-auto"
				>
					{course?.result?.modules.map((mod) => (
						<AccordionItem
							key={mod._id}
							value={mod._id}
							className="p-5 bg-white rounded-md border"
						>
							<AccordionTrigger className="hover:no-underline text-base font-medium p-0">
								<div className="flex items-center gap-5">
									<div className="flex flex-col items-center justify-center bg-orange-shade-90 p-2 rounded-md text-sm text-gray-shade-20">
										<span>Module</span>
										<span>{mod.index}</span>
									</div>
									<p className="text-left text-gray-shade-20">
										{mod.title}
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent className="py-3 px-1 text-gray-shade-30 space-y-3">
								{mod.lectures.map((lec, index) => (
									<div
										key={lec._id}
										className="px-4 py-5 bg-white border flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 rounded-md hover:ring-orange-shade-80 hover:ring-1 group"
									>
										<div>
											<p className="font-medium text-xl text-gray-shade-20">
												{lec.title}
											</p>
											<p className="text-gray-shade-35">
												Lesson {index + 1}
											</p>
										</div>
										<span className="bg-white-shade-97 px-3 py-2 inline-flex items-center gap-x-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30 rounded-md">
											<Clock size={16} />
											{lec.duration}
										</span>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>

			<div
				ref={reviewsRef}
				className="bg-white  rounded-md max-w-4xl mx-auto"
			>
				<div className="md:flex items-center md:justify-between space-y-5 md:space-y-0 border-b p-5">
					<h5 className="text-gray-shade-30 font-semibold">
						Reviews
					</h5>
					<EsModal
						title="Write a review"
						className="w-[400px]"
						trigger={
							<Button
								variant={"outline"}
								className="text-primary"
							>
								Write a review
							</Button>
						}
					>
						{(closeModal) => (
							<ReviewForm
								userId={user?.id}
								courseId={course?.result?._id as string}
								closeModal={closeModal}
							/>
						)}
					</EsModal>
				</div>
				{reviews?.result.length === 0 && (
					<NoDataFound message="This course has no reviews yet. Be the first one to write a review." />
				)}
				<div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-10">
					{reviews?.result?.map((review, index) => (
						<div
							key={review._id}
							className={cn(
								"space-y-2",
								index % 2 === 0 ? "border-r" : ""
							)}
						>
							<div className="space-y-1">
								<RatingStar
									readOnly={true}
									initialRating={review.rating}
								/>
								<p className="text-gray-shade-30  tracking-wide italic">
									<q>{review.message}</q>
								</p>
							</div>

							<p className="mt-4 font-semibold">
								By - {review?.student?.name}
							</p>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}
