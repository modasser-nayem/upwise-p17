import { TModuleResponse } from "./module.types";

type TInstructor = {
	_id: string;
	name: string;
	avatar: string;
};
type TCategory = {
	_id: string;
	name: string;
};

type TPricingType = "paid" | "free";
type TLevel = "Beginner" | "Intermediate" | "Expert";

export type TCourseRequest = {
	title: string;
	thumbnail: string;
	shortVideo?: string;
	level: TLevel;
	duration: string;
	description: string;
	pricingType: TPricingType;
	price: number;
	category: string;
	instructor: string;
};

export type TCourseResponse = {
	_id: string;
	title: string;
	thumbnail: string;
	shortVideo?: string;
	level: TLevel;
	duration: string;
	description: string;
	pricingType: TPricingType;
	price: number;
	rating: number;
	isDeleted: boolean;
	category: TCategory;
	instructor: TInstructor;
	slug: string;
	modules: TModuleResponse[];
	createdAt: string;
	updatedAt: string;
};
