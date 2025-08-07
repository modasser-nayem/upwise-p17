import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{[
				Array(4).map((_, index) => (
					<div className="flex items-center space-x-4" key={index}>
						<Skeleton className="h-auto md:h-[200px] w-full rounded-t-md rounded-b-none overflow-hidden" />
						<div className="flex  items-center justify-between gap-2 text-sm py-2 px-4 border-b">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>

						<div className="p-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-6 w-full" />
						</div>
					</div>
				)),
			]}
		</div>
	);
}
