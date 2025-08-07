import { cn } from "@/lib/utils";
import React from "react";
type GeometricBackgroundProps = {
	children: React.ReactNode;
	className?: string;
};
export default function GeometricBackground({
	children,
	className,
}: GeometricBackgroundProps) {
	return (
		<div className={cn("h-auto w-full relative", className)}>
			<div
				className="absolute inset-0 -z-20"
				style={{
					backgroundImage: `
        linear-gradient(to right, #ffeacc 1px, transparent 1px),
        linear-gradient(to bottom, #ffeacc 1px, transparent 1px),
        radial-gradient(circle 350px at 50% 50%, #ffd599, transparent)
      `,
					backgroundSize: "120px 120px, 120px 120px, 100% 100%",
				}}
			/>
			{children}
		</div>
	);
}
