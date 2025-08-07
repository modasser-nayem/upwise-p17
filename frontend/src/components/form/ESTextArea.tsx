// components/form/ESTextarea.tsx
import React from "react";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type ESTextareaProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	rows?: number;
};

export default function ESTextarea<T extends FieldValues>({
	form,
	name,
	label,
	placeholder,
	rows = 4,
}: ESTextareaProps<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							placeholder={placeholder}
							rows={rows}
							{...field}
						/>
					</FormControl>
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	);
}
