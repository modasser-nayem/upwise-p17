type TCourseDetails = {
	_id: string;
	title: string;
};
type TModule = {
	_id: string;
	title: string;
	course: TCourseDetails;
};

export type TLectureRequest = {
	title: string;
	type: string;
	content: string;
	duration: number;
	module: string;
};
export type TLectureResponse = {
	_id: string;
	title: string;
	type: string;
	duration: number;
	content: string;
	module: TModule;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
};
