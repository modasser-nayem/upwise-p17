import ESRating from "@/components/form/ESRating";
import ESTextarea from "@/components/form/ESTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createReviewSchema } from "@/form-schema";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ReviewFormProps = {
	userId?: string;
	courseId: string;
	closeModal: () => void;
};

type ReviewForm = z.infer<typeof createReviewSchema>;
export default function ReviewForm({ userId, courseId }: ReviewFormProps) {
	const router = useRouter();

	const [createReview] = useCreateReviewMutation();
	const [rating, setRating] = useState<number>(0);
	const form = useForm<ReviewForm>({
		resolver: zodResolver(createReviewSchema),
		defaultValues: {
			course: courseId,
			student: userId,
			rating: rating,
			message: "",
		},
	});
	const handleRating = (rate: number) => {
		setRating(rate);
	};

	const handleReviewSubmit = async (values: ReviewForm) => {
		if (!userId) {
			return router.push("/login");
		}
		try {
			const res = await createReview(values).unwrap();
			if (res.success) {
				toast.success("Thank you for your review");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message);
		}
	};
	return (
		<Form {...form}>
			<form
				className="space-y-5"
				onSubmit={form.handleSubmit(handleReviewSubmit)}
			>
				<ESRating
					form={form}
					name="rating"
					label="Choose rating"
					onChange={handleRating}
				/>
				<ESTextarea
					form={form}
					name="message"
					label="Message"
					placeholder="Write something about this course..."
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
