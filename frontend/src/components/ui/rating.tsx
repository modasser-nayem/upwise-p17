"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
	totalStars?: number;
	initialRating?: number;
	readOnly?: boolean;
	onChange?: (rating: number) => void;
}

export default function Rating({
	totalStars = 5,
	initialRating = 0,
	readOnly = false,
	onChange,
}: StarRatingProps) {
	const [hovered, setHovered] = useState<number | null>(null);
	const [rating, setRating] = useState(initialRating);

	const handleClick = (index: number) => {
		if (readOnly) return;
		setRating(index);
		onChange?.(index);
	};

	const handleMouseEnter = (index: number) => {
		if (readOnly) return;
		setHovered(index);
	};

	const handleMouseLeave = () => {
		if (readOnly) return;
		setHovered(null);
	};

	return (
		<div className="flex items-center space-x-1">
			{Array.from({ length: totalStars }, (_, i) => {
				const index = i + 1;
				const isFilled = hovered ? index <= hovered : index <= rating;

				return (
					<Star
						key={index}
						className={cn(
							"w-6 h-6  transition-colors duration-150",
							isFilled
								? "fill-yellow-400 text-yellow-400"
								: "text-gray-300",
							readOnly ? "cursor-default" : "cursor-pointer"
						)}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
						onClick={() => handleClick(index)}
					/>
				);
			})}
		</div>
	);
}
