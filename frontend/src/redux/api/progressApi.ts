import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";

type TCompleteLectureRequest = {
	lecId: string;
	payload: {
		student: string;
		course: string;
	};
};

const progressApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		completeLecture: builder.mutation<
			TServerResponse<void>,
			TCompleteLectureRequest
		>({
			query: ({ lecId, payload }) => ({
				url: `/progress/lecture/${lecId}`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["progress"],
		}),

		getProgressByCourseIdAndStudentId: builder.query({
			query: (courseId) => ({
				url: `/progress/course/${courseId}`,
				method: "GET",
			}),
			providesTags: ["progress"],
		}),
	}),
});

export const {
	useCompleteLectureMutation,
	useGetProgressByCourseIdAndStudentIdQuery,
} = progressApi;
