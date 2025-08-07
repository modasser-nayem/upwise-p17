import React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import RatingStar from "../RatingStar";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type ESRatingProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	readOnly?: boolean;
	onChange: (value: number) => void;
};
export default function ESRating<T extends FieldValues>({
	form,
	name,
	label,
	readOnly,
	onChange,
}: ESRatingProps<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<RatingStar
							readOnly={readOnly}
							{...field}
							onChange={(val: number) => {
								field.onChange(val);
								onChange?.(val);
							}}
						/>
					</FormControl>
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	);
}
