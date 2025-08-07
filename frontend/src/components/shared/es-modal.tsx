import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

type EsModalProps = {
	trigger: ReactNode;
	title: string;
	description?: string;
	children: (closeModal: () => void) => ReactNode;
	className?: string;
};

export default function EsModal({
	trigger,
	title,
	description = "Modal Description",
	children,
	className,
}: EsModalProps) {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (value: boolean) => setOpen(value);
	const closeModal = () => setOpen(false);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent
				className={cn(
					"w-full max-h-[80vh] overflow-y-auto md:max-w-5xl",
					className
				)}
			>
				<DialogHeader>
					<DialogTitle className="text-left">{title}</DialogTitle>
					{description && (
						<DialogDescription className="sr-only">
							{description}
						</DialogDescription>
					)}
				</DialogHeader>
				<div className="mt-4">{children(closeModal)}</div>
			</DialogContent>
		</Dialog>
	);
}
