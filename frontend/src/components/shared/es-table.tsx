import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";

type Column<T> = {
	key: keyof T | string;
	label: string;
	render?: (item: T) => React.ReactNode;
	className?: string;
};

type Props<T> = {
	columns: Column<T>[];
	data: T[];
	rowKey: (item: T) => string;
};

export function ESTable<T>({ columns, data, rowKey }: Props<T>) {
	return (
		<Table className="bg-white p-5 rounded-md mt-5">
			<TableHeader>
				<TableRow>
					{columns.map((col) => (
						<TableHead
							key={col.key as string}
							className={col.className}
						>
							{col.label}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>

			<TableBody>
				{data.map((item) => (
					<TableRow key={rowKey(item)}>
						{columns.map((col) => (
							<TableCell key={col.key as string}>
								{col.render
									? col.render(item)
									: (item[
											col.key as keyof T
									  ] as React.ReactNode)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
