import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
interface ModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	children: React.ReactNode;
	triggerText?: string;
	hideTrigger?: boolean;
}

export default function Modal({
	isOpen,
	onOpenChange,
	title,
	description,
	children,
	triggerText,
	hideTrigger = false,
}: ModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			{!hideTrigger && (
				<DialogTrigger asChild>
					<Button variant={"outline"} size={"sm"}>
						{triggerText}
					</Button>
				</DialogTrigger>
			)}
			<DialogContent>
				{title || description ? (
					<VisuallyHidden>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</VisuallyHidden>
				) : (
					<VisuallyHidden>
						<DialogTitle className="sr-only">Modal</DialogTitle>

						<DialogDescription className="sr-only">
							Modal Description
						</DialogDescription>
					</VisuallyHidden>
				)}
				{children}
			</DialogContent>
		</Dialog>
	);
}
