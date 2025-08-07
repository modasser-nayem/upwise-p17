"use client";
import ESRating from "@/components/form/ESRating";
import ESTextarea from "@/components/form/ESTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateReviewSchema } from "@/form-schema";
import { useAppSelector } from "@/hooks";
import {
	useUpdateReviewMutation,
	useSingleReviewQuery,
} from "@/redux/api/reviewApi";
import { selectedUser } from "@/redux/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ReviewFormProps = {
	id: string;
	closeModal: () => void;
};

type UpdateReviewSchema = z.infer<typeof updateReviewSchema>;

export default function UpdateReview({ id, closeModal }: ReviewFormProps) {
	const { data: review, isLoading } = useSingleReviewQuery(id, { skip: !id });
	const [updateReview, { isLoading: updateLoading }] =
		useUpdateReviewMutation();
	const [rating, setRating] = useState<number>(0);
	const form = useForm<UpdateReviewSchema>({
		resolver: zodResolver(updateReviewSchema),
		defaultValues: {
			rating: review?.result?.rating || rating,
			message: review?.result?.message || "",
		},
	});
	const handleRating = (rate: number) => {
		setRating(rate);
	};

	const handleReviewUpdate = async (values: UpdateReviewSchema) => {
		try {
			const res = await updateReview({ id, payload: values }).unwrap();
			if (res.success) {
				toast.success("Review updated successfully");
				closeModal();
			}
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	useEffect(() => {
		if (review?.result) {
			form.reset({
				message: review?.result?.message,
				rating: review?.result?.rating,
			});
			setRating(review?.result?.rating);
		}
	}, [form, review?.result]);

	if (isLoading) return <p>Loading...</p>;
	return (
		<Form {...form}>
			<form
				className="space-y-5"
				onSubmit={form.handleSubmit(handleReviewUpdate)}
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

				<Button type="submit">
					{updateLoading ? "Updating..." : "Update Review"}
				</Button>
			</form>
		</Form>
	);
}
