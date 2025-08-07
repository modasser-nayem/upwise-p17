"use client";

import React from "react";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
	CldUploadWidget,
	CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { config } from "@/config";

type ESImageUploadProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
};

export default function ESImageUpload<T extends FieldValues>({
	form,
	name,
	label,
}: ESImageUploadProps<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="flex items-center gap-4">
							{field.value ? (
								<Image
									src={field.value}
									width={100}
									height={100}
									alt="Uploaded"
									className="h-24 w-24 rounded-md  object-cover ring-1 ring-primary"
								/>
							) : (
								<div className="size-24 rounded-md ring-1 ring-primary"></div>
							)}
							<CldUploadWidget
								uploadPreset={config.cloud_upload_preset!}
								onSuccess={(
									result: CloudinaryUploadWidgetResults
								) => {
									if (
										typeof result.info === "object" &&
										"secure_url" in result.info
									) {
										field.onChange(result.info.secure_url);
									}
								}}
							>
								{({ open }) => (
									<Button
										type="button"
										variant="secondary"
										onClick={() => open()}
									>
										Upload Image
									</Button>
								)}
							</CldUploadWidget>
						</div>
					</FormControl>
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	);
}
