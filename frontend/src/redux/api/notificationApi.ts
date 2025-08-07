import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TNotificationResponse } from "@/types/notification.types";

const notificationApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//for admin
		allNotifications: builder.query<
			TServerResponse<TNotificationResponse[]>,
			void
		>({
			query: () => ({
				url: "/notifications",
				method: "GET",
			}),
		}),
		notiFicationByUserId: builder.query<
			TServerResponse<TNotificationResponse[]>,
			Record<string, string>
		>({
			query: (query) => {
				const params = new URLSearchParams();

				Object.entries(query).forEach(([key, value]) => {
					if (value?.trim()?.length > 0) {
						params.append(key, value);
					}
				});
				return {
					url: "/notifications/my-notifications",
					method: "GET",
					params,
				};
			},
		}),
		makeRead: builder.mutation<
			TServerResponse<TNotificationResponse[]>,
			string
		>({
			query: (id) => ({
				url: `/notifications/${id}/read`,
				method: "PATCH",
			}),
		}),
		makeAllRead: builder.mutation<
			TServerResponse<TNotificationResponse[]>,
			void
		>({
			query: () => ({
				url: "/notifications/mark-all-read",
				method: "PATCH",
			}),
		}),
	}),
});

export const {
	useAllNotificationsQuery,
	useNotiFicationByUserIdQuery,
	useLazyNotiFicationByUserIdQuery,
	useMakeReadMutation,
	useMakeAllReadMutation,
} = notificationApi;
