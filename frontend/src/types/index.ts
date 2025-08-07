export type TServerResponse<T> = {
	success: boolean;
	message: string;
	result: T;
	meta?: TMeta;
};
type TMeta = {
	currentPage: number;
	totalPages: number;
	totalDocs: number;
};
export type TPopulatedUser = {
	name: string;
	_id: string;
};

export type TPopulatedCourse = {
	title: string;
	_id: string;
};
