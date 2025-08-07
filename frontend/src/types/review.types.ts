import { TPopulatedCourse, TPopulatedUser } from ".";

export type TReviewRequest = {
	student: string;
	course: string;
	rating: number;
	message: string;
};

export type TReviewResponse = {
	_id: string;
	student: TPopulatedUser;
	course: TPopulatedCourse;
	rating: number;
	message: string;
	isDeleted: boolean;
	isAccepted: boolean;
};
