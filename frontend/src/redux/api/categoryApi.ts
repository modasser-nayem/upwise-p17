import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TCategory } from "@/types/category.types";

const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// create category
		createCategory: builder.mutation<
			TServerResponse<TCategory>,
			Partial<TCategory>
		>({
			query: (payload) => ({
				url: "/categories",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["categories"],
		}),

		//get all categories
		allCategories: builder.query<
			TServerResponse<TCategory[]>,
			Record<string, string>
		>({
			query: (params) => ({
				url: "/categories",
				method: "GET",
				params: params,
			}),
			providesTags: ["categories"],
		}),
		categoryById: builder.query<TServerResponse<TCategory>, string>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: "GET",
			}),
			providesTags: ["categories"],
		}),
		categoryBySlug: builder.query<TServerResponse<TCategory[]>, string>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: "GET",
			}),
			providesTags: ["categories"],
		}),
		updateCategory: builder.mutation<
			TServerResponse<TCategory>,
			{ id: string; payload: Partial<TCategory> }
		>({
			query: ({ id, payload }) => ({
				url: `/categories/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["categories"],
		}),
		deleteCategory: builder.mutation<TServerResponse<TCategory[]>, string>({
			query: (id) => ({
				url: `/categories/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["categories"],
		}),
	}),
});

export const {
	useAllCategoriesQuery,
	useCreateCategoryMutation,
	useCategoryByIdQuery,
	useCategoryBySlugQuery,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApi;
