import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";

import { TCourseResponse, TCourseRequest } from "@/types/course.types";

const courseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//create course --- only admin can create course
		createCourse: builder.mutation<
			TServerResponse<TCourseResponse[]>,
			TCourseRequest
		>({
			query: (payload) => ({
				url: "/courses",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["courses"],
		}),

		allCourse: builder.query<
			TServerResponse<TCourseResponse[]>,
			Record<string, string>
		>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([Key, value]) => {
					if (value?.trim().length > 0) {
						params.append(Key, value);
					}
				});

				return {
					url: "/courses",
					method: "GET",
					params,
				};
			},
			providesTags: ["courses"],
		}),

		courseBySlug: builder.query<TServerResponse<TCourseResponse>, string>({
			query: (slug) => ({
				url: `/courses/by-slug/${slug}`,
				method: "GET",
			}),

			providesTags: ["courses"],
		}),

		courseById: builder.query<TServerResponse<TCourseResponse>, string>({
			query: (id) => ({
				url: `/courses/${id}`,
				method: "GET",
			}),
			providesTags: ["courses"],
		}),

		popularCourses: builder.query<TServerResponse<TCourseResponse[]>, void>(
			{
				query: () => {
					return {
						url: "/courses/popular-courses",
						method: "GET",
					};
				},
				providesTags: ["courses"],
			}
		),
		//create course --- only admin can create course
		updateCourse: builder.mutation<
			TServerResponse<TCourseResponse[]>,
			{ id: string; payload: Partial<TCourseRequest> }
		>({
			query: ({ id, payload }) => ({
				url: `/courses/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["courses"],
		}),

		deleteCourse: builder.mutation<
			TServerResponse<TCourseResponse>,
			string
		>({
			query: (id) => ({
				url: `/courses/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["courses"],
		}),

		courseByInstructor: builder.query<
			TServerResponse<TCourseResponse[]>,
			void
		>({
			query: () => ({
				url: "/courses/instructor/assigned-course",
				method: "GET",
			}),
			providesTags: ["courses"],
		}),
	}),
});

export const {
	useCreateCourseMutation,
	useAllCourseQuery,
	useCourseByIdQuery,
	useCourseBySlugQuery,
	useUpdateCourseMutation,
	useDeleteCourseMutation,

	useCourseByInstructorQuery,
} = courseApi;
