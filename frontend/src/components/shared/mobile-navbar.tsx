import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileNavbar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader className="sr-only">
					<SheetTitle>Edit profile</SheetTitle>
				</SheetHeader>
				<ul className="space-y-2 mt-5">
					<li>
						<Link href={"/"}>Home</Link>
					</li>
					<li>
						<Link href={"/courses"}>Courses</Link>
					</li>
					<li>
						<Link href={"/about-us"}>About Us</Link>
					</li>

					<li>
						<Link href={"/contact"}>Contact</Link>
					</li>
				</ul>
			</SheetContent>
		</Sheet>
	);
}
