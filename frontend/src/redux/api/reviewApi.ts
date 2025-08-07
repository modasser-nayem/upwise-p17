import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TReviewRequest, TReviewResponse } from "@/types/review.types";

type TUpdateReviewRequest = {
	id: string;
	payload: {
		rating: number;
		message: string;
	};
};

const reviewApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			TReviewRequest
		>({
			query: (payload) => ({
				url: "/reviews",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["reviews"],
		}),
		allReviews: builder.query<
			TServerResponse<TReviewResponse[]>,
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
					url: "/reviews",
					method: "GET",
					params,
				};
			},
			providesTags: ["reviews"],
		}),

		singleReview: builder.query<TServerResponse<TReviewResponse>, string>({
			query: (id) => ({
				url: `/reviews/${id}`,
				method: "GET",
			}),
			providesTags: ["reviews"],
		}),

		getByCourseId: builder.query<
			TServerResponse<TReviewResponse[]>,
			string
		>({
			query: (courseId) => ({
				url: `/reviews/${courseId}/course-review`,
				method: "GET",
			}),
			providesTags: ["reviews"],
		}),
		deleteReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			string
		>({
			query: (id) => ({
				url: `/reviews/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["reviews"],
		}),
		acceptReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			string
		>({
			query: (id) => ({
				url: `/reviews/${id}/accept`,
				method: "PATCH",
			}),
			invalidatesTags: ["reviews"],
		}),

		undoAccept: builder.mutation<TServerResponse<TReviewResponse>, string>({
			query: (id) => ({
				url: `/reviews/${id}/undo-accept`,
				method: "PATCH",
			}),
			invalidatesTags: ["reviews"],
		}),

		updateReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			TUpdateReviewRequest
		>({
			query: ({ id, payload }) => ({
				url: `/reviews/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["reviews"],
		}),
	}),
});

export const {
	useCreateReviewMutation,
	useAllReviewsQuery,
	useSingleReviewQuery,
	useGetByCourseIdQuery,
	useDeleteReviewMutation,
	useAcceptReviewMutation,
	useUndoAcceptMutation,
	useUpdateReviewMutation,
} = reviewApi;
