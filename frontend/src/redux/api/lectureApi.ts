import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TLectureRequest, TLectureResponse } from "@/types/lecture.types";

const lectureApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			{ moduleId: string; payload: TLectureRequest }
		>({
			query: ({ moduleId, payload }) => ({
				url: `/lectures/${moduleId}/create`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["lectures"],
		}),
		allLectures: builder.query<
			TServerResponse<TLectureResponse[]>,
			Record<string, string>
		>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([key, value]) => {
					if (value.trim().length > 0) {
						params.append(key, value);
					}
				});
				return {
					url: "/lectures",
					method: "GET",
					params,
				};
			},
			providesTags: ["lectures"],
		}),
		lectureById: builder.query<TServerResponse<TLectureResponse>, string>({
			query: (id) => ({
				url: `/lectures/${id}`,
				method: "GET",
			}),
			providesTags: ["lectures"],
		}),
		updateLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			{ id: string; payload: Partial<TLectureRequest> }
		>({
			query: ({ id, payload }) => ({
				url: `/lectures/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["lectures"],
		}),
		deleteLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			string
		>({
			query: (id) => ({
				url: `/lectures/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["lectures"],
		}),

		assignedLectures: builder.query<
			TServerResponse<TLectureResponse[]>,
			Record<string, string>
		>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([key, value]) => {
					if (value.trim().length > 0) {
						params.append(key, value);
					}
				});
				return {
					url: "/lectures/assigned-lectures",
					method: "GET",
					params,
				};
			},
			providesTags: ["lectures"],
		}),
	}),
});

export const {
	useAllLecturesQuery,
	useCreateLectureMutation,
	useLectureByIdQuery,
	useDeleteLectureMutation,
	useUpdateLectureMutation,

	useAssignedLecturesQuery,
} = lectureApi;
