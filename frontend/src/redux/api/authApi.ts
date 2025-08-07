import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// register/create a new account
		createAccount: builder.mutation({
			query: (payload) => ({
				url: "/auth/register",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),

		// login
		loginToAccount: builder.mutation({
			query: (payload) => ({
				url: "/auth/login",
				method: "POST",
				body: payload,
			}),
		}),

		//change password
		changePassword: builder.mutation({
			query: (payload) => ({
				url: `/auth/change-password`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),

		loggedOut: builder.mutation({
			query: () => ({
				url: "/auth/logged-out",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useCreateAccountMutation,
	useLoginToAccountMutation,
	useChangePasswordMutation,
	useLoggedOutMutation,
} = authApi;
