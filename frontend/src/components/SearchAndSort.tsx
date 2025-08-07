import React from "react";
import { Input } from "./ui/input";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "./ui/select";
type SearchAndSortProps = {
	setSearch: (value: React.SetStateAction<string>) => void;
	setOrder: (value: React.SetStateAction<string>) => void;
	placeholder: string;
	selectValue: string;
};
export default function SearchAndSort({
	setSearch,
	setOrder,
	placeholder,
	selectValue,
}: SearchAndSortProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
			<Input
				type="text"
				placeholder={placeholder}
				className="ring-1 ring-primary"
				onChange={(e) => setSearch(e.target.value)}
			/>

			<Select onValueChange={(value) => setOrder(value)}>
				<SelectTrigger>
					<SelectValue placeholder={selectValue} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="asc">ASC</SelectItem>
					<SelectItem value="desc">DESC</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
