import { TLectureResponse } from "./lecture.types";

export type TModuleRequest = {
	title: string;
	course: string;
};

type TCourse = {
	_id: string;
	title: string;
};
export type TModuleResponse = {
	_id: string;
	title: string;
	index: number;
	course: TCourse;
	lectures: TLectureResponse[];
	isDeleted: boolean;
};
