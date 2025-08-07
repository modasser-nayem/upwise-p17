export type TMyEnrollmentResponse = {
	_id: string;
	student: string;
	course: Course;
	status: string;
	progress: Progress;
	enrolledAt: string;
	createdAt: string;
	updatedAt: string;
};

interface Course {
	_id: string;
	title: string;
	thumbnail: string;
	instructor: {
		name: string;
		_id: string;
	};
}

interface Progress {
	_id: string;
	progress: number;
	lastWatchedLecture: LastWatchedLecture;
}

interface LastWatchedLecture {
	_id: string;
	type: string;
}
